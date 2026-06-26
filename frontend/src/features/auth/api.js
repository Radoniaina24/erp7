import { apiRequest } from '../../lib/api'

export const authKeys = {
  all: ['auth'],
  me: () => [...authKeys.all, 'me'],
}

export const authApi = {
  login: (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (payload) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  logout: () =>
    apiRequest('/auth/logout', {
      method: 'POST',
    }),

  getMe: () => apiRequest('/auth/me'),
}
