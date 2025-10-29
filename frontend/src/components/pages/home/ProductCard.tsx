import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    badge?: string;
}

export function ProductCard({
    name,
    price,
    originalPrice,
    imageUrl,
    rating,
    reviews,
    inStock,
    badge,
}: ProductCardProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg">
            {/* Badge */}
            {badge && (
                <div className="absolute left-3 top-3 z-10">
                    <Badge variant="destructive">{badge}</Badge>
                </div>
            )}

            {/* Image */}
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-2 line-clamp-2">{name}</h3>

                {/* Rating */}
                <div className="mb-3 flex items-center gap-1">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-100 text-gray-100'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-gray-500">({reviews})</span>
                </div>

                {/* Price */}
                <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-2xl">${price.toFixed(2)}</span>
                    {originalPrice && (
                        <>
                            <span className="text-gray-500 line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                            <Badge variant="secondary">-{discount}%</Badge>
                        </>
                    )}
                </div>

                {/* Stock status */}
                <div className="mb-3">
                    {inStock ? (
                        <span className="text-green-600">In Stock</span>
                    ) : (
                        <span className="text-red-500">Out of Stock</span>
                    )}
                </div>

                {/* Add to cart button */}
                <Button className="mt-auto w-full gap-2 bg-blue-500 hover:bg-blue-600" disabled={!inStock}>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
