import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Header, Footer } from "@/components/layout"
import { ProductCard } from "@/components/ProductCard"
import { useCategory, useProducts } from "@/hooks/useQueries"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal } from "lucide-react"

type Product = {
    id: string
    name: string
    description: string | null
    price: string
    stock: number
    imageUrl: string | null
    categoryId: string | null
}

type Category = {
    id: string
    name: string
    description: string | null
}

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "newest"

export default function Category() {
    const { id } = useParams<{ id: string }>()
    const { data: category, isLoading: categoryLoading } = useCategory(id)
    const { data: allProducts = [], isLoading: productsLoading } = useProducts()

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [showFilters, setShowFilters] = useState(true)

    // Filters
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
    const [maxPrice, setMaxPrice] = useState(10000)
    const [searchTerm, setSearchTerm] = useState("")
    const [inStock, setInStock] = useState(false)
    const [sortBy, setSortBy] = useState<SortOption>("name-asc")

    const loading = categoryLoading || productsLoading
    const products = allProducts.filter((p: Product) => p.categoryId === id)

    useEffect(() => {
        if (products.length > 0) {
            const max = Math.max(...products.map((p: Product) => parseFloat(p.price)))
            setMaxPrice(Math.ceil(max))
            setPriceRange([0, Math.ceil(max)])
        }
    }, [products])

    useEffect(() => {
        applyFilters()
    }, [products, priceRange, searchTerm, inStock, sortBy])

    const applyFilters = () => {
        let filtered = [...products]

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Price filter
        filtered = filtered.filter(p => {
            const price = parseFloat(p.price)
            return price >= priceRange[0] && price <= priceRange[1]
        })

        // Stock filter
        if (inStock) {
            filtered = filtered.filter(p => p.stock > 0)
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name-asc":
                    return a.name.localeCompare(b.name)
                case "name-desc":
                    return b.name.localeCompare(a.name)
                case "price-asc":
                    return parseFloat(a.price) - parseFloat(b.price)
                case "price-desc":
                    return parseFloat(b.price) - parseFloat(a.price)
                default:
                    return 0
            }
        })

        setFilteredProducts(filtered)
    }

    const resetFilters = () => {
        setPriceRange([0, maxPrice])
        setSearchTerm("")
        setInStock(false)
        setSortBy("name-asc")
    }

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col bg-gray-50">
                <Header />
                <main className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <p className="mt-4 text-gray-600">Ładowanie produktów...</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (!category) {
        return (
            <div className="flex min-h-screen flex-col bg-gray-50">
                <Header />
                <main className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Kategoria nie została znaleziona
                        </h1>
                        <Button className="mt-4" asChild>
                            <a href="/">Wróć do strony głównej</a>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                    {/* Breadcrumb */}
                    <nav className="mb-4 text-sm text-gray-600">
                        <a href="/" className="hover:text-blue-600">
                            Strona główna
                        </a>
                        <span className="mx-2">/</span>
                        <span className="font-medium text-gray-900">{category.name}</span>
                    </nav>

                    {/* Category Header */}
                    <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">{category.name}</h1>
                        {category.description && (
                            <p className="text-gray-600">{category.description}</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                            Znaleziono {filteredProducts.length}{" "}
                            {filteredProducts.length === 1 ? "produkt" : "produktów"}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        {/* Filters Sidebar */}
                        <aside
                            className={`${showFilters ? "block" : "hidden"} w-full shrink-0 lg:block lg:w-64`}
                        >
                            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-900">Filtry</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetFilters}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Wyczyść
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    {/* Search */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Szukaj w kategorii
                                        </label>
                                        <Input
                                            placeholder="Nazwa produktu..."
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-gray-700">
                                            Cena
                                        </label>
                                        <Slider
                                            min={0}
                                            max={maxPrice}
                                            step={10}
                                            value={priceRange}
                                            onValueChange={value => setPriceRange(value as [number, number])}
                                            className="mb-3"
                                        />
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span>{priceRange[0]} zł</span>
                                            <span>{priceRange[1]} zł</span>
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-gray-700">
                                            Dostępność
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="in-stock"
                                                checked={inStock}
                                                onCheckedChange={checked => setInStock(checked as boolean)}
                                            />
                                            <label
                                                htmlFor="in-stock"
                                                className="cursor-pointer text-sm text-gray-700"
                                            >
                                                Tylko dostępne
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <Button
                                        variant="outline"
                                        className="lg:hidden"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                                        {showFilters ? "Ukryj filtry" : "Pokaż filtry"}
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Sortuj:</span>
                                        <select
                                            value={sortBy}
                                            onChange={e => setSortBy(e.target.value as SortOption)}
                                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="name-asc">Nazwa A-Z</option>
                                            <option value="name-desc">Nazwa Z-A</option>
                                            <option value="price-asc">Cena rosnąco</option>
                                            <option value="price-desc">Cena malejąco</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            {filteredProducts.length === 0 ? (
                                <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                                    <p className="text-lg text-gray-600">
                                        Nie znaleziono produktów spełniających kryteria
                                    </p>
                                    <Button className="mt-4" onClick={resetFilters}>
                                        Wyczyść filtry
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filteredProducts.map(product => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={parseFloat(product.price)}
                                            imageUrl={product.imageUrl || "/placeholder-product.jpg"}
                                            rating={4.5}
                                            reviewCount={Math.floor(Math.random() * 100)}
                                            inStock={product.stock > 0}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
