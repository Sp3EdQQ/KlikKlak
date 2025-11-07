import { Header, Footer } from "@/components/layout/index"
import { RegisterHeader, RegisterForm, LoginLink } from "@/components/pages/Register"

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
