export interface JwtUser {
  sub: string;
  email?: string;
  role?: 'admin' | 'user';
  iat?: number;
  exp?: number;
}

const TOKEN_KEY = 'access_token';

export const TokenService = {
  save(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

export function getUserFromToken(): JwtUser | null {
  const token = TokenService.get();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    console.error('Invalid JWT token');
    return null;
  }
}
