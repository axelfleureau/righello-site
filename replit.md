# Righello - Growth Agency Website

## Overview
This project is for Righello, an Italian growth agency focused on measurable results and data-driven growth. The website showcases their three core competencies: **Marketing & Social Media**, **Advertising & Automazione**, and **Sviluppo Web & Software**. Based in Nord Italia (Mestre, Venezia) with projects across Europe. The business vision is to position Righello as a leading agency that delivers high ROAS, traceable conversions, and custom software solutions with a data-centric approach.

## User Preferences
I prefer simple language.
I want iterative development.
Ask before making major changes.
I want detailed explanations.
**Component Library Philosophy**: Always build modular, reusable components. When a good UI pattern is created (cards, buttons, animations), extract it into a shared component in `src/lib/components/` so it can be reused across all pages. This ensures consistent design/layout and simpler maintenance. Avoid duplicating styles across pages — use the shared component instead.

## System Architecture

### Tech Stack
The website is built with SvelteKit 1.x, styled using TailwindCSS. It utilizes a custom font, Degular Display, and the Node adapter for deployment. Advanced animations are handled by GSAP with ScrollTrigger for scrollytelling and Svelte transitions for UI effects.

### Design System
- **Spacing Scale**: Consistent spacing is achieved with a base of 8px, defining CSS variables from `0.5rem` to `8rem`.
- **Section Spacing**: Responsive vertical padding for sections is defined with `--section-padding-sm` (40px mobile), `--section-padding-md` (56px tablet), and `--section-padding-lg` (80px desktop).
- **Iubenda Integration**: Cookie Solution widget loaded via app.html, Privacy Policy link in footer uses Iubenda embed modal. Script `iubenda.js` loaded dynamically in Footer component.
- **Typography Scale**: A consistent typographic scale from `--text-xs` to `--text-6xl` is used.
- **Brand Colors (Dual Theme)**: The default theme is dark mode, with a light/dark switch. Key brand colors are Righello Pink (`#D6487E`) and Accent Cyan (`#06B6D4`), used in gradients for hero text and accents. Dark mode features a primary background of `#050505`, while light mode uses `#f8fafc`.

### UI/UX Decisions and Components
- **Hero Section**: Fullscreen on desktop with a transparent overlay header, featuring text on the left and a 3D iPhone mockup on the right showcasing a placeholder reel. Includes step indicator with vertical dots and labels on the left side, and "SCORRI PER ESPLORARE" scroll hint.
- **Navbar**: A pill-shaped, glassmorphism-styled floating navbar that adapts its appearance based on scroll direction (transparent/classic at top, compact when scrolling down, expanded when scrolling up, hidden after significant scroll).
- **Interactive Components**:
    - **PhoneMockup**: 3D iPhone with spring physics and tilt effects.
    - **AppleScrolly**: Apple-style scrollytelling with strong magnetic snap (550vh per step for relaxed reading), pinning the iPhone during scroll with synchronized impact phrases. Features clickable step indicator with aria-current support, enhanced slide badges with backdrop-filter blur and larger icons (1.5rem).
    - **AppleCardsCarousel**: Horizontal, drag-to-scroll carousel with hover-to-play video and 3D effects. Features native touch support with preventDefault for smooth mobile scrolling, GPU-accelerated CSS (transform3d, backface-visibility), and video frame extraction for dynamic thumbnails (requires Firebase CORS configuration).
    - **GlowCard**: Cards with a cursor-following glow effect.
    - **InfiniteMarquee**: Infinite horizontal scroll for client logos.
    - **ServiceTabs**: Modern tab switch with animated indicator.
    - **AnimatedVideoTestimonials**: Drag-to-scroll video reel carousel with fullscreen lightbox. Centered mobile navigation, 6rem gap on desktop. Supports prefers-reduced-motion.
    - **HorizontalVideoShowcase**: Horizontal 16:9 video carousel for institutional videos, product demos, testimonials, and behind-the-scenes content. Drag-to-scroll with lightbox playback.
    - **AnimatedCounter**: Counters that animate on visibility.
    - **MagneticButton**: Buttons with a magnetic hover effect.
    - **BackgroundBeams**: Animated light effects for hero/accent sections (replaced by RippleGrid Background).
    - **SectionDivider**: Gradient blend transitions between sections.
    - **ScrollFloat**: Character-by-character text animation for scrollytelling slides.
    - **LogoCarousel**: Client carousel with requestAnimationFrame for smooth animation, pause on hover, and scale effect.
    - **GradualBlur**: Component for premium blurred edges with gradient masks.
    - **LanyardBadge**: 3D interactive badge with spring physics and drag & drop for the "About Us" page.
    - **RippleGrid Background**: WebGL OGL-based animated grid with mouse-interactive ripple effects, using Righello Pink.
    - **BentoGrid**: Kokonutui-style component with 6 feature types (spotlight, counter, timeline, typing, metrics, icons), 3D tilt on hover, proper timer cleanup.
    - **CardFlip**: 3D flip animation on hover with pulsing circles, keyboard accessible (Enter/Space), aria-label support.
    - **PesoSection**: 4 quadrants PESO with real data (Croce del Sud, Mangio case studies), stat cards with animated counters, colored chips (P=pink, E=cyan, S=purple, O=green).
    - **StatCard, CaseStudyCard**: Support components for PESO section with animated counters and category tags.
    - **ReelViewer**: Instagram Reels-style fullscreen video player. Vertical 9:16 video with dark overlay, username (@righello_agency), caption, decorative action icons (heart/comment/share/bookmark), progress bar, swipe navigation between videos, tap play/pause, focus trap, `prefers-reduced-motion` support. Used by `AppleCardsCarousel` when `useReelViewer={true}` prop is set (enabled in SocialReelShowcase).
    - **AirplaneEasterEgg**: Hidden easter egg section after the footer (homepage only). GSAP ScrollTrigger scrollytelling with airplane window that scales from 1x to 4x during scroll, revealing sky behind it. Three text phases appear at different scroll progress: "Sei ancora qui?", discount message, "Prendi il volo con Righello!". Discount code `scrollerevenue26` in pink pill. Always-light background with gradient blend from dark footer. Mobile fallback (stacked, no pinning). `prefers-reduced-motion` support. Rendered conditionally via `$page.url.pathname === '/'` in layout.

### Feature Specifications
- **Service Departments**: The website categorizes services into three main areas: Content & Social Media, Advertising & Performance, and Digital Experience.
- **Page Structure**:
    - `/` (Homepage): Fullscreen hero, animated statistics, services, video testimonials, client marquee.
    - `/servizi` (Services): Modern tabbed interface for the three departments.
    - `/progetti` (Projects): Project gallery with category filters and 3D tilt effects.
    - `/progetti/[slug]` (Project Detail).
    - `/chi-siamo` (About Us): Team presentation and animated statistics.
    - `/contatti` (Contact): Animated contact form.
- **Mobile Optimizations**: Hero section is mobile-first (not fixed 100vh), PhoneMockup maintains constant size, GSAP ScrollTrigger pinning is disabled on smaller screens, stacked layouts for mobile, and safe area support for iOS.

### Navigation & Anchor Links (Feb 2026)
- **Smooth Scroll**: Global `scroll-behavior: smooth` with `scroll-padding-top: 6rem` for fixed header offset.
- **Section IDs**: All pages have semantic `id` attributes on major sections for deep linking and anchor navigation.
  - `/servizi`: `#servizi-hero`, `#dipartimenti`, `#content-social`, `#advertising`, `#digital-experience`, `#cosa-facciamo`, `#perche-righello`, `#case-studies`, `#come-lavoriamo`, `#testimonials`, `#faq`, `#cta`
  - `/` (Homepage): `#risultati`, `#servizi`, `#testimonial`, `#clienti`, `#metodo`, `#contattaci`
  - `/chi-siamo`: `#chi-siamo-hero`, `#team`, `#dipartimenti`
  - `/contatti`: `#contatti-hero`, `#form`
  - `/progetti`: `#portfolio`
- **Header Dropdown**: Servizi dropdown links use `href="/servizi#{dept.id}"` for direct anchor navigation to department cards.

### Accessibility
- Support for `prefers-reduced-motion` for all animated components.
- Dynamic ARIA labels for the mobile menu.
- Semantic HTML with appropriate roles.

### Performance & SEO Optimizations (Feb 2026)
- **HTTP Headers**: Cache-Control (immutable for hashed assets, stale-while-revalidate for HTML) + security headers (X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection) via hooks.server.ts.
- **Font Loading**: Google Fonts (Poppins) loaded non-blocking via preload+onload trick. Degular Display preloaded. Firebase Storage preconnected.
- **SEO**: Complete meta tags (title, description, og:*, twitter:card) on all 6 pages with proper Italian locale.
- **Bundle Cleanup**: Removed unused three.js, threlte, matter-js, Sentry, posthog from bundle. Removed Sentry vite plugin.
- **Image/Video Best Practices**: loading="lazy", decoding="async", fetchpriority="high" (hero), video preload="metadata" for off-screen content.
- **Video Thumbnails**: AppleCardsCarousel uses native video element with shimmer skeleton (replaced complex canvas extraction). AnimatedVideoTestimonials uses shimmer + loading spinner.
- **Static Video Thumbnails**: Pre-generated at development time via `scripts/generate-thumbnails.js` (FFmpeg-based). Thumbnails saved as static JPEG files in `static/thumbnails/` with MD5-hashed filenames. Centralized mapping in `src/lib/data/thumbnail-map.ts` provides `getThumbnailUrl()` helper used by all video components (AnimatedVideoTestimonials, AppleCardsCarousel, HorizontalVideoShowcase, progetti page). Falls back to `/api/video-thumbnail` for unmapped URLs. To add new videos: update the VIDEO_URLS array in the script and run `node scripts/generate-thumbnails.js`.

### Contact Form & Email (Feb 2026)
- **Contact Form API**: `/api/contact` endpoint processes form submissions with OpenAI GPT-5.2 enhancement.
- **SendGrid Integration**: Via Replit connector pattern (`src/lib/server/sendgrid.ts`). Sends branded HTML emails.
- **OpenAI Integration**: Via Replit AI Integrations (`src/lib/server/openai.ts`). Enhances client confirmation email and generates lead analysis.
- **Email Flow**: 
  - Client confirmation email (from connector sender / hello@wearerighello.com) with branded HTML template, Righello logo, pink accents.
  - Team summary email to edis@, paolo@, axel@wearerighello.com with all form data + AI lead analysis. Includes replyTo set to client's email.
- **Fallback**: If OpenAI fails, emails send without enhancement. If SendGrid fails, user sees error message.
- **Logo URLs in emails**: Dark theme `https://www.wearerighello.com/logo-white.png`, Light theme `https://www.wearerighello.com/logo-full.png`.
- **Email Marketing Optimizations (Feb 2026)**:
  - Client email: Dark mode meta tags, hidden preheader, green checkmark icon (table-based for Outlook), "Messaggio Ricevuto!" heading, "Prossimi Step" 3-step section, social proof line, improved CTA → `/progetti`, Instagram/LinkedIn/Privacy links in footer, responsive padding via `@media`.
  - Team email: Budget-based priority badge (Alta/Media/Standard) with numeric parsing (handles €10k, 10.000, 10000 formats), Italian timestamp, colored budget badge, "Rispondi al Cliente" quick-action button, restructured AI analysis section.
  - GPT prompts: Enhanced client copywriter prompt (no generic phrases, premium tone, max 3 paragraphs). Structured lead analysis with SCORE 1-10, PRIORITÀ, PROFILO, AZIONE CONSIGLIATA, SEGNALI CHIAVE.
  - Subject lines: Client `"${name}, messaggio ricevuto ✓ — Righello"` (shorter). Team includes priority label.
  - Security: `escHtml()` sanitizes all user inputs in HTML templates, `encodeURIComponent()` for mailto hrefs.

## External Dependencies

- **GSAP**: For advanced scroll-triggered animations and complex timelines.
- **ScrollTrigger (GSAP plugin)**: For scrollytelling effects and synchronizing animations with scroll position.
- **Firebase Storage**: Used for hosting video assets like `caterina_4.mp4` and testimonial videos. Preconnect configured in app.html.
- **Meta Pixel**: Integrated via `src/lib/tracking/metaPixel.ts` for analytics, tracking page views, leads, contacts, and content views. Activated by setting `PUBLIC_META_PIXEL_ID`.
- **OGL**: WebGL library used for the RippleGrid background effect.