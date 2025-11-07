import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"

type EmailInputProps = {
    value: string
    onChange: (value: string) => void
}

export function EmailInput({ value, onChange }: EmailInputProps) {
    return (
        <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Adres email
            </label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="email"
                    type="email"
                    placeholder="twoj@email.com"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10"
                    required
                />
            </div>
        </div>
    )
}