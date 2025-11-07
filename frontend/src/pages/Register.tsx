import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { RegisterHeader } from "@/components/pages/Register/RegisterHeader"
import { RegisterForm } from "@/components/pages/Register/RegisterForm"
import { LoginLink } from "@/components/pages/Register/LoginLink"

type RegisterFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export default function Register() {
    const handleRegister = (data: RegisterFormData) => {
        // TODO: Implementacja rejestracji
        console.log("Register:", data)
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-md">
                        <RegisterHeader />
                        <RegisterForm onSubmit={handleRegister} />
                        <LoginLink />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
