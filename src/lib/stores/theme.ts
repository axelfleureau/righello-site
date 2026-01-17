import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

const isTheme = (t: string | null): t is Theme => {
  return t === 'light' || t === 'dark';
};

function createThemeStore() {
  let initialTheme: Theme = 'dark';
  
  if (browser) {
    const stored = localStorage.getItem('theme');
    if (isTheme(stored)) {
      initialTheme = stored;
    }
  }
  
  const { subscribe, set, update } = writable<Theme>(initialTheme);
  
  return {
    subscribe,
    toggle: () => {
      update(current => {
        const newTheme: Theme = current === 'light' ? 'dark' : 'light';
        if (browser) {
          localStorage.setItem('theme', newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
          window.dispatchEvent(new CustomEvent('theme-change', { detail: newTheme }));
        }
        return newTheme;
      });
    },
    set: (theme: Theme) => {
      if (browser) {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
      }
      set(theme);
    },
    init: () => {
      if (browser) {
        const stored = localStorage.getItem('theme');
        let theme: Theme = 'dark';
        
        if (isTheme(stored)) {
          theme = stored;
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        set(theme);
      }
    }
  };
}

export const theme = createThemeStore();
