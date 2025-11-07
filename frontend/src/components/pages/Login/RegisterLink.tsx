import { Link } from "react-router"

export function RegisterLink() {
    return (
        <p className="mt-6 text-center text-sm text-gray-600">
            Nie masz jeszcze konta?{" "}
            <Link to="/rejestracja" className="font-semibold text-blue-500 hover:text-blue-600">
                Zarejestruj się
            </Link>
        </p>
    )
}
