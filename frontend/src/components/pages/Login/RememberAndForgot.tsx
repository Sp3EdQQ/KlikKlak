export function RememberAndForgot() {
    return (
        <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Zapamiętaj mnie</span>
            </label>
            <a
                href="/reset-password"
                className="text-sm font-medium text-blue-500 hover:text-blue-600"
            >
                Zapomniałeś hasła?
            </a>
        </div>
    )
}
