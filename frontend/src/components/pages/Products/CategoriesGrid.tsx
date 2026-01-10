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
import { Link } from "react-router"

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

// Mapowanie obrazków dla kategorii
const getImageForCategory = (name: string): string => {
    const key = name.toLowerCase().trim()
    const imageMap: Record<string, string> = {
        "procesory": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400",
        "procesor": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400",
        "karty graficzne": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
        "karta graficzna": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
        "pamięć ram": "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400",
        "dyski ssd": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
        "dyski hdd": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
        "płyty główne": "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400",
        "zasilacze": "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400",
        "chłodzenia cpu": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
        "monitory": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        "obudowy": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400"
    }
    return imageMap[key] || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400"
}

export function CategoriesGrid() {
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
            <div className="py-16 text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Ładowanie kategorii...</p>
            </div>
        )
    }

    if (categories.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-gray-600">Brak dostępnych kategorii</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {categories.map(category => (
                <Link key={category.id} to={`/category/${category.id}`}>
                    <CategoryCard
                        name={category.name}
                        icon={getIconForCategory(category.name)}
                        count={`${category.productsCount || 0} produktów`}
                        color="blue"
                        image={getImageForCategory(category.name)}
                    />
                </Link>
            ))}
        </div>
    )
}
