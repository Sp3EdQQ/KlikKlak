import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NameInput } from "./NameInput"
import { ConfirmPasswordInput } from "./ConfirmPasswordInput"
import { EmailInput, PasswordInput } from "@/components/pages/Login"

type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

type RegisterFormProps = {
  onSubmit: (data: RegisterFormData) => void | Promise<void>
  isLoading?: boolean
}

export function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <NameInput
            id="firstName"
            name="firstName"
            label="Imię"
            placeholder="Jan"
            value={formData.firstName}
            onChange={value => setFormData({ ...formData, firstName: value })}
          />
          <NameInput
            id="lastName"
            name="lastName"
            label="Nazwisko"
            placeholder="Kowalski"
            value={formData.lastName}
            onChange={value => setFormData({ ...formData, lastName: value })}
          />
        </div>

        <EmailInput
          value={formData.email}
          onChange={value => setFormData({ ...formData, email: value })}
        />

        <PasswordInput
          value={formData.password}
          onChange={value => setFormData({ ...formData, password: value })}
        />

        <ConfirmPasswordInput
          value={formData.confirmPassword}
          onChange={value => setFormData({ ...formData, confirmPassword: value })}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full bg-blue-500 text-base font-semibold hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Rejestracja..." : "Zarejestruj się"}
        </Button>
      </form>
    </div>
  )
}
