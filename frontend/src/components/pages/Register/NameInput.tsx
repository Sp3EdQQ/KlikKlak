import { User as UserIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

type NameInputProps = {
    id: string
    name: string
    label: string
    placeholder: string
    value: string
    onChange: (value: string) => void
}

export function NameInput({ id, name, label, placeholder, value, onChange }: NameInputProps) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id={id}
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10"
                    required
                />
            </div>
        </div>
    )
}
