import { Link } from "react-router"
import { getProductUrl } from "@/lib/product-utils"
import { Star } from "lucide-react"

type ProductCardProps = {
  id: string
  name: string
  price: number
  imageUrl: string
  stock?: number
  inStock?: boolean
  rating?: number
  reviewCount?: number
}

export function ProductCard({
  name,
  price,
  imageUrl,
  stock,
  inStock = true,
  rating,
  reviewCount
}: ProductCardProps) {
  const productUrl = getProductUrl(name)
  const isAvailable = stock !== undefined ? stock > 0 : inStock

  return (
    <Link
      to={productUrl}
      className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          onError={e => {
            const target = e.target as HTMLImageElement
            target.src = "https://placehold.co/400x400/e5e7eb/6b7280?text=Brak+zdjęcia"
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[3rem] font-semibold text-gray-900 group-hover:text-blue-600">
          {name}
        </h3>

        {/* Rating */}
        {rating !== undefined && (
          <div className="mb-2 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className="text-xs text-gray-500">({reviewCount})</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">{price.toFixed(2)} zł</span>
          {isAvailable ? (
            <span className="text-sm font-medium text-green-600">Dostępny</span>
          ) : (
            <span className="text-sm font-medium text-red-600">Brak</span>
          )}
        </div>
      </div>
    </Link>
  )
}
