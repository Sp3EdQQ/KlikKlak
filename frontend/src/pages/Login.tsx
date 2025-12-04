import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Header, Footer } from "@/components/layout/index"
import { LoginHeader, LoginForm, RegisterLink } from "@/components/pages/Login"
import { useAuth } from "@/hooks/useAuth"

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Jeśli użytkownik jest już zalogowany, przekieruj na stronę główną
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (email: string, password: string) => {
    setError("")
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      // Przekieruj na stronę główną po udanym logowaniu
      navigate("/")
    } else {
      setError(result.error || "Wystąpił błąd podczas logowania")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <LoginHeader />
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            <RegisterLink />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
