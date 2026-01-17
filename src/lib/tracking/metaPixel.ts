import { browser } from '$app/environment';

declare global {
  interface Window {
    fbq: (
      action: string,
      eventOrPixelId: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq: unknown;
  }
}

let initialized = false;
let isFirstNavigation = true;

export function initMetaPixel(pixelId: string | undefined): void {
  if (!browser || !pixelId || initialized) return;
  
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
  
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`;
  document.body.appendChild(noscript);
  
  initialized = true;
}

export function trackPageView(): void {
  if (!browser) return;
  if (isFirstNavigation) {
    isFirstNavigation = false;
    return;
  }
  if (typeof window.fbq !== 'function') return;
  window.fbq('track', 'PageView');
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!browser || typeof window.fbq !== 'function') return;
  window.fbq('track', eventName, params);
}

export function trackLead(params?: Record<string, unknown>): void {
  trackEvent('Lead', params);
}

export function trackContact(params?: Record<string, unknown>): void {
  trackEvent('Contact', params);
}

export function trackViewContent(params?: Record<string, unknown>): void {
  trackEvent('ViewContent', params);
}
