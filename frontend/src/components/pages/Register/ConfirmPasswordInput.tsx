import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"

type ConfirmPasswordInputProps = {
    value: string
    onChange: (value: string) => void
}

export function ConfirmPasswordInput({ value, onChange }: ConfirmPasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                Potwierdź hasło
            </label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10 pr-10"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
            </div>
        </div>
    )
}
