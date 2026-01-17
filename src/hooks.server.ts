import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  return response;
};

export const handleError = ({ error }: { error: unknown }) => {
  console.error('Server error:', error);
  return {
    message: 'Si è verificato un errore'
  };
};
