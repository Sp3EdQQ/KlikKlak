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
      const token = localStorage.getItem("authToken")
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
      const response = await fetch("http://localhost:3000/auth/login", {
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
      localStorage.setItem("authToken", data.accessToken)
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
      const refreshToken = localStorage.getItem("refreshToken")
      if (refreshToken) {
        await fetch("http://localhost:3000/auth/logout", {
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
      localStorage.removeItem("authToken")
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
