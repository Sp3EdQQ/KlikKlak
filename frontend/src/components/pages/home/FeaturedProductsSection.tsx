import { ProductCard } from './ProductCard';
import { featuredProducts } from '@/data/home';

export function FeaturedProductsSection() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">Wyróżnione produkty</h2>
                    <p className="text-gray-500">
                        Najwyżej oceniane komponenty wybrane przez naszych klientów
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.name}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            imageUrl={product.imageUrl}
                            rating={product.rating}
                            reviews={product.reviews}
                            inStock={product.inStock}
                            badge={product.badge}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
