# Righello - Growth Agency Website

## Overview
This project is for Righello, an Italian growth agency focused on measurable results and data-driven growth. The website aims to showcase their expertise in content creation, advertising, and digital experience, transforming data into tangible growth. The business vision is to position Righello as a leading agency that delivers high ROAS and traceable conversions, emphasizing a numerical and data-centric approach.

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
- **Section Spacing**: Responsive vertical padding for sections is defined with `--section-padding-sm` (48px mobile), `--section-padding-md` (64px tablet), and `--section-padding-lg` (96px desktop).
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

## External Dependencies

- **GSAP**: For advanced scroll-triggered animations and complex timelines.
- **ScrollTrigger (GSAP plugin)**: For scrollytelling effects and synchronizing animations with scroll position.
- **Firebase Storage**: Used for hosting video assets like `caterina_4.mp4` and testimonial videos. Preconnect configured in app.html.
- **Meta Pixel**: Integrated via `src/lib/tracking/metaPixel.ts` for analytics, tracking page views, leads, contacts, and content views. Activated by setting `PUBLIC_META_PIXEL_ID`.
- **OGL**: WebGL library used for the RippleGrid background effect.