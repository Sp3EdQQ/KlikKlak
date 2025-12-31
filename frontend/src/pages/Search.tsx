import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router"
import { Header, Footer } from "@/components/layout"
import { ProductCard } from "@/components/ProductCard"
import { Chatbot } from "@/components/Chatbot"
import { apiService } from "@/services/api.service"
import { Search as SearchIcon, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Product = {
    id: string
    name: string
    price: string
    stock: number
    imageUrl: string | null
    categoryId: string | null
}

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")

    const query = searchParams.get("q") || ""

    useEffect(() => {
        const fetchProducts = async () => {
            if (!query) {
                setProducts([])
                return
            }

            setLoading(true)
            try {
                const allProducts = await apiService.getProducts()
                const filtered = allProducts.data.filter((product: Product) =>
                    product.name.toLowerCase().includes(query.toLowerCase())
                )
                setProducts(filtered)
            } catch (error) {
                console.error("Błąd wyszukiwania:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [query])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            setSearchParams({ q: searchTerm.trim() })
        }
    }

    const clearSearch = () => {
        setSearchTerm("")
        setSearchParams({})
        setProducts([])
    }

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Header />

            <main className="flex-1 py-8">
                <div className="container mx-auto px-4">
                    {/* Search Header */}
                    <div className="mb-8">
                        <div className="mb-4">
                            <Link to="/" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                                ← Wróć do strony głównej
                            </Link>
                        </div>

                        <h1 className="mb-6 text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                            Wyszukiwanie produktów
                        </h1>

                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="relative max-w-2xl">
                                <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Wpisz nazwę produktu..."
                                    className="h-14 w-full border-2 border-gray-300 pr-32 pl-12 text-base focus:border-blue-500 focus-visible:ring-blue-500"
                                />
                                <div className="absolute top-1/2 right-2 -translate-y-1/2 flex gap-2">
                                    {searchTerm && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={clearSearch}
                                            className="h-10 w-10"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 h-10 px-6"
                                    >
                                        Szukaj
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {/* Results Info */}
                        {query && (
                            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md border-2 border-gray-200">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Wyniki wyszukiwania dla:
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">"{query}"</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-blue-600">{products.length}</p>
                                    <p className="text-sm text-gray-600">
                                        {products.length === 1 ? "produkt" : products.length < 5 ? "produkty" : "produktów"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                            <p className="mt-4 text-gray-600">Wyszukiwanie produktów...</p>
                        </div>
                    )}

                    {/* No Query State */}
                    {!query && !loading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                                <SearchIcon className="h-12 w-12 text-blue-500" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                Wpisz czego szukasz
                            </h2>
                            <p className="text-gray-600">
                                Użyj pola wyszukiwania powyżej, aby znaleźć produkty
                            </p>
                        </div>
                    )}

                    {/* No Results State */}
                    {query && !loading && products.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                <SearchIcon className="h-12 w-12 text-gray-400" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                Nie znaleziono produktów
                            </h2>
                            <p className="mb-6 text-gray-600">
                                Spróbuj użyć innych słów kluczowych lub sprawdź pisownię
                            </p>
                            <Button
                                onClick={clearSearch}
                                variant="outline"
                                className="border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                                Wyczyść wyszukiwanie
                            </Button>
                        </div>
                    )}

                    {/* Results Grid */}
                    {!loading && products.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
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
            </main>

            <Footer />
            <Chatbot />
        </div>
    )
}
