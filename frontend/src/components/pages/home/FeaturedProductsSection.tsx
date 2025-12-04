import { ProductCard } from "./ProductCard"
import { useAllComponents } from "@/hooks/useQueries"

export function FeaturedProductsSection() {
  const { data: allProducts = [], isLoading: loading } = useAllComponents()

  // Pobieramy pierwsze 8 produktów jako wyróżnione
  const products = allProducts.slice(0, 8)

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
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Wyróżnione produkty</h2>
          <p className="text-gray-500">
            Najwyżej oceniane komponenty wybrane przez naszych klientów
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-0.75rem)] max-w-xs min-w-[11.25rem]"
            >
              <ProductCard
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
