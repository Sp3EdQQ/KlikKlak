import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { useState } from "react"
import { useParams, Link } from "react-router"
import { ShoppingCart, Heart, Truck, Shield, RotateCcw, Check, Minus, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProductIdFromSlug } from "@/lib/product-utils"

// Mock data - w przyszłości zamień na fetch z API
// Używa tylko pól z tabeli products: id, name, description, price, stock, categoryId, imageUrl
const mockProduct = {
    id: "1",
    name: "AMD Ryzen 9 7950X",
    description:
        "Procesor AMD Ryzen 9 7950X to potężna jednostka obliczeniowa zaprojektowana dla najbardziej wymagających użytkowników. Wyposażony w 16 rdzeni i 32 wątki, oferuje niesamowitą wydajność w grach, renderowaniu i zadaniach wielowątkowych. Idealny do gier, renderowania wideo, streamingu i wymagających aplikacji profesjonalnych.",
    price: 2899.99,
    stock: 15,
    categoryId: "cat-123",
    imageUrl: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=600&fit=crop",
    createdAt: "2025-11-07T10:00:00Z",
    updatedAt: "2025-11-07T10:00:00Z"
}

export default function ProductDetail() {
    const params = useParams()
    const [quantity, setQuantity] = useState(1)
    const [isInWishlist, setIsInWishlist] = useState(false)

    // Wyciągnij ID z URL (format: "1-amd-ryzen-9-7950x" -> "1")
    const productId = params.slug ? getProductIdFromSlug(params.slug) : "1"

    // W przyszłości: fetch produktu z API na podstawie productId
    // const { data: product } = useFetch(`/api/products/${productId}`)
    const product = mockProduct

    const handleAddToCart = () => {
        // TODO: Implementacja dodawania do koszyka
        console.log(`Dodano ${quantity}x ${product.name} do koszyka`)
        alert(`Dodano ${quantity}x ${product.name} do koszyka!`)
    }

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity)
        }
    }

    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist)
    }

    const isInStock = product.stock > 0

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs */}
                    <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-purple-600">
                            Strona główna
                        </Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-purple-600">
                            Produkty
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{product.name}</span>
                    </nav>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Zdjęcie produktu */}
                        <div className="space-y-4">
                            <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-[500px] w-full object-cover"
                                />
                                {!isInStock && (
                                    <div className="absolute right-4 top-4 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                                        Brak w magazynie
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Informacje o produkcie */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="mb-4 text-3xl font-bold text-gray-900">{product.name}</h1>

                                {/* Opis */}
                                <p className="text-lg text-gray-700">{product.description}</p>
                            </div>

                            {/* Cena */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-bold text-purple-600">
                                                {product.price.toFixed(2)} zł
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status dostępności */}
                                    <div className="mb-4">
                                        {isInStock ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <Check className="h-5 w-5" />
                                                <span className="font-semibold">
                                                    Dostępne ({product.stock} {product.stock === 1 ? "sztuka" : "sztuk"} w
                                                    magazynie)
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-red-600">
                                                <span className="font-semibold">Produkt niedostępny</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Ilość */}
                                    <div className="mb-6">
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Ilość:
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center rounded-lg border border-gray-300">
                                                <button
                                                    onClick={() => handleQuantityChange(-1)}
                                                    disabled={quantity <= 1}
                                                    className="p-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="min-w-[3rem] text-center text-lg font-semibold">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(1)}
                                                    disabled={quantity >= product.stock}
                                                    className="p-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                Razem: {(product.price * quantity).toFixed(2)} zł
                                            </span>
                                        </div>
                                    </div>

                                    {/* Przyciski akcji */}
                                    <div className="space-y-3">
                                        <Button
                                            onClick={handleAddToCart}
                                            disabled={!isInStock}
                                            className="w-full bg-purple-600 py-6 text-lg hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ShoppingCart className="mr-2 h-5 w-5" />
                                            {isInStock ? "Dodaj do koszyka" : "Produkt niedostępny"}
                                        </Button>
                                        <Button
                                            onClick={toggleWishlist}
                                            variant="outline"
                                            className={`w-full py-6 ${isInWishlist
                                                    ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                                                    : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <Heart className={`mr-2 h-5 w-5 ${isInWishlist ? "fill-red-500" : ""}`} />
                                            {isInWishlist ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Zalety */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                                    <Truck className="h-8 w-8 text-purple-600" />
                                    <div>
                                        <p className="text-sm font-semibold">Darmowa dostawa</p>
                                        <p className="text-xs text-gray-500">Od 200 zł</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                                    <Shield className="h-8 w-8 text-purple-600" />
                                    <div>
                                        <p className="text-sm font-semibold">24 miesiące gwarancji</p>
                                        <p className="text-xs text-gray-500">Pewność zakupu</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                                    <RotateCcw className="h-8 w-8 text-purple-600" />
                                    <div>
                                        <p className="text-sm font-semibold">30 dni na zwrot</p>
                                        <p className="text-xs text-gray-500">Bez pytań</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Szczegóły produktu */}
                    <div className="mt-12">
                        <Card>
                            <CardContent className="p-6">
                                <div>
                                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Szczegółowy opis</h2>
                                    <div className="prose max-w-none text-gray-700">
                                        <p className="whitespace-pre-line">{product.description}</p>
                                    </div>

                                    {/* Informacje o produkcie */}
                                    <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6 text-sm md:grid-cols-4">
                                        <div>
                                            <p className="text-gray-500">ID Produktu</p>
                                            <p className="font-semibold text-gray-900">{product.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Stan magazynowy</p>
                                            <p className="font-semibold text-gray-900">{product.stock} szt.</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Dodano</p>
                                            <p className="font-semibold text-gray-900">
                                                {new Date(product.createdAt).toLocaleDateString("pl-PL")}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Aktualizacja</p>
                                            <p className="font-semibold text-gray-900">
                                                {new Date(product.updatedAt).toLocaleDateString("pl-PL")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
