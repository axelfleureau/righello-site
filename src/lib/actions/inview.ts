export interface InviewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export interface InviewDetail {
  inView: boolean;
  entry: IntersectionObserverEntry;
}

export function inview(node: HTMLElement, options: InviewOptions = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    once = true
  } = options;
  
  let hasTriggered = false;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (once && hasTriggered) return;
        
        const inView = entry.isIntersecting;
        
        if (inView && once) {
          hasTriggered = true;
        }
        
        node.dispatchEvent(
          new CustomEvent<InviewDetail>('inview', {
            detail: { inView, entry }
          })
        );
        
        if (inView) {
          node.classList.add('in-view');
        } else if (!once) {
          node.classList.remove('in-view');
        }
      });
    },
    { threshold, rootMargin }
  );
  
  observer.observe(node);
  
  return {
    update(newOptions: InviewOptions) {
      observer.disconnect();
      const newObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            node.dispatchEvent(
              new CustomEvent<InviewDetail>('inview', {
                detail: { inView: entry.isIntersecting, entry }
              })
            );
          });
        },
        {
          threshold: newOptions.threshold ?? threshold,
          rootMargin: newOptions.rootMargin ?? rootMargin
        }
      );
      newObserver.observe(node);
    },
    destroy() {
      observer.disconnect();
    }
  };
}
