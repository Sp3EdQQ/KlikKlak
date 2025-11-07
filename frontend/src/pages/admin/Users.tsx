import { AdminLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Mail, Shield } from 'lucide-react';

export default function AdminUsers() {
    const users = [
        { id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@example.com', role: 'user', orders: 15, joined: '2024-01-15' },
        { id: 2, name: 'Anna Nowak', email: 'anna.nowak@example.com', role: 'user', orders: 8, joined: '2024-02-20' },
        { id: 3, name: 'Admin User', email: 'admin@klikklak.pl', role: 'admin', orders: 0, joined: '2023-12-01' },
        { id: 4, name: 'Piotr Wiśniewski', email: 'piotr.wisniewski@example.com', role: 'user', orders: 23, joined: '2023-11-10' },
        { id: 5, name: 'Maria Kamińska', email: 'maria.kaminska@example.com', role: 'user', orders: 12, joined: '2024-03-05' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Użytkownicy</h1>
                    <p className="text-gray-500 mt-1">Zarządzaj użytkownikami systemu</p>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Użytkownik
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rola
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Zamówienia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data dołączenia
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Akcje
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Mail className="h-4 w-4" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                            user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {user.role === 'admin' && <Shield className="h-3 w-3" />}
                                            {user.role === 'admin' ? 'Administrator' : 'Użytkownik'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                        {user.orders}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {user.joined}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <Button variant="outline" size="sm">
                                            Zarządzaj
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
