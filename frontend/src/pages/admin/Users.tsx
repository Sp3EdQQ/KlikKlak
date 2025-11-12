import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Mail, Shield } from 'lucide-react';
import { apiService } from '@/services/api.service';

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await apiService.getUsers();
                setUsers(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Nie udało się pobrać użytkowników');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pl-PL');
    };

    const getInitials = (firstName?: string, lastName?: string) => {
        if (firstName && lastName) {
            return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        }
        if (firstName) return firstName.charAt(0).toUpperCase();
        return 'U';
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Użytkownicy</h1>
                    <p className="text-gray-500 mt-1">Zarządzaj użytkownikami systemu</p>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Ładowanie użytkowników...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {users.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                Brak użytkowników do wyświetlenia
                            </div>
                        ) : (
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
                                            Telefon
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
                                                        {getInitials(user.firstName, user.lastName)}
                                                    </div>
                                                    <div className="font-medium text-gray-900">
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Mail className="h-4 w-4" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {user.phone || 'Brak'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {formatDate(user.createdAt)}
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
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
