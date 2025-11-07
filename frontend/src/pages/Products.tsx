import { Header, Footer } from "@/components/layout/index"
import { ProductsHeader, CategoriesGrid } from "@/components/pages/Products"

export default function Products() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <ProductsHeader />
          <CategoriesGrid />
        </section>
      </main>
      <Footer />
    </div>
  )
}
