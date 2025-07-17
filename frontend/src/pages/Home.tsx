import { Navigation } from "@/modules/Navigation"
import { Hero } from "@/modules/home/Hero"
import { Categories } from "@/modules/home/Categories"
import { FeaturedProducts } from "@/modules/home/FeaturedProducts"
import { Footer } from "@/modules/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <Navigation />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </div>
  )
}
