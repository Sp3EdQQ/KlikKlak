import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"

type PasswordInputProps = {
  value: string
  onChange: (value: string) => void
}

export function PasswordInput({ value, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
        Hasło
      </label>
      <div className="relative">
        <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="pr-10 pl-10"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}
