import { AdminLayout } from '@/components/layout';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        {
            title: 'Całkowita sprzedaż',
            value: '45,231 zł',
            change: '+20.1%',
            icon: DollarSign,
            changeType: 'positive' as const,
        },
        {
            title: 'Zamówienia',
            value: '2,350',
            change: '+15.3%',
            icon: ShoppingCart,
            changeType: 'positive' as const,
        },
        {
            title: 'Produkty',
            value: '1,256',
            change: '+8.2%',
            icon: Package,
            changeType: 'positive' as const,
        },
        {
            title: 'Użytkownicy',
            value: '573',
            change: '+12.5%',
            icon: Users,
            changeType: 'positive' as const,
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Witaj w panelu administracyjnym KlikKlak</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.title}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Icon className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <span
                                        className={`text-sm font-medium ${
                                            stat.changeType === 'positive'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {stat.change}
                                    </span>
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
            </div>
        </AdminLayout>
    );
}
