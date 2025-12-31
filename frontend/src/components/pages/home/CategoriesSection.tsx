import { useEffect, useState } from "react"
import { CategoryCard } from "./CategoryCard"
import { apiService } from "@/services/api.service"
import {
  Cpu,
  Monitor,
  HardDrive,
  Keyboard,
  Mouse,
  Headphones,
  MemoryStick,
  Zap,
  Box,
  Fan,
  Server,
  Disc
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string | null
  productsCount?: number
}

// Mapowanie ikon dla kategorii
const iconMap: Record<string, LucideIcon> = {
  "procesory": Cpu,
  "procesor": Cpu,
  "karty graficzne": Monitor,
  "karta graficzna": Monitor,
  "pamięć ram": MemoryStick,
  "dyski ssd": Disc,
  "dyski hdd": HardDrive,
  "płyty główne": Server,
  "zasilacze": Zap,
  "chłodzenia cpu": Fan,
  "monitory": Monitor,
  "obudowy": Box,
  "klawiatury": Keyboard,
  "myszki": Mouse,
  "słuchawki": Headphones
}

const getIconForCategory = (name: string): LucideIcon => {
  const key = name.toLowerCase().trim()
  return iconMap[key] || HardDrive // Domyślna ikona
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await apiService.getCategories()

        // Pobierz liczbę produktów dla każdej kategorii
        const categoriesWithCounts = await Promise.all(
          categoriesData.map(async (category: Category) => {
            try {
              const products = await apiService.getProducts({ categoryId: category.id })
              return {
                ...category,
                productsCount: products.pagination?.total || products.data?.length || 0
              }
            } catch (error) {
              console.error(`Błąd pobierania produktów dla kategorii ${category.name}:`, error)
              return {
                ...category,
                productsCount: 0
              }
            }
          })
        )

        setCategories(categoriesWithCounts)
      } catch (error) {
        console.error("Błąd pobierania kategorii:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Kategorie produktów</h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">Znajdź idealne komponenty do swojego zestawu</p>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.name}
              description={category.description || ""}
              icon={getIconForCategory(category.name)}
              productsCount={category.productsCount || 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
