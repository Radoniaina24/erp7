import { apiRequest } from '@/lib/api'
import type { User } from '@/types/user'
import type { LoginFormValues } from './schemas/login-schema'

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}

interface AuthResponse {
  user: User
}

interface LogoutResponse {
  message: string
}

export const authApi = {
  login: (credentials: LoginFormValues) =>
    apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (payload: LoginFormValues & Record<string, unknown>) =>
    apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  logout: () =>
    apiRequest<LogoutResponse>('/auth/logout', {
      method: 'POST',
    }),

  getMe: () => apiRequest<User>('/auth/me'),
}
