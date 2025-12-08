import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("accessToken")
      const userStr = localStorage.getItem("authUser")

      if (token && userStr) {
        const user = JSON.parse(userStr) as User
        setAuthState({
          user,
          token,
          isAuthenticated: true
        })
      }
    } catch (error) {
      console.error("Error checking auth:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const error = await response.json()
        return { success: false, error: error.message || "Nieprawidłowe dane logowania" }
      }

      const data = await response.json()

      // Zapisz tokeny i dane użytkownika
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      localStorage.setItem("authUser", JSON.stringify(data.user))

      setAuthState({
        user: data.user,
        token: data.accessToken,
        isAuthenticated: true
      })

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Wystąpił błąd podczas logowania" }
    }
  }

  const logout = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const refreshToken = localStorage.getItem("refreshToken")
      if (refreshToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ refreshToken })
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("authUser")
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false
      })
    }
  }

  return {
    ...authState,
    login,
    logout,
    loading
  }
}
