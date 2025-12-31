import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"

interface ProductCardProps {
  id?: string
  name: string
  price: number
  originalPrice?: number
  imageUrl: string
  rating: number
  reviews: number
  inStock: boolean
  badge?: string
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  rating,
  reviews,
  inStock,
  badge
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const cardContent = (
    <>
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="destructive" className="text-xs font-bold shadow-lg">
            {badge}
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-3 line-clamp-2 text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{name}</h3>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">({reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">${price.toFixed(2)}</span>
          {originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <Badge variant="secondary" className="text-xs font-bold bg-blue-100 text-blue-700">
                -{discount}%
              </Badge>
            </>
          )}
        </div>

        {/* Stock status */}
        <div className="mb-3">
          {inStock ? (
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">In Stock</span>
          ) : (
            <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full inline-block">Out of Stock</span>
          )}
        </div>

        {/* Add to cart button */}
        <Button
          className="mt-auto w-full gap-2 bg-blue-500 py-2 text-sm font-semibold hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
          disabled={!inStock}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // TODO: Add to cart logic
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </>
  )

  if (id) {
    return (
      <Link
        to={`/products/${id}`}
        className="group relative flex w-full flex-col overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1"
      >
        {cardContent}
      </Link>
    )
  }

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1">
      {cardContent}
    </div>
  )
}
