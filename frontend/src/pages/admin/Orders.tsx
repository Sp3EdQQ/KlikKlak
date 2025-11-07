import { AdminLayout } from '@/components/layout';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminOrders() {
    const orders = [
        { id: '#12345', customer: 'Jan Kowalski', date: '2024-11-07', total: 3599, status: 'pending', items: 3 },
        { id: '#12344', customer: 'Anna Nowak', date: '2024-11-07', total: 7999, status: 'processing', items: 1 },
        { id: '#12343', customer: 'Piotr Wiśniewski', date: '2024-11-06', total: 1499, status: 'completed', items: 2 },
        { id: '#12342', customer: 'Maria Kamińska', date: '2024-11-06', total: 2899, status: 'completed', items: 1 },
        { id: '#12341', customer: 'Tomasz Lewandowski', date: '2024-11-05', total: 599, status: 'cancelled', items: 1 },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Zamówienia</h1>
                    <p className="text-gray-500 mt-1">Zarządzaj zamówieniami klientów</p>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Numer zamówienia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Klient
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Produkty
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
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-blue-600">{order.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {order.items} szt.
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                                        {order.total} zł
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {order.status === 'pending' ? 'Oczekuje' :
                                             order.status === 'processing' ? 'W realizacji' :
                                             order.status === 'completed' ? 'Zrealizowane' :
                                             'Anulowane'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <Eye className="h-3 w-3" />
                                            Zobacz
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
