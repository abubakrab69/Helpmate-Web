import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '../services/authService'

const TOKEN_KEY = 'helpmate-token'
const USER_KEY = 'helpmate-user'

const AuthContext = createContext(null)

function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

function removeFromStorage(key) {
  localStorage.removeItem(key)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage(USER_KEY))
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(false)

  const isAuthenticated = !!token && !!user

  const saveAuth = useCallback((newToken, newUser) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken)
      setToken(newToken)
    }
    if (newUser) {
      saveToStorage(USER_KEY, newUser)
      setUser(newUser)
    }
  }, [])

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const data = await authService.login(credentials)
      const { token: newToken, user: newUser, ...rest } = data
      saveAuth(newToken || data.access_token, newUser || data.user || rest)
      return data
    } catch (err) {
      if (err.response?.status === 403 && err.response?.data?.action === 'verification') {
        throw { type: 'verification', data: err.response.data }
      }
      throw err
    } finally {
      setLoading(false)
    }
  }, [saveAuth])

  const register = useCallback(async (userData) => {
    setLoading(true)
    try {
      const data = await authService.register(userData)
      const { token: newToken, user: newUser, ...rest } = data
      if (newToken || data.access_token) {
        saveAuth(newToken || data.access_token, newUser || data.user || rest)
      }
      return data
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }, [saveAuth])

  const sendOtp = useCallback(async (payload) => {
    setLoading(true)
    try {
      const data = await authService.sendOtp(payload)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const verifyOtp = useCallback(async (payload) => {
    setLoading(true)
    try {
      const data = await authService.verifyOtp(payload)
      const { token: newToken, user: newUser, ...rest } = data
      if (newToken || data.access_token) {
        saveAuth(newToken || data.access_token, newUser || data.user || rest)
      }
      return data
    } finally {
      setLoading(false)
    }
  }, [saveAuth])

  const pinLoginVerify = useCallback(async (payload) => {
    setLoading(true)
    try {
      const data = await authService.pinLoginVerify(payload)
      const { token: newToken, user: newUser, ...rest } = data
      if (newToken || data.access_token) {
        saveAuth(newToken || data.access_token, newUser || data.user || rest)
      }
      return data
    } finally {
      setLoading(false)
    }
  }, [saveAuth])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
    } catch {
    } finally {
      removeFromStorage(TOKEN_KEY)
      removeFromStorage(USER_KEY)
      setToken(null)
      setUser(null)
      setLoading(false)
    }
  }, [])

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    sendOtp,
    verifyOtp,
    pinLoginVerify,
    saveAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
