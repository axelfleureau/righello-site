import { createHash } from 'crypto';
import { env } from '$env/dynamic/private';

const COOKIE_NAME = 'righello_admin';

function computeToken(): string {
  return createHash('sha256')
    .update(`righello_admin_${env.ADMIN_SECRET_KEY}`)
    .digest('hex');
}

export function checkAdminPassword(password: string): boolean {
  return password === env.ADMIN_SECRET_KEY;
}

export function getAdminToken(): string {
  return computeToken();
}

export function isAdminAuthenticated(cookies: { get: (name: string) => string | undefined }): boolean {
  const token = cookies.get(COOKIE_NAME);
  if (!token) return false;
  return token === computeToken();
}

export function setAdminCookie(cookies: { set: (name: string, value: string, options: Record<string, unknown>) => void }): void {
  cookies.set(COOKIE_NAME, computeToken(), {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function deleteAdminCookie(cookies: { delete: (name: string, options: Record<string, unknown>) => void }): void {
  cookies.delete(COOKIE_NAME, { path: '/' });
}

export { COOKIE_NAME };
