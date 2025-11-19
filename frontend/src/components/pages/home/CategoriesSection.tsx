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
        const data = await apiService.getCategories()
        setCategories(data)
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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Kategorie produktów</h2>
          <p className="text-gray-500">Znajdź idealne komponenty do swojego zestawu</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.name}
              description={category.description || ""}
              icon={getIconForCategory(category.name)}
              productsCount={0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
