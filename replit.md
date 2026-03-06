# Righello - Growth Agency Website

## Overview
Righello is an Italian growth agency specializing in data-driven marketing, advertising, and web development. This project is a website designed to showcase their services, highlight their expertise in delivering high ROAS and traceable conversions, and present their custom software solutions. The primary goal is to establish Righello as a leading agency in the European market with a strong focus on data and measurable results.

## User Preferences
I prefer simple language.
I want iterative development.
Ask before making major changes.
I want detailed explanations.
Always build modular, reusable components. When a good UI pattern is created (cards, buttons, animations), extract it into a shared component in `src/lib/components/` so it can be reused across all pages. This ensures consistent design/layout and simpler maintenance. Avoid duplicating styles across pages — use the shared component instead.

## System Architecture

### Tech Stack
The website is built with SvelteKit and styled using TailwindCSS. It utilizes GSAP with ScrollTrigger for advanced animations and Svelte transitions for UI effects. The Node adapter is used for deployment.

### Design System
A comprehensive design system is implemented with a base 8px spacing scale, responsive section padding, and a consistent typographic scale. Brand colors include Righello Pink (`#D6487E`) and Accent Cyan (`#06B6D4`), supporting a dual dark/light theme with a primary dark mode. Iubenda is integrated for cookie solutions and privacy policy management.

### UI/UX Decisions and Components
The website features a modern UI/UX with interactive elements and advanced animations. Key components and design decisions include:
- **Hero Section**: Fullscreen desktop hero with a 3D iPhone mockup, transparent overlay header, and scroll hints.
- **Navbar**: A floating, glassmorphism-styled navbar that adapts to scroll behavior.
- **Interactive Components**: `PhoneMockup` (3D with spring physics), `AppleScrolly` (Apple-style scrollytelling), `AppleCardsCarousel` (horizontal, drag-to-scroll with hover-to-play video), `GlowCard`, `InfiniteMarquee`, `ServiceTabs`, `AnimatedVideoTestimonials`, `HorizontalVideoShowcase`, `AnimatedCounter`, `MagneticButton`, `RippleGrid Background` (WebGL OGL-based animated grid), `BentoGrid` (Kokonutui-style grid with 6 feature types), `CardFlip` (3D flip animation), `ReelViewer` (Instagram Reels-style video player), and a global `CustomCursor`.
- **Page Structure**: Dedicated pages for Homepage (`/`), Services (`/servizi` with 3-column department cards and gradient text, `/servizi/[slug]` detail pages), Projects (`/progetti`, `/progetti/[slug]`), About Us (`/chi-siamo`), Contact (`/contatti`), and La Busa del Sauc (`/busadelsauc` — fullscreen iframe embedding of external Vercel site, header/footer hidden).
- **Mobile Optimizations**: Mobile-first design principles, responsive layouts, and disabled GSAP ScrollTrigger pinning on smaller screens.
- **Accessibility**: Support for `prefers-reduced-motion`, dynamic ARIA labels, and semantic HTML.
- **Security**: `robots.txt` configuration to block AI crawlers and scrapers, server-side bot blocking, and robust security headers (X-Frame-Options, CSP, X-Content-Type-Options, etc.).
- **Performance & SEO**: Optimized HTTP headers for caching, font preloading, comprehensive meta tags, and best practices for image/video loading. Static video thumbnails are pre-generated.
- **Contact Form**: An API endpoint (`/api/contact`) processes form submissions, leveraging OpenAI GPT for lead analysis and SendGrid for sending branded HTML emails to clients and internal teams.

## External Dependencies

-   **GSAP**: For complex and scroll-triggered animations.
-   **ScrollTrigger (GSAP plugin)**: For synchronizing animations with scroll position (scrollytelling).
-   **Firebase Storage**: Used for hosting video assets.
-   **Meta Pixel**: Integrated for tracking analytics, page views, leads, contacts, and content views.
-   **OGL**: WebGL library powering the RippleGrid background effect.
-   **OpenAI**: Integrated via Replit AI Integrations for enhancing contact form lead analysis and client confirmation emails.
-   **SendGrid**: Utilized via Replit connector for sending branded HTML emails.