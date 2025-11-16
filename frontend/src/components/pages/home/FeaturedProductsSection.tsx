import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { apiService } from '@/services/api.service';

interface Product {
    id: string;
    name: string;
    price: string;
    stock: string;
    imageUrl: string | null;
}

export function FeaturedProductsSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiService.getProducts();
                // Pobieramy pierwsze 8 produktów jako wyróżnione
                setProducts(data.slice(0, 8));
            } catch (error) {
                console.error('Błąd pobierania produktów:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">Wyróżnione produkty</h2>
                    <p className="text-gray-500">
                        Najwyżej oceniane komponenty wybrane przez naszych klientów
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {products.map((product) => (
                        <div key={product.id} className="w-[calc(25%-12px)] min-w-[180px] max-w-[250px]">
                            <ProductCard
                                name={product.name}
                                price={parseFloat(product.price)}
                                imageUrl={product.imageUrl || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400'}
                                rating={4.5}
                                reviews={0}
                                inStock={parseInt(product.stock) > 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
