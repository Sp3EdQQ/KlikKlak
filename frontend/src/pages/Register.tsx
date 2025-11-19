import { useState } from "react"
import { useNavigate } from "react-router"
import { Header, Footer } from "@/components/layout/index"
import { RegisterHeader, RegisterForm, LoginLink } from "@/components/pages/Register"
import { useAuth } from "@/hooks/useAuth"

type RegisterFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export default function Register() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (data: RegisterFormData) => {
        setError("")
        setIsLoading(true)

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: "user"
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Nie udało się utworzyć konta")
            }

            const loginResult = await login(data.email, data.password)

            if (loginResult.success) {
                navigate("/")
            } else {
                navigate("/logowanie")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Wystąpił błąd podczas rejestracji")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-md">
                        <RegisterHeader />
                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                {error}
                            </div>
                        )}
                        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
                        <LoginLink />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
