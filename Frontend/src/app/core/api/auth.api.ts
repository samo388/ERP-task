import { apiRequest } from '../http';

export const AuthAPI = {
  async login(data: { email: string; password: string }) {
    return apiRequest<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
