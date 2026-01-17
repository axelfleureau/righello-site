// Client hooks - no external dependencies needed
export const handleError = ({ error, event }: { error: unknown; event: unknown }) => {
  console.error('Client error:', error);
};
