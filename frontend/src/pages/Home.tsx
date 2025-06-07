import { Navigation } from "@/modules/home/Navigation"
import { Hero } from "@/modules/home/Hero"
import { Categories } from "@/modules/home/Categories"
import { FeaturedProducts } from "@/modules/home/FeaturedProducts"
import { Footer } from "@/modules/home/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <Navigation />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </div>
  )
}
