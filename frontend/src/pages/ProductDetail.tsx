import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { useState } from "react"
import { useParams, Link } from "react-router"
import {
    ShoppingCart,
    Heart,
    Truck,
    Shield,
    RotateCcw,
    Check,
    Minus,
    Plus
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProduct } from "@/hooks/useQueries"

export default function ProductDetail() {
    const params = useParams()
    const [quantity, setQuantity] = useState(1)
    const [isInWishlist, setIsInWishlist] = useState(false)

    const productId = params.slug
    const { data: product, isLoading: loading, error } = useProduct(productId)

    const handleAddToCart = () => {
        // TODO: Implementacja dodawania do koszyka
        const name = product?.name ?? "produkt"
        console.log(`Dodano ${quantity}x ${name} do koszyka`)
        alert(`Dodano ${quantity}x ${name} do koszyka!`)
    }

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta
        if (newQuantity >= 1 && newQuantity <= (product?.stock ?? 0)) {
            setQuantity(newQuantity)
        }
    }

    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist)
    }

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center bg-gray-50 py-8">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <p className="mt-4 text-gray-600">Ładowanie produktu...</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center bg-gray-50 py-8">
                    <div className="text-center">
                        <h1 className="mb-4 text-2xl font-bold text-gray-900">
                            {error?.message || "Produkt nie został znaleziony"}
                        </h1>
                        <Button asChild>
                            <Link to="/">Wróć do strony głównej</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    const isInStock = product.stock > 0
    const productPrice = parseFloat(product.price)

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
                                    src={
                                        product.imageUrl ||
                                        "https://placehold.co/800x600/e5e7eb/6b7280?text=Brak+zdjęcia"
                                    }
                                    alt={product.name}
                                    className="h-[500px] w-full object-cover"
                                    onError={e => {
                                        const target = e.target as HTMLImageElement
                                        target.src =
                                            "https://placehold.co/800x600/e5e7eb/6b7280?text=Brak+zdjęcia"
                                    }}
                                />
                                {!isInStock && (
                                    <div className="absolute top-4 right-4 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
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
                                <p className="text-lg text-gray-700">
                                    {product.description || "Brak opisu produktu"}
                                </p>
                            </div>

                            {/* Cena */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-bold text-purple-600">
                                                {productPrice.toFixed(2)} zł
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status dostępności */}
                                    <div className="mb-4">
                                        {isInStock ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <Check className="h-5 w-5" />
                                                <span className="font-semibold">
                                                    Dostępne ({product.stock}{" "}
                                                    {product.stock === 1 ? "sztuka" : "sztuk"} w magazynie)
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
                                                Razem: {(productPrice * quantity).toFixed(2)} zł
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
                                            <Heart
                                                className={`mr-2 h-5 w-5 ${isInWishlist ? "fill-red-500" : ""}`}
                                            />
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
                                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                        Szczegółowy opis
                                    </h2>
                                    <div className="prose max-w-none text-gray-700">
                                        <p className="whitespace-pre-line">
                                            {product.description || "Brak szczegółowego opisu produktu"}
                                        </p>
                                    </div>

                                    {/* Informacje o produkcie */}
                                    <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6 text-sm md:grid-cols-2">
                                        <div>
                                            <p className="text-gray-500">ID Produktu</p>
                                            <p className="font-semibold text-gray-900">{product.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Stan magazynowy</p>
                                            <p className="font-semibold text-gray-900">{product.stock} szt.</p>
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
