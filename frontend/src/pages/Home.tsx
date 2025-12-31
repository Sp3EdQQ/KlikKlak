import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { BannerCarousel } from "@/components/BannerCarousel"
import { Header, Footer } from "@/components/layout/index"
import { CategoriesSection, FeaturedProductsSection } from "@/components/pages/home"
import { Chatbot } from "@/components/Chatbot"
import Dashboard from "./admin/Dashboard"
import type { BannerData } from "@/types"

const banners: BannerData[] = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwfGVufDF8fHx8MTc2MTQwMDc3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Premium Gaming PCs",
    subtitle: "Experience ultimate performance with our custom-built gaming rigs",
    ctaText: "Shop Gaming PCs",
    gradient: "from-black/80 via-black/60 to-transparent"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1662830857519-2f9b28e3b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGhhcmR3YXJlJTIwY29tcG9uZW50c3xlbnwxfHx8fDE3NjEzODE4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "PC Components & Upgrades",
    subtitle: "High-quality parts from top brands - Build your dream setup",
    ctaText: "Browse Components",
    gradient: "from-blue-900/80 via-blue-900/50 to-transparent"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxNDUyMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Laptops & Workstations",
    subtitle: "Powerful portable solutions for work and creative professionals",
    ctaText: "View Laptops",
    gradient: "from-gray-900/80 via-gray-900/50 to-transparent"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1613442986373-af81e5c618d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZ2IlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjE0ODI2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "RGB & Peripherals",
    subtitle: "Customize your setup with premium keyboards, mice, and lighting",
    ctaText: "Shop Accessories",
    gradient: "from-purple-900/80 via-purple-900/50 to-transparent"
  }
]

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const hostname = window.location.hostname
    const isAdminSubdomain = hostname.startsWith("admin.")
    setIsAdmin(isAdminSubdomain)

    // Jeśli to subdomena admin, sprawdź autoryzację
    if (isAdminSubdomain) {
      const token = localStorage.getItem("adminToken")
      const userStr = localStorage.getItem("adminUser")

      if (!token || !userStr) {
        navigate("/login")
        return
      }

      try {
        const user = JSON.parse(userStr)
        if (user.role !== "admin") {
          navigate("/login")
        }
      } catch (error) {
        navigate("/login")
      }
    }
  }, [navigate])

  // If on admin subdomain, show admin dashboard
  if (isAdmin) {
    return <Dashboard />
  }

  // Otherwise show regular home page
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      <BannerCarousel banners={banners} autoPlayInterval={5000} />

      <main className="flex-1">
        <CategoriesSection />
        <FeaturedProductsSection />
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}
