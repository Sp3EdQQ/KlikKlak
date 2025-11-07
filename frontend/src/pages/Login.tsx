import { Header, Footer } from "@/components/layout/index"
import { LoginHeader, LoginForm, RegisterLink } from "@/components/pages/Login"

export default function Login() {
    const handleLogin = (email: string, password: string) => {
        // TODO: Implementacja logowania
        console.log("Login:", { email, password })
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-md">
                        <LoginHeader />
                        <LoginForm onSubmit={handleLogin} />
                        <RegisterLink />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
