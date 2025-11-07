import { AdminLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminProducts() {
    const products = [
        { id: 1, name: 'NVIDIA RTX 4090', category: 'Karty graficzne', price: 7999, stock: 15, status: 'active' },
        { id: 2, name: 'AMD Ryzen 9 7950X', category: 'Procesory', price: 2899, stock: 23, status: 'active' },
        { id: 3, name: 'Kingston Fury 32GB', category: 'RAM', price: 599, stock: 45, status: 'active' },
        { id: 4, name: 'Samsung 990 PRO 2TB', category: 'Dyski SSD', price: 899, stock: 8, status: 'low-stock' },
        { id: 5, name: 'Corsair RM850x', category: 'Zasilacze', price: 649, stock: 0, status: 'out-of-stock' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Produkty</h1>
                        <p className="text-gray-500 mt-1">Zarządzaj produktami w sklepie</p>
                    </div>
                    <Button className="gap-2 bg-blue-500 hover:bg-blue-600">
                        <Plus className="h-4 w-4" />
                        Dodaj produkt
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Szukaj produktów..."
                                className="pl-10"
                            />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Wszystkie kategorie</option>
                            <option>Karty graficzne</option>
                            <option>Procesory</option>
                            <option>RAM</option>
                            <option>Dyski SSD</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Wszystkie statusy</option>
                            <option>Aktywne</option>
                            <option>Niski stan</option>
                            <option>Brak w magazynie</option>
                        </select>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Produkt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kategoria
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cena
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stan
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
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{product.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                                        {product.price} zł
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`font-medium ${
                                            product.stock === 0 ? 'text-red-600' :
                                            product.stock < 10 ? 'text-yellow-600' :
                                            'text-green-600'
                                        }`}>
                                            {product.stock} szt.
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            product.status === 'active' ? 'bg-green-100 text-green-700' :
                                            product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {product.status === 'active' ? 'Aktywny' :
                                             product.status === 'low-stock' ? 'Niski stan' :
                                             'Brak'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <Edit className="h-3 w-3" />
                                                Edytuj
                                            </Button>
                                            <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                <Trash2 className="h-3 w-3" />
                                                Usuń
                                            </Button>
                                        </div>
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
