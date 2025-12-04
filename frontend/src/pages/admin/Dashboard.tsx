import { AdminLayout } from "@/components/layout"
import { Package, ShoppingCart, Users, DollarSign, LayoutDashboard } from "lucide-react"
import { useStats } from "@/hooks/useQueries"

export default function AdminDashboard() {
    const { data: stats, isLoading: loading, error } = useStats()

    const statCards = stats
        ? [
            {
                title: "Całkowita sprzedaż",
                value: `${stats.totalSales.toFixed(2)} zł`,
                icon: DollarSign,
                color: "blue"
            },
            {
                title: "Zamówienia",
                value: stats.orders.toString(),
                icon: ShoppingCart,
                color: "green"
            },
            {
                title: "Produkty",
                value: stats.products.toString(),
                icon: Package,
                color: "purple"
            },
            {
                title: "Użytkownicy",
                value: stats.users.toString(),
                icon: Users,
                color: "orange"
            },
            {
                title: "Kategorie",
                value: stats.categories.toString(),
                icon: LayoutDashboard,
                color: "pink"
            },
            {
                title: "Tagi",
                value: stats.tags.toString(),
                icon: LayoutDashboard,
                color: "indigo"
            },
            {
                title: "Listy życzeń",
                value: stats.wishlists.toString(),
                icon: Users,
                color: "red"
            }
        ]
        : []

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-gray-500">Witaj w panelu administracyjnym KlikKlak</p>
                </div>

                {loading && (
                    <div className="py-12 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Ładowanie danych...</p>
                    </div>
                )}

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                        {error.message}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {statCards.map(stat => {
                                const Icon = stat.icon
                                return (
                                    <div
                                        key={stat.title}
                                        className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                                                <Icon className={`h-6 w-6 text-${stat.color}-500`} />
                                            </div>
                                        </div>
                                        <h3 className="mb-1 text-2xl font-bold text-gray-900">
                                            {stat.value}
                                        </h3>
                                        <p className="text-sm text-gray-500">{stat.title}</p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Recent Activity */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">Ostatnia aktywność</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-100 py-3">
                                    <div>
                                        <p className="font-medium text-gray-900">Nowe zamówienie #12345</p>
                                        <p className="text-sm text-gray-500">2 minuty temu</p>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                        Nowe
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-100 py-3">
                                    <div>
                                        <p className="font-medium text-gray-900">Produkt dodany: RTX 4090</p>
                                        <p className="text-sm text-gray-500">1 godzinę temu</p>
                                    </div>
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                        Produkt
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Nowy użytkownik zarejestrowany
                                        </p>
                                        <p className="text-sm text-gray-500">3 godziny temu</p>
                                    </div>
                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                                        Użytkownik
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    )
}
