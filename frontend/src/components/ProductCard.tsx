import { Link } from "react-router"
import { getProductUrl } from "@/lib/product-utils"

type ProductCardProps = {
    id: string
    name: string
    price: number
    imageUrl: string
    stock: number
}

export function ProductCard({ id, name, price, imageUrl, stock }: ProductCardProps) {
    const productUrl = getProductUrl(id, name)

    return (
        <Link
            to={productUrl}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
        >
            <div className="aspect-square overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-purple-600">{name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-600">{price.toFixed(2)} zł</span>
                    {stock > 0 ? (
                        <span className="text-sm text-green-600">Dostępny</span>
                    ) : (
                        <span className="text-sm text-red-600">Brak</span>
                    )}
                </div>
            </div>
        </Link>
    )
}
