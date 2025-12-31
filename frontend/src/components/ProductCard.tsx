import { Link } from "react-router"
import { getProductUrl } from "@/lib/product-utils"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/useCart"

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
  id,
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
  const { addToCart, isAddingToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Adding to cart:', { productId: id, quantity: 1 })
    addToCart({ productId: id, quantity: 1 })
  }

  return (
    <div className="group overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1">
      <Link to={productUrl}>
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={e => {
              const target = e.target as HTMLImageElement
              target.src = "https://placehold.co/400x400/e5e7eb/6b7280?text=Brak+zdjęcia"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={productUrl}>
          <h3 className="mb-3 line-clamp-2 min-h-[3rem] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        {rating !== undefined && (
          <div className="mb-3 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className="text-sm text-gray-500 font-medium">({reviewCount})</span>
            )}
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{price.toFixed(2)} zł</span>
          {isAvailable ? (
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Dostępny</span>
          ) : (
            <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">Brak</span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!isAvailable || isAddingToCart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-lg"
          size="default"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAddingToCart ? "Dodawanie..." : "Do koszyka"}
        </Button>
      </div>
    </div>
  )
}
