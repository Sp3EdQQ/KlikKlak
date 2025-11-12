import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { apiService } from '@/services/api.service';

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsData, categoriesData] = await Promise.all([
                    apiService.getProducts(),
                    apiService.getCategories(),
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
                setError(null);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Nie udało się pobrać produktów');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten produkt?')) {
            try {
                await apiService.deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Nie udało się usunąć produktu');
            }
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { label: 'Brak', color: 'bg-red-100 text-red-700', textColor: 'text-red-600' };
        if (stock < 10) return { label: 'Niski stan', color: 'bg-yellow-100 text-yellow-700', textColor: 'text-yellow-600' };
        return { label: 'Aktywny', color: 'bg-green-100 text-green-700', textColor: 'text-green-600' };
    };

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

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Ładowanie produktów...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Search and Filters */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Szukaj produktów..."
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="all">Wszystkie kategorie</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    Brak produktów do wyświetlenia
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Produkt
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Opis
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
                                        {filteredProducts.map((product) => {
                                            const stockStatus = getStockStatus(product.stockQuantity || 0);
                                            return (
                                                <tr key={product.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-900">{product.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500 max-w-xs truncate">
                                                            {product.description || 'Brak opisu'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                                                        {product.price} zł
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`font-medium ${stockStatus.textColor}`}>
                                                            {product.stockQuantity || 0} szt.
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                                                            {stockStatus.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="outline" size="sm" className="gap-1">
                                                                <Edit className="h-3 w-3" />
                                                                Edytuj
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                onClick={() => handleDelete(product.id)}
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                                Usuń
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
