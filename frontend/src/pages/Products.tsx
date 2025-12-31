import { Header, Footer } from "@/components/layout/index"
import { ProductsHeader, CategoriesGrid } from "@/components/pages/Products"
import { Chatbot } from "@/components/Chatbot"

export default function Products() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <ProductsHeader />
          <CategoriesGrid />
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
