import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const SCROLL_DIR_THRESHOLD = 76;
const SCROLL_THRESHOLD = 200;

type ScrollStatus = {
  isPastZero: boolean;
  isPastThreshold: boolean;
  direction?: 'up' | 'down';
};

export const createTopNavScrollStatus = () => {
  let scrollY = 0;
  let lastScrollY = 0;
  let ticking = false;
  let currentStatus: ScrollStatus = {
    isPastZero: false,
    isPastThreshold: false,
    direction: undefined
  };

  function commit(update: (prev: ScrollStatus) => ScrollStatus, set: (value: ScrollStatus) => void) {
    const next = update(currentStatus);
    if (
      next.isPastZero === currentStatus.isPastZero &&
      next.isPastThreshold === currentStatus.isPastThreshold &&
      next.direction === currentStatus.direction
    ) {
      return;
    }

    currentStatus = next;
    set(currentStatus);
  }

  return readable<ScrollStatus>(
    {
      isPastZero: false,
      isPastThreshold: false,
      direction: undefined
    },
    (set) => {
      if (!browser) return;

      const updateScrollDir = () => {
        if (Math.abs(scrollY - lastScrollY) <= SCROLL_DIR_THRESHOLD) {
          ticking = false;
          return;
        }

        const nextDir = scrollY > lastScrollY ? 'down' : 'up';

        const last = scrollY > 0 ? scrollY : 0;
        lastScrollY = last;

        commit((prev) => ({
          ...prev,
          isPastThreshold: last > SCROLL_THRESHOLD,
          direction: nextDir
        }), set);

        ticking = false;
      };

      const onScroll = () => {
        scrollY = window.scrollY;
        commit((prev) => ({ ...prev, isPastZero: scrollY > 0 }), set);

        if (!ticking) {
          window.requestAnimationFrame(updateScrollDir);
          ticking = true;
        }
      };

      scrollY = window.scrollY;
      lastScrollY = scrollY;
      commit((prev) => ({
        ...prev,
        isPastZero: scrollY > 0,
        isPastThreshold: scrollY > SCROLL_THRESHOLD
      }), set);

      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  );
};
