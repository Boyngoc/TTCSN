import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { setAccessToken } from '../services/api/client.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const queryClient = useQueryClient()

  const logout = useCallback(() => {
    setAccessToken(null)
    setSession(null)
    queryClient.clear()
  }, [queryClient])

  const login = useCallback((response) => {
    const data = response?.data?.data
    if (!data?.accessToken || !data?.user?.role) {
      throw new Error('Phản hồi đăng nhập không đúng định dạng của backend.')
    }
    setAccessToken(data.accessToken)
    setSession({ token: data.accessToken, user: data.user })
  }, [])

  const updateUser = useCallback((user) => {
    setSession((current) => current ? { ...current, user: { ...current.user, ...user } } : current)
  }, [])

  useEffect(() => {
    const handleUnauthorized = () => logout()
    window.addEventListener('footballbooking:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('footballbooking:unauthorized', handleUnauthorized)
  }, [logout])

  const value = useMemo(() => ({ session, user: session?.user ?? null, login, logout, updateUser }), [session, login, logout, updateUser])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider')
  return context
}
