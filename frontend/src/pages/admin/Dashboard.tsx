import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout';
import { Package, ShoppingCart, Users, DollarSign, LayoutDashboard } from 'lucide-react';
import { apiService } from '@/services/api.service';

interface Stats {
    users: number;
    products: number;
    orders: number;
    categories: number;
    tags: number;
    wishlists: number;
    totalSales: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await apiService.getStats();
                setStats(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching stats:', err);
                setError('Nie udało się pobrać statystyk');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = stats ? [
        {
            title: 'Całkowita sprzedaż',
            value: `${stats.totalSales.toFixed(2)} zł`,
            icon: DollarSign,
            color: 'blue',
        },
        {
            title: 'Zamówienia',
            value: stats.orders.toString(),
            icon: ShoppingCart,
            color: 'green',
        },
        {
            title: 'Produkty',
            value: stats.products.toString(),
            icon: Package,
            color: 'purple',
        },
        {
            title: 'Użytkownicy',
            value: stats.users.toString(),
            icon: Users,
            color: 'orange',
        },
        {
            title: 'Kategorie',
            value: stats.categories.toString(),
            icon: LayoutDashboard,
            color: 'pink',
        },
        {
            title: 'Tagi',
            value: stats.tags.toString(),
            icon: LayoutDashboard,
            color: 'indigo',
        },
        {
            title: 'Listy życzeń',
            value: stats.wishlists.toString(),
            icon: Users,
            color: 'red',
        },
    ] : [];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Witaj w panelu administracyjnym KlikKlak</p>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Ładowanie danych...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {statCards.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.title}
                                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                                                <Icon className={`h-6 w-6 text-${stat.color}-500`} />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                        <p className="text-sm text-gray-500">{stat.title}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Ostatnia aktywność</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <p className="font-medium text-gray-900">Nowe zamówienie #12345</p>
                                        <p className="text-sm text-gray-500">2 minuty temu</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        Nowe
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <p className="font-medium text-gray-900">Produkt dodany: RTX 4090</p>
                                        <p className="text-sm text-gray-500">1 godzinę temu</p>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        Produkt
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="font-medium text-gray-900">Nowy użytkownik zarejestrowany</p>
                                        <p className="text-sm text-gray-500">3 godziny temu</p>
                                    </div>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                        Użytkownik
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
