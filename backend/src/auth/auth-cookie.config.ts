export const AUTH_COOKIE_NAME = 'access_token';

export const getAuthCookieOptions = (maxAgeMs: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: maxAgeMs,
  path: '/',
});

export const getAuthCookieClearOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
});
