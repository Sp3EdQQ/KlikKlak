import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EmailInput } from "./EmailInput"
import { PasswordInput } from "./PasswordInput"
import { RememberAndForgot } from "./RememberAndForgot"

type LoginFormProps = {
    onSubmit: (email: string, password: string) => void | Promise<void>
    isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(email, password)
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <EmailInput value={email} onChange={setEmail} />
                <PasswordInput value={password} onChange={setPassword} />
                <RememberAndForgot />

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 w-full bg-blue-500 text-base font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                </Button>
            </form>
        </div>
    )
}
