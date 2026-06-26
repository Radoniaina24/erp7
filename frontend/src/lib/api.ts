const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface ApiErrorBody {
  message?: string | string[]
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = (await response.json().catch(() => null)) as ApiErrorBody | null

  if (!response.ok) {
    const message =
      (typeof data?.message === 'string' ? data.message : null) ??
      (Array.isArray(data?.message) ? data.message.join(', ') : null) ??
      'Une erreur est survenue'

    throw new ApiError(message, response.status)
  }

  return data as T
}
