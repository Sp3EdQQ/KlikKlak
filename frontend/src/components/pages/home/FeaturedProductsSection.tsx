import { ProductCard } from "./ProductCard"
import { useRandomProducts } from "@/hooks/useQueries"

export function FeaturedProductsSection() {
  const { data: products = [], isLoading: loading } = useRandomProducts(8)

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Wyróżnione produkty</h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Najwyżej oceniane komponenty wybrane przez naszych klientów
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-xs min-w-[11.25rem]"
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={parseFloat(product.price)}
                imageUrl={
                  product.imageUrl ||
                  "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400"
                }
                rating={4.5}
                reviews={0}
                inStock={parseInt(product.stock) > 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
