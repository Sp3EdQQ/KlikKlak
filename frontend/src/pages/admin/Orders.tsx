import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api.service';

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await apiService.getOrders();
                setOrders(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Nie udało się pobrać zamówień');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'pending':
                return { label: 'Oczekuje', color: 'bg-yellow-100 text-yellow-700' };
            case 'processing':
                return { label: 'W realizacji', color: 'bg-blue-100 text-blue-700' };
            case 'completed':
                return { label: 'Zrealizowane', color: 'bg-green-100 text-green-700' };
            case 'cancelled':
                return { label: 'Anulowane', color: 'bg-red-100 text-red-700' };
            default:
                return { label: status, color: 'bg-gray-100 text-gray-700' };
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pl-PL');
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Zamówienia</h1>
                    <p className="text-gray-500 mt-1">Zarządzaj zamówieniami klientów</p>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Ładowanie zamówień...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {orders.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                Brak zamówień do wyświetlenia
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Data
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Suma
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Akcje
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.map((order) => {
                                        const statusInfo = getStatusInfo(order.status);
                                        return (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-blue-600">#{order.id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {formatDate(order.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                                                    {order.totalAmount} zł
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <Button variant="outline" size="sm" className="gap-1">
                                                        <Eye className="h-3 w-3" />
                                                        Zobacz
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
