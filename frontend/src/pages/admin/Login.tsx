import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { Shield, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/assets/svgs"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error("Nieprawidłowe dane logowania")
      }

      const data = await response.json()

      // Sprawdź czy użytkownik ma rolę admin
      if (data.user.role !== "admin") {
        setError("Brak uprawnień administratora")
        setLoading(false)
        return
      }

      // Zapisz token i dane użytkownika w localStorage
      localStorage.setItem("adminToken", data.access_token)
      localStorage.setItem("adminUser", JSON.stringify(data.user))

      // Przekieruj do dashboardu
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd podczas logowania")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mb-2 flex items-center justify-center gap-2">
            <Logo className="h-8 w-8 text-gray-900" />
            <h1 className="text-2xl font-bold text-gray-900">KlikKlak Admin</h1>
          </div>
          <p className="text-gray-500">Zaloguj się do panelu administracyjnego</p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Hasło
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </Button>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>Tylko dla administratorów</p>
        </div>
      </div>
    </div>
  )
}
