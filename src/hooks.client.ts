if ('serviceWorker' in navigator) { 
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

export const handleError = ({ error, event }: { error: unknown; event: unknown }) => {
  console.error('Client error:', error);
};
