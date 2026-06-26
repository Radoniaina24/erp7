import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { authApi, authKeys } from './api'

export function useMe() {
  const setUser = useAuthStore((state) => state.setUser)
  const clearUser = useAuthStore((state) => state.clearUser)

  const query = useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.getMe,
    retry: false,
  })

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data)
    }
  }, [query.isSuccess, query.data, setUser])

  useEffect(() => {
    if (query.isError) {
      clearUser()
    }
  }, [query.isError, clearUser])

  return query
}

export function useLogin() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user)
      queryClient.setQueryData(authKeys.me(), data.user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const clearUser = useAuthStore((state) => state.clearUser)

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser()
      queryClient.removeQueries({ queryKey: authKeys.all })
    },
  })
}
