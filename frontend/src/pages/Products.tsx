import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductsHeader } from "@/components/pages/Products/ProductsHeader"
import { CategoriesGrid } from "@/components/pages/Products/CategoriesGrid"

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
