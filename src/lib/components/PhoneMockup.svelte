<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { spring } from 'svelte/motion';
  import { browser } from '$app/environment';

  const dispatch = createEventDispatcher<{ mobiletap: void }>();
  
  export let videoSrc: string | null = null;
  export let youtubeId: string | null = null;
  // Optional Cloudinary (or any CDN) thumbnail URL for the YouTube hero video.
  // When provided it is used as the primary poster image before the player loads.
  // This prevents the broken-image / blank-screen symptom in in-app browsers
  // (Instagram, Facebook, TikTok WebViews) that block requests to img.youtube.com.
  export let thumbnailUrl: string | undefined = undefined;
  export let showPlaceholder = true;
  export let muted: boolean = true;
  
  let mounted = false;
  let isHovered = false;
  let videoLoading = true;
  let videoError = false;
  let containerEl: HTMLElement;
  let videoElement: HTMLVideoElement;
  let iframeEl: HTMLIFrameElement;
  // YouTube-specific state
  // ytVisible: iframe fades IN as soon as YouTube starts buffering (state=3)
  // ytPlaying: thumbnail fades OUT only when video is actually playing (state=1)
  // Splitting these two means the user sees the iframe ~1-2s earlier while
  // the thumbnail still acts as a cover until real frames appear.
  let ytVisible = false;
  let ytPlaying = false;
  // ytError: set true if YouTube fires onError (video unavailable, private, etc.)
  // When true, placeholder content is shown instead of the broken iframe.
  let ytError = false;
  // ytSrc: built after mount with origin parameter so YouTube postMessage API
  // can reliably route events back to this page. An empty string means the
  // iframe is not yet rendered (avoids loading without origin during SSR).
  let ytSrc = '';
  // ytSrcActive: reactive src binding for the YouTube iframe.
  // ''     → iframe renders as src="about:blank" → YouTube unloads, audio stops.
  // ytSrc  → iframe navigates to the YouTube embed URL → YouTube loads/reloads.
  //
  // IMPORTANT: the iframe is ALWAYS in the DOM (no {#if ytSrcActive} wrapper).
  // Removing/inserting the iframe via an {#if} block causes a NotFoundError crash
  // in GSAP's ScrollTrigger — Svelte's DOM reconciliation invalidates the node
  // reference GSAP uses for insertBefore while the pin spacer is active.
  // Using src="about:blank" is equally effective at stopping audio (the browser
  // immediately unloads the document in the iframe) without any DOM restructuring.
  let ytSrcActive = '';
  // On touch/mobile devices we disable the 3D perspective tilt entirely.
  // iOS Safari cannot composite video frames inside a preserve-3d layer —
  // the result is frozen video with audio still playing (GPU compositor bug).
  let isTouch = false;

  // When true the IntersectionObserver that tears down and rebuilds the iframe
  // is NOT created. Use this in scrollytelling contexts (AppleScrolly) where:
  //  a) the phone is always inside the viewport (no need to pause/resume), and
  //  b) GSAP's pin spacer insertion causes a spurious "not intersecting" flash
  //     that incorrectly clears ytSrcActive → reloads the YouTube player.
  // The parent component's own audioObserver handles muting when the section
  // leaves view, so audio never leaks even without the visibility observer.
  export let disableVisibilityObserver = false;

  // When true the 3D perspective tilt is completely disabled — no
  // `perspective()` in the inline transform style.
  //
  // WHY: `perspective()` in the `transform` property creates a 3D projection
  // context on .phone-wrapper. When a GSAP-animated ancestor (.phone-area,
  // promoted to a GPU compositing layer via will-change:transform) is being
  // continuously translated, Chrome cannot keep the YouTube iframe on an
  // isolated texture. Every GSAP frame forces the browser to re-rasterize
  // the iframe's video texture — the same root cause as the iOS preserve-3d
  // freeze. At rest (rotateX/Y = 0) the perspective transform has zero
  // visible effect, so disabling it in the scrollytelling context costs
  // nothing visually while eliminating the compositor bottleneck.
  //
  // The isTouch flag already disables the tilt on mobile (pointer:coarse).
  // disable3dTilt extends the same protection to GSAP-scrollytelling contexts
  // on desktop (pointer:fine) where the phone is inside an animated ancestor.
  export let disable3dTilt = false;

  // Fallback: if YouTube never fires onStateChange(1) within 8s of onReady
  // (e.g. slow buffering, network issue, API hiccup), force the thumbnail out.
  let ytFallbackTimer: ReturnType<typeof setTimeout> | null = null;
  // ytLooping: true for the ~2s window around a manual loop (state=0 → seekTo(0)).
  // During this window the reactive guard must NOT fire — setting ytPlaying=false
  // is intentional (thumbnail crossfade), and the guard would immediately override it.
  let ytLooping = false;
  // ytThumbnailFailed: true when every thumbnail source (Cloudinary + YouTube CDN)
  // has fired an onerror event. When true the broken img is hidden and a small
  // branded plate (logo + gradient) is shown instead, so in-app browsers that block
  // img.youtube.com don't leave the phone screen looking completely blank.
  let ytThumbnailFailed = false;
  // showTapHint: shown on touch devices when the YouTube video hasn't started
  // within 3 seconds of mount. iOS Low Power Mode / iOS autoplay restrictions
  // can silently block muted iframe autoplay; a tap inside a gesture context
  // is the only reliable way to unblock it.
  let showTapHint = false;
  let tapHintTimer: ReturnType<typeof setTimeout> | null = null;
  // Clear tap hint as soon as the video is confirmed playing.
  $: if (ytPlaying && showTapHint) { showTapHint = false; }

  function handleMobilePlay() {
    if (!iframeEl) return;
    // Send playVideo inside a user-gesture context (tap). This bypasses Low Power
    // Mode autoplay restrictions and YouTube's own gesture requirement.
    iframeEl.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*'
    );
    // Also unmute — the user actively tapped, so we have a gesture context.
    iframeEl.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*'
    );
    iframeEl.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*'
    );
    showTapHint = false;
    // Notify parent (AppleScrolly) to unlock audio state.
    dispatch('mobiletap');
  }
  // Computed thumbnail URLs — reactive so they update if the prop changes.
  // ytCdnThumb: YouTube's own image CDN (blocked by some in-app browsers).
  // activeThumbnailSrc: preferred source; Cloudinary URL takes priority over CDN.
  $: ytCdnThumb = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '';
  $: activeThumbnailSrc = thumbnailUrl || ytCdnThumb;
  // Reset failure flag whenever the video changes (e.g. hot-reload in dev).
  $: if (youtubeId || thumbnailUrl) { ytThumbnailFailed = false; }
  
  const rotation = spring({ x: 0, y: 0 }, {
    stiffness: 0.05,
    damping: 0.3
  });
  
  const position = spring({ x: 0, y: 0 }, {
    stiffness: 0.08,
    damping: 0.4
  });
  
  function handleMouseMove(e: MouseEvent) {
    if (!mounted) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    rotation.set({ x: y * 15, y: -x * 15 });
    position.set({ x: x * 10, y: y * 10 });
  }
  
  function handleMouseLeave() {
    rotation.set({ x: 0, y: 0 });
    position.set({ x: 0, y: 0 });
    isHovered = false;
  }
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleVideoCanPlay() {
    videoLoading = false;
  }
  
  function handleVideoError() {
    videoLoading = false;
    videoError = true;
  }

  // Thumbnail image onerror handler — called when any img src fails to load.
  //
  // Failure path:
  //   1. If thumbnailUrl (Cloudinary) was the primary and failed → try YouTube CDN.
  //   2. If YouTube CDN failed (or no thumbnailUrl) → all sources exhausted →
  //      set ytThumbnailFailed, hide the broken img, show branded fallback.
  //
  // Why this matters: Instagram/Facebook/TikTok in-app browsers block requests
  // to img.youtube.com entirely (cross-origin policy). Without a Cloudinary
  // thumbnail AND without this handler, the user would see the phone screen's
  // gradient background with no content at all.
  function handleThumbnailError(e: Event) {
    const img = e.currentTarget as HTMLImageElement;
    // If the failed src was the Cloudinary URL (thumbnailUrl), try YouTube CDN next.
    if (thumbnailUrl && ytCdnThumb && !img.src.includes('youtube.com')) {
      img.src = ytCdnThumb;
      return;
    }
    // All sources exhausted — hide the broken image placeholder.
    ytThumbnailFailed = true;
  }
  
  // Reactively sync muted prop → video element property
  $: if (videoElement) videoElement.muted = muted;

  // When ytPlaying becomes true (naturally via onStateChange), cancel the fallback timer.
  $: if (ytPlaying && ytFallbackTimer) {
    clearTimeout(ytFallbackTimer);
    ytFallbackTimer = null;
  }

  // Guard against "audio plays but thumbnail frozen" bug.
  //
  // Root cause: on mobile browsers (Chrome Android, Safari iOS) YouTube's postMessage
  // events (onReady, onStateChange) are frequently dropped, so ytVisible and ytPlaying
  // never get set via the event handler. Meanwhile unlockAudio() in AppleScrolly
  // sends unMute DIRECTLY to the iframe via querySelectorAll — bypassing the handler
  // entirely — so audio starts even though ytVisible/ytPlaying are still false.
  //
  // Old guard:  if (!muted && ytVisible && !ytPlaying)
  //   ↳ BROKEN: ytVisible only set by dropped events → circular dependency → never fires.
  //
  // New guard:  if (!muted && iframeEl && ytSrcActive && !ytPlaying && !ytLooping)
  //   ↳ iframeEl: always non-null after mount (iframe is always in the DOM — see below).
  //   ↳ ytSrcActive: non-empty only when YouTube is actually loaded (not about:blank).
  //     This guard must NOT fire when the phone is out of viewport (ytSrcActive='').
  //     Without this check the guard would fire after the phone leaves view, setting
  //     ytPlaying=true while there is no video behind the thumbnail → black screen.
  //   ↳ !ytLooping: suppressed during the ~2s manual loop window (state=0 cross-fade).
  //     The loop deliberately sets ytPlaying=false (to show thumbnail for a smooth
  //     transition); the guard must not override this before the cross-fade completes.
  $: if (!muted && iframeEl && ytSrcActive && !ytPlaying && !ytLooping) {
    ytVisible = true;
    ytPlaying = true;
  }

  // Reactively sync muted prop → YouTube iframe via postMessage.
  //
  // MUTE only — NOT unMute.
  //
  // Why: browsers (and YouTube's own base.js) require a qualifying user-activation
  // event (click / pointerdown / keydown / touchstart) before allowing audio to
  // start or unmute.  A Svelte reactive runs as a microtask — completely outside
  // any gesture context.  Sending unMute here would cause YouTube to log:
  //   "Unmuting failed and the element was paused instead because the user didn't
  //    interact with the document before."
  // …and then it actually PAUSES the video (no audio, no video frames).
  //
  // unMute is sent from two safer places:
  //   1. state=1 handler below: fires while the video IS already playing; for
  //      already-playing media browsers are far less restrictive.
  //   2. AppleScrolly's retryUnmute(): called from click/pointerdown/keydown
  //      listeners — guaranteed gesture context, works on every browser including
  //      Safari iOS.
  $: if (iframeEl && youtubeId && ytPlaying && muted) {
    iframeEl.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'mute', args: [] }),
      '*'
    );
  }

  onMount(() => {
    mounted = true;
    // Detect touch/mobile: pointer:coarse means no mouse hover capability.
    // On these devices we skip the 3D tilt entirely to avoid the iOS Safari
    // compositor bug where video freezes inside a preserve-3d layer.
    isTouch = window.matchMedia('(pointer: coarse)').matches;

    // On touch devices, show a "tap to play" hint after 3s if the YouTube
    // video hasn't started. This handles iOS Low Power Mode and any other
    // scenario where muted autoplay is silently blocked.
    if (isTouch && youtubeId) {
      tapHintTimer = setTimeout(() => {
        if (!ytPlaying) showTapHint = true;
      }, 3000);
    }
    
    // If video is already cached/ready, update loading state
    if (videoElement && videoElement.readyState >= 3) {
      videoLoading = false;
    }
    
    // Fallback timeout: clear loading state for native video after 3 s.
    // We do NOT force ytPlaying=true here — the thumbnail stays visible as a
    // permanent backdrop until YouTube actually confirms it is playing.
    // Forcing ytPlaying early was the cause of the black-screen bug.
    const fallbackTimeout = setTimeout(() => {
      if (videoLoading && videoSrc) {
        videoLoading = false;
      }
    }, 3000);

    // True once YouTube fires onStateChange(3=buffering) or (1=playing).
    // Prevents sending a redundant playVideo after autoplay=1 already started the video,
    // which would cause loadNewVideoConfig → restart → "sparisce e ricarica" glitch.
    let hasReceivedFirstPlay = false;

    // YouTube postMessage handler:
    // - onReady: mute + delayed playVideo (only if autoplay didn't fire)
    // - onStateChange(1): playing → reveal iframe immediately (CSS opacity transition handles smoothness)
    // - onStateChange(0): ended → loop manually (iOS workaround for loop=1 unreliability)
    // - onError: video unavailable/private/not embeddable → show placeholder instead
    function handleYTMessage(e: MessageEvent) {
      // Filter by origin instead of e.source: on several mobile browsers (Chrome Android,
      // Safari iOS, Firefox Mobile) e.source !== iframeEl.contentWindow even when the
      // message genuinely comes from our iframe, silently dropping every YouTube event.
      // Origin-only filtering is safe here because the specific YouTube message schema
      // (event/info keys) is not replicated by other same-page content.
      if (
        e.origin !== 'https://www.youtube-nocookie.com' &&
        e.origin !== 'https://www.youtube.com'
      ) return;
      // iframeEl is always in the DOM after mount (see ytSrcActive comment below).
      // Guard against stray messages while src="about:blank" (phone out of viewport).
      if (!iframeEl || !ytSrcActive) return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;

        if (data.event === 'onReady') {
          // Mute first (required for cross-origin autoplay policy)
          iframeEl.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*'
          );
          // Wait 150ms: if autoplay=1 in the URL already started buffering/playing,
          // hasReceivedFirstPlay will be true and we skip the explicit playVideo.
          // Without this guard, sending playVideo while autoplay is in flight triggers
          // a loadNewVideoConfig restart — the visible "sparisce e ricarica" glitch.
          setTimeout(() => {
            if (!hasReceivedFirstPlay) {
              iframeEl?.contentWindow?.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*'
              );
            }
            // NOTE: we intentionally do NOT send unMute here, even if !muted.
            // onReady fires outside any user-gesture context → YouTube's base.js
            // would reject it, log "Unmuting failed", and pause the video.
            // The race condition (user unlocked before player was ready) is handled
            // by AppleScrolly's retryUnmute() which fires on click/pointerdown/keydown
            // — always inside a real gesture context.
          }, 150);

          // Safety net: if onStateChange(1) never arrives within 4s (slow network,
          // API hiccup, browser throttle), force the thumbnail out so the user
          // doesn't see a stuck poster image forever.
          ytFallbackTimer = setTimeout(() => {
            if (!ytPlaying) {
              ytVisible = true;
              ytPlaying = true;
            }
            ytFallbackTimer = null;
          }, 4000);
        }

        if (data.event === 'onStateChange') {
          // Track first play to avoid sending a duplicate playVideo
          if (data.info === 3 || data.info === 1) {
            hasReceivedFirstPlay = true;
          }
          // state 3 = buffering: iframe fades in immediately.
          // The thumbnail still covers it so there's no black flash.
          if (data.info === 3) {
            ytVisible = true;
          }
          // state 1 = playing: thumbnail fades out, video is fully visible.
          //
          // Both ytVisible and ytPlaying flip synchronously here — this is the
          // safe baseline. An earlier attempt deferred ytPlaying inside a
          // setTimeout to keep the thumbnail covering YouTube's static poster
          // for ~450ms while real frames decoded; that introduced a regression
          // where, if the 5-second onMount fallback had already set ytPlaying,
          // the deferred block was skipped → unMute was never sent → video
          // appeared invisible while audio played.
          //
          // The "static-poster-while-audio-plays" cold-start feel is now
          // handled purely in CSS via transition-delay on .yt-thumbnail (see
          // the styles below) — pure presentation, no state-machine risk.
          if (data.info === 1) {
            ytVisible = true;
            if (!ytPlaying) {
              ytPlaying = true;
            }
            // Always sync audio here — do NOT rely solely on the Svelte reactive.
            //
            // Root cause of the desktop-audio-silent bug:
            //   1. User scrolls before onReady fires → unlockAudio() sends unMute
            //      to the not-yet-ready player → command dropped.
            //   2. The reactive guard ($: !muted && iframeEl && !ytPlaying) forces
            //      ytPlaying = true immediately.
            //   3. onReady fires → sends mute (autoplay policy), then playVideo.
            //   4. onStateChange(1) fires → ytPlaying is already true → Svelte sees
            //      old === new, does NOT mark dirty → reactive never re-runs →
            //      unMute never sent → video stays silenced.
            //
            // Fix: send unMute directly in state=1, bypassing the reactive.
            // Reading `muted` here works because it closes over the Svelte prop
            // variable (always reflects the latest parent-assigned value).
            if (!muted && iframeEl) {
              iframeEl.contentWindow?.postMessage(
                JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*'
              );
              iframeEl.contentWindow?.postMessage(
                JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*'
              );
            }
          }
          // state 0 = ended: loop manually (iOS/iPadOS workaround for loop=1 unreliability).
          // Instead of seeking immediately (which shows a flash), briefly cross-fade
          // through the thumbnail — this hides the blank frame at the loop point and
          // gives a smooth "breathing" loop rather than a visible cut.
          //
          // ytLooping must be set to true BEFORE ytPlaying=false so that the reactive
          // guard ($: if !muted && iframeEl && !ytPlaying && !ytLooping) does not
          // immediately override the intentional thumbnail-show (both are read in the
          // same Svelte reactive evaluation pass).
          if (data.info === 0) {
            ytLooping = true;           // suppress reactive guard
            ytPlaying = false;          // thumbnail fades in (1s ease-in-out)
            setTimeout(() => {
              if (!ytSrcActive) { ytLooping = false; return; } // phone scrolled away
              iframeEl?.contentWindow?.postMessage(
                JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }),
                '*'
              );
              iframeEl?.contentWindow?.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
                '*'
              );
              // Safety: if onStateChange(1) never arrives (events dropped on mobile),
              // reset ytLooping and force thumbnail away after 2s so the poster
              // doesn't stay stuck after a loop.
              setTimeout(() => {
                ytLooping = false;
                if (!ytPlaying && ytSrcActive) {
                  ytVisible = true;
                  ytPlaying = true;
                }
              }, 2000);
            }, 300); // seek during the thumbnail fade-in → loop flash is covered
          }
        }

        // onError: YouTube couldn't play the video (private, deleted, not embeddable,
        // or network failure). Error codes: 2=invalid params, 5=HTML5 error,
        // 100=video not found, 101/150=not allowed in embedded players.
        // Cancel fallback timer and show placeholder content instead of the broken iframe.
        if (data.event === 'onError') {
          console.warn('[PhoneMockup] YouTube error code:', data.info, '— switching to placeholder');
          if (ytFallbackTimer) { clearTimeout(ytFallbackTimer); ytFallbackTimer = null; }
          ytError = true;
        }
      } catch {
        // ignore malformed messages
      }
    }

    if (youtubeId) {
      // Build the embed URL with the current page origin so YouTube's postMessage
      // API knows which domain to route events back to. Without `origin`, the player
      // may silently drop onReady / onStateChange events on some browser/network
      // combinations, leaving the video stuck behind the thumbnail forever.
      ytSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
      // Activate the iframe now that we have the origin-aware URL.
      // ytSrcActive is the Svelte-reactive binding — setting it here causes Svelte
      // to render the <iframe> and bind iframeEl. Never set iframeEl.src directly
      // (Svelte would overwrite it on the next reactive render pass).
      ytSrcActive = ytSrc;
      window.addEventListener('message', handleYTMessage, { passive: true });

      // Absolute fallback: if ALL events are dropped AND the user never unlocks
      // audio (stays muted), the thumbnail would stay forever. Force it away after
      // 5s regardless — by then YouTube has definitely rendered frames via autoplay.
      // Normal path: onReady → 4s timer fires first. Audio path: reactive guard fires.
      //
      // IMPORTANT: check ytSrcActive before forcing — if the phone left the viewport
      // within the first 5s, ytSrcActive='' (iframe gone). Forcing ytPlaying=true with
      // no iframe would hide the thumbnail without any video behind it → black screen.
      setTimeout(() => {
        if (!ytPlaying && ytSrcActive) {
          ytVisible = true;
          ytPlaying = true;
        }
      }, 5000);
    }

    // Pause the video when the phone scrolls out of view, resume on re-entry.
    //
    // For YouTube: postMessage('pauseVideo') alone is unreliable on mobile browsers
    // because the communication channel may be broken (same bug that causes the
    // thumbnail-freeze). Instead we clear iframeEl.src entirely — this is a 100%
    // reliable way to stop the audio. We restore the src when the phone re-enters
    // the viewport; the onReady → onStateChange sequence restarts cleanly and the
    // thumbnail covers the brief reload so there's no visual flash.
    //
    // IMPORTANT: never send playVideo on the initial intersection callback
    // (phone visible at page load) — this interrupts YouTube's own autoplay.
    // We act only after the phone has actually left the viewport at least once.
    let hasBeenHidden = false;
    let visibilityObserver: IntersectionObserver | null = null;
    if (containerEl && !disableVisibilityObserver) {
      visibilityObserver = new IntersectionObserver(
        (entries) => {
          const isVisible = entries[0]?.isIntersecting;
          if (!isVisible) {
            // Phone left viewport → stop
            hasBeenHidden = true;
            if (videoElement) videoElement.pause();
            if (youtubeId && ytSrcActive) {
              // Cancel any pending fallback timer — the old player is being destroyed.
              // Without this, the timer could fire during the new player's startup and
              // incorrectly force ytPlaying=true before the new video is ready.
              if (ytFallbackTimer) { clearTimeout(ytFallbackTimer); ytFallbackTimer = null; }
              // If a loop crossfade was in progress, cancel it — the phone is gone.
              ytLooping = false;
              // Setting ytSrcActive='' lets Svelte remove the <iframe> from the DOM
              // via the {#if ytSrcActive} guard — guaranteed audio stop. Direct
              // iframeEl.src mutation would be overwritten by the subsequent Svelte
              // re-render triggered by the ytPlaying/ytVisible state changes below.
              ytSrcActive = '';
              // Reset state so thumbnail shows while the iframe is absent/reloading
              ytPlaying = false;
              ytVisible = false;
            }
          } else if (hasBeenHidden) {
            // Phone returned to viewport (after being hidden) → restart
            if (videoElement) videoElement.play().catch(() => {});
            if (youtubeId && ytSrc && !ytSrcActive) {
              // Restore ytSrcActive → Svelte recreates the <iframe> with the full
              // YouTube URL; onReady fires → onStateChange updates ytVisible/ytPlaying.
              ytSrcActive = ytSrc;

              // Re-entry safety net: the 5s absolute fallback from onMount only fires
              // once (on initial load). On subsequent re-entries, if events are still
              // dropped AND the user stays muted (reactive guard won't help), a fresh
              // fallback is needed. ytSrcActive check prevents the black-screen bug if
              // the phone leaves again before the 5s is up.
              setTimeout(() => {
                if (!ytPlaying && ytSrcActive) {
                  ytVisible = true;
                  ytPlaying = true;
                }
              }, 5000);
            }
          }
          // isVisible && !hasBeenHidden → initial page load, do nothing
          // YouTube handles its own autoplay via the autoplay=1 URL param
        },
        // rootMargin gives a generous buffer so the iframe is NOT destroyed when
        // the phone briefly dips in/out of the viewport during pinned scrollytelling.
        // Only when the phone is well past the viewport (300px above OR below) do
        // we tear the iframe down. This prevents the "video stops mid-scroll" feel.
        { threshold: 0.1, rootMargin: '300px 0px' }
      );
      visibilityObserver.observe(containerEl);
    }

    return () => {
      clearTimeout(fallbackTimeout);
      if (ytFallbackTimer) clearTimeout(ytFallbackTimer);
      if (tapHintTimer) clearTimeout(tapHintTimer);
      window.removeEventListener('message', handleYTMessage);
      visibilityObserver?.disconnect();
    };
  });
</script>

<div 
  bind:this={containerEl}
  class="phone-container"
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
  on:mouseenter={handleMouseEnter}
  role="img"
  aria-label="Smartphone mockup showing social media content"
>
  <div 
    class="phone-wrapper phone-entrance"
    style={(!isTouch && !disable3dTilt)
      ? `transform: perspective(1000px) rotateX(${$rotation.x}deg) rotateY(${$rotation.y}deg) translateX(${$position.x}px) translateY(${$position.y}px);`
      : ''}
  >
      <div class="phone-frame">
        <div class="phone-notch"></div>
        
        <div class="phone-screen">
          {#if youtubeId && !ytError}
            <div class="yt-crop-wrapper">
              <!-- Thumbnail always in DOM — acts as permanent poster/fallback.
                   Fades out only when YouTube confirms the video is playing.
                   This prevents the black-screen bug caused by the old {#if !ytPlaying} guard.
                   activeThumbnailSrc uses Cloudinary URL as primary (works in ALL browsers
                   including Instagram/Facebook WebViews), falling back to img.youtube.com.
                   onerror attempts a secondary source then sets ytThumbnailFailed. -->
              <img
                src={activeThumbnailSrc}
                alt=""
                aria-hidden="true"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                class="yt-thumbnail"
                class:yt-thumbnail-hidden={ytPlaying || ytThumbnailFailed}
                on:error={handleThumbnailError}
              />
              <!-- Branded fallback shown when ALL thumbnail sources fail (e.g. Instagram
                   WebView blocks img.youtube.com AND Cloudinary has no thumbnail).
                   The phone-screen gradient is already visible as backdrop; this adds
                   the Righello logo mark so the screen doesn't look completely empty. -->
              {#if ytThumbnailFailed && !ytPlaying}
                <div class="yt-thumbnail-fallback" aria-hidden="true">
                  <div class="ytf-glow ytf-glow-pink"></div>
                  <div class="ytf-glow ytf-glow-cyan"></div>
                  <svg class="ytf-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <!-- Righello "R" lettermark simplified -->
                    <circle cx="20" cy="20" r="18" stroke="rgba(214,72,126,0.6)" stroke-width="1.5" fill="none"/>
                    <text x="20" y="27" font-family="serif" font-size="20" font-weight="700" fill="rgba(255,255,255,0.85)" text-anchor="middle">R</text>
                  </svg>
                  <span class="ytf-label">righello.lab</span>
                </div>
              {/if}
              <!-- Tap-to-play: appears on touch devices when autoplay is blocked
                   (iOS Low Power Mode, restrictive WebViews, slow network).
                   The button sits inside a user-gesture context → YouTube
                   accepts playVideo + unMute even under Low Power Mode.
                   pointer-events are auto here; .phone-area has pointer-events:none
                   on mobile but the AppleScrolly CSS overrides this for this button. -->
              <!-- Tap-to-play hint: always in DOM to avoid GSAP insertBefore crash.
                   GSAP's ScrollTrigger tracks DOM nodes inside the pinned container;
                   removing/inserting nodes (via {#if}) while pinned invalidates those
                   references and triggers _swapPinOut2 → insertBefore NotFoundError.
                   Fix: keep button in DOM, show/hide via CSS class only. -->
              <button
                class="mobile-tap-hint"
                class:tap-hint-hidden={!showTapHint || ytPlaying}
                tabindex={!showTapHint || ytPlaying ? -1 : 0}
                aria-hidden={!showTapHint || ytPlaying ? 'true' : undefined}
                on:click|stopPropagation={handleMobilePlay}
                aria-label="Riproduci video"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="tap-play-icon" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <!-- The iframe is ALWAYS in the DOM after mount — never removed/re-added.
                   Removing/inserting it (via {#if ytSrcActive}) caused a NotFoundError
                   crash in GSAP's ScrollTrigger pin spacer:
                     insertBefore → Ri → ScrollTrigger.refresh → onUpdate
                   Root cause: Svelte's DOM reconciliation (deleting an element inside the
                   GSAP-pinned container during scroll) invalidated the node reference GSAP
                   tracks for insertBefore, crashing mid-scroll and forcing a full re-render.
                   Fix: keep the iframe in the DOM; control audio/video state via src only.
                     - ytSrcActive = ''  → src="about:blank" → YouTube unloads (audio stops)
                     - ytSrcActive = url → src=url → YouTube loads/reloads cleanly
                   Changing an attribute is invisible to GSAP; removing a node is not. -->
              <iframe
                bind:this={iframeEl}
                src={ytSrcActive || 'about:blank'}
                title="Righello video"
                frameborder="0"
                allow="autoplay; fullscreen; encrypted-media"
                class="yt-iframe"
                class:yt-iframe-hidden={!ytVisible}
              ></iframe>
            </div>
          {:else if videoSrc}
            <!-- Skeleton always in DOM — removing it via {#if} while GSAP has pinned
                 this container triggers _swapPinOut2 → insertBefore NotFoundError.
                 Show/hide via CSS class only; opacity transition replicates the old fade. -->
            <div class="video-skeleton" class:skeleton-hidden={!videoLoading}>
              <div class="skeleton-shimmer"></div>
              <div class="skeleton-loader">
                <div class="loader-spinner"></div>
              </div>
            </div>
            <video 
              bind:this={videoElement}
              autoplay 
              loop 
              muted 
              playsinline
              preload="metadata"
              on:canplay={handleVideoCanPlay}
              on:error={handleVideoError}
              class="w-full h-full object-cover"
              class:video-ready={!videoLoading}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          {:else if showPlaceholder}
            <div class="placeholder-content">
              <div class="gradient-animation"></div>
              
              <div class="overlay-content">
                <div class="play-button" class:pulse={!isHovered}>
                  <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                
                <div class="reel-ui">
                  <div class="reel-stats">
                    <div class="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>24.5K</span>
                    </div>
                    <div class="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M21 6h-2V3h-2v3h-2V3h-2v3h-2V3H9v3H7V3H5v3H3v15h18V6zm-2 13H5V8h14v11z"/>
                      </svg>
                      <span>1.2K</span>
                    </div>
                    <div class="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                      </svg>
                      <span>892</span>
                    </div>
                  </div>
                  
                  <div class="reel-caption">
                    <div class="brand-tag">
                      <span class="brand-avatar"></span>
                      <span class="brand-name">righello.lab</span>
                    </div>
                    <p class="caption-text">Risultati che parlano da soli 📈</p>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>
        
        <div class="phone-home-indicator"></div>
      </div>
      
      <div class="phone-glow" class:active={isHovered}></div>
    </div>
</div>

<style>
  .phone-container {
    position: relative;
    width: 270px;
    height: 540px;
    cursor: pointer;
  }
  
  @media (min-width: 480px) {
    .phone-container {
      width: 285px;
      height: 570px;
    }
  }
  
  @media (min-width: 768px) {
    .phone-container {
      width: 285px;
      height: 570px;
    }
  }
  
  @media (min-width: 1024px) {
    .phone-container {
      width: 300px;
      height: 600px;
    }
  }
  
  .phone-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.1s ease-out;
    /* Always flat — never preserve-3d.
     *
     * The 3D tilt effect uses `perspective(1000px)` embedded directly in the
     * transform property (rotateX + rotateY), which looks fully 3D without
     * needing preserve-3d.  preserve-3d is only required when CHILD elements
     * must be independently positioned in 3D space (e.g. card-flip back faces)
     * — this component never does that.
     *
     * preserve-3d was previously enabled on @media (pointer:fine) (desktop).
     * Chrome cannot composite YouTube iframe video frames inside a preserve-3d
     * ancestor that is being continuously scaled/translated by GSAP at 60fps
     * (the AppleScrolly slide-in animation). The result: video frames freeze
     * while audio keeps playing — exactly the symptom the user reported. */
    transform-style: flat;
  }

  .phone-entrance {
    animation: phoneReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
    opacity: 0;
  }

  /* No scale — scaling a composited GPU layer containing a YouTube iframe
   * forces Chrome to re-rasterize the video texture on every frame, which
   * interrupts the video decode pipeline and causes visible frame-freeze.
   * Pure opacity + translateY are compositor-only operations: safe for video. */
  @keyframes phoneReveal {
    from {
      opacity: 0;
      transform: translateY(28px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .phone-entrance {
      animation: none;
      opacity: 1;
    }
  }
  
  .phone-frame {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
    border-radius: 44px;
    padding: 12px;
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }
  
  .phone-notch {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 28px;
    background: #000;
    border-radius: 20px;
    z-index: 10;
  }
  
  @media (min-width: 768px) {
    .phone-notch {
      width: 120px;
      height: 32px;
    }
  }
  
  /* Phone screen baseline.
   *
   * On cold-cache loads (incognito, first visit) the YouTube iframe and the
   * hqdefault.jpg thumbnail can each take 1–3 seconds to arrive over the
   * network. Until ONE of them paints, the user stares at the phone screen.
   *
   * Old background was solid #000 — that produced the "black/broken iPhone"
   * flash users reported on first incognito load. We replace it with a dark
   * brand-tinted gradient that always looks intentional (like a real iPhone
   * wallpaper), so the worst-case empty state still feels designed. */
  .phone-screen {
    width: 100%;
    height: 100%;
    background:
      radial-gradient(120% 80% at 30% 15%, rgba(214, 72, 126, 0.28) 0%, transparent 55%),
      radial-gradient(120% 80% at 75% 85%, rgba(6, 182, 212, 0.22) 0%, transparent 60%),
      linear-gradient(160deg, #1a0a14 0%, #0a0a0f 55%, #0a1418 100%);
    border-radius: 36px;
    overflow: hidden;
    position: relative;
  }

  .yt-crop-wrapper {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .yt-iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    /* 300% of the container = ~750px wide so YouTube detects a large viewport
       and serves 720p/1080p instead of 360p. The scale(0.45) brings it back to
       the same visual size as the old width:100% + scale(1.35) combo:
       250px * 3 * 0.45 = 337px ≈ 250px * 1.35 = 337px */
    width: 300%;
    height: 300%;
    transform: translate(-50%, -50%) scale(0.45);
    transform-origin: center center;
    border: 0;
    pointer-events: none;
    transition: opacity 0.6s ease-out;
  }

  /* Hidden while the video hasn't fired its first onStateChange(1) */
  .yt-iframe-hidden {
    opacity: 0;
  }

  /* YouTube thumbnail — always in DOM as a poster/fallback.
     Fades out smoothly once the iframe confirms it is playing.
     A long-ish 0.9s ease-out fade naturally bridges the gap between
     YouTube firing state=1 and actual decoded frames hitting the canvas
     (often 200–500ms behind on cold-cache loads), so the user never sees
     the static YouTube poster behind a hard-cut thumbnail. */
  .yt-thumbnail {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    pointer-events: none;
    transition: opacity 0.9s ease-out;
  }

  .yt-thumbnail-hidden {
    opacity: 0;
  }

  /* Branded fallback plate — shown inside the phone screen when every thumbnail
     source (Cloudinary + YouTube CDN) has failed to load. The .phone-screen
     gradient (pink/cyan over near-black) is visible as backdrop; this layer
     adds a centred logo mark so the screen doesn't look completely blank.
     Visible only in restricted WebViews (Instagram, Facebook, TikTok) that block
     cross-origin image requests to img.youtube.com. */
  .yt-thumbnail-fallback {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    pointer-events: none;
  }

  /* Tap-to-play button: shown on touch devices when autoplay is blocked. */
  .mobile-tap-hint {
    position: absolute;
    inset: 0;
    z-index: 12;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    pointer-events: auto;
    -webkit-tap-highlight-color: transparent;
    opacity: 1;
    transition: opacity 0.2s ease;
  }

  .mobile-tap-hint.tap-hint-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .mobile-tap-hint::before {
    content: '';
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(214, 72, 126, 0.25);
    animation: tap-hint-pulse 1.8s ease-in-out infinite;
  }

  @keyframes tap-hint-pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50%       { transform: scale(1.25); opacity: 0.2; }
  }

  .tap-play-icon {
    position: relative;
    z-index: 1;
    width: 32px;
    height: 32px;
    fill: white;
    filter: drop-shadow(0 0 8px rgba(214, 72, 126, 0.8));
  }

  .ytf-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.5;
    pointer-events: none;
  }

  .ytf-glow-pink {
    width: 140px;
    height: 140px;
    background: rgba(214, 72, 126, 0.5);
    top: 20%;
    left: 15%;
  }

  .ytf-glow-cyan {
    width: 120px;
    height: 120px;
    background: rgba(6, 182, 212, 0.4);
    bottom: 20%;
    right: 15%;
  }

  .ytf-logo {
    width: 52px;
    height: 52px;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 12px rgba(214, 72, 126, 0.5));
  }

  .ytf-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.55);
    position: relative;
    z-index: 1;
  }

  .phone-home-indicator {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  .placeholder-content {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .gradient-animation {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      #D6487E 0%,
      #a855f7 25%,
      #06B6D4 50%,
      #a855f7 75%,
      #D6487E 100%
    );
    background-size: 400% 400%;
    animation: gradientFlow 8s ease infinite;
  }
  
  @keyframes gradientFlow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  .overlay-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }
  
  .play-button {
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
  }
  
  .play-button.pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  .play-button svg {
    margin-left: 4px;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(214, 72, 126, 0.5);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 0 15px rgba(214, 72, 126, 0);
    }
  }
  
  .phone-container:hover .play-button {
    background: #D6487E;
    border-color: #D6487E;
    transform: scale(1.1);
  }
  
  .reel-ui {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
  }
  
  .reel-stats {
    position: absolute;
    right: 12px;
    bottom: 100px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }
  
  .reel-caption {
    padding-right: 50px;
  }
  
  .brand-tag {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .brand-avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    border-radius: 50%;
    border: 2px solid white;
  }
  
  .brand-name {
    color: white;
    font-weight: 700;
    font-size: 14px;
  }
  
  .caption-text {
    color: white;
    font-size: 13px;
    line-height: 1.4;
  }
  
  .phone-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(
      ellipse at center,
      rgba(214, 72, 126, 0.3) 0%,
      rgba(6, 182, 212, 0.2) 40%,
      transparent 70%
    );
    border-radius: 60px;
    z-index: -1;
    opacity: 0.5;
    filter: blur(30px);
    transition: opacity 0.3s ease;
  }
  
  .phone-glow.active {
    opacity: 1;
  }
  
  /* Video loading skeleton */
  .video-skeleton {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .video-skeleton.skeleton-hidden {
    opacity: 0;
    pointer-events: none;
  }
  
  .skeleton-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(214, 72, 126, 0.1) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .skeleton-loader {
    position: relative;
    z-index: 3;
  }
  
  .loader-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(214, 72, 126, 0.2);
    border-top-color: #D6487E;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Video ready state */
  video {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  video.video-ready {
    opacity: 1;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .skeleton-shimmer,
    .loader-spinner {
      animation: none;
    }
    
    .loader-spinner {
      border-top-color: #D6487E;
      opacity: 0.5;
    }
    
    video {
      transition: none;
      opacity: 1;
    }
  }
</style>
