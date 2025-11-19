import { Link } from "react-router"

export function LoginLink() {
  return (
    <p className="mt-6 text-center text-sm text-gray-600">
      Masz już konto?{" "}
      <Link to="/logowanie" className="font-semibold text-blue-500 hover:text-blue-600">
        Zaloguj się
      </Link>
    </p>
  )
}
