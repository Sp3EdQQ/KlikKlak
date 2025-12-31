import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { apiService } from "@/services/api.service"
import { useAuth } from "@/hooks/useAuth"

interface WishlistItem {
    id: string
    productId: string
    addedAt: string
    product: {
        id: string
        name: string
        price: string
        imageUrl: string | null
        stock: number
        slug: string
    }
}

export default function Wishlist() {
    const { user } = useAuth()
    const [items, setItems] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            loadWishlist()
        } else {
            setLoading(false)
        }
    }, [user])

    const loadWishlist = async () => {
        try {
            const data = await apiService.getWishlistItems()
            setItems(data)
        } catch (error) {
            console.error("Błąd pobierania listy życzeń:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (productId: string) => {
        try {
            await apiService.removeFromWishlist(productId)
            setItems(items.filter(item => item.productId !== productId))
        } catch (error) {
            console.error("Błąd usuwania z listy życzeń:", error)
        }
    }

    const handleAddToCart = (item: WishlistItem) => {
        // TODO: Implementacja dodawania do koszyka
        console.log(`Dodano ${item.product.name} do koszyka`)
        alert(`Dodano ${item.product.name} do koszyka!`)
    }

    if (!user) {
        return (
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <Header />
                <main className="flex flex-1 items-center justify-center py-12">
                    <div className="text-center">
                        <Heart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Zaloguj się, aby zobaczyć listę życzeń
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Musisz być zalogowany, aby korzystać z listy życzeń
                        </p>
                        <Button asChild className="bg-blue-500 hover:bg-blue-600">
                            <Link to="/login">Zaloguj się</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <Header />
                <main className="flex flex-1 items-center justify-center py-12">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <p className="mt-4 text-gray-600">Ładowanie listy życzeń...</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Header />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
                            Lista Życzeń
                        </h1>
                        <p className="text-gray-600">
                            {items.length === 0
                                ? "Twoja lista życzeń jest pusta"
                                : `Masz ${items.length} ${items.length === 1 ? "produkt" : "produkty"} na liście życzeń`}
                        </p>
                    </div>

                    {/* Empty State */}
                    {items.length === 0 ? (
                        <Card className="border-2 border-gray-200 shadow-lg">
                            <CardContent className="p-12 text-center">
                                <Heart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Twoja lista życzeń jest pusta
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Dodaj produkty do listy życzeń, aby śledzić swoje ulubione produkty
                                </p>
                                <Button asChild className="bg-blue-500 hover:bg-blue-600">
                                    <Link to="/">Przeglądaj produkty</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        /* Wishlist Items */
                        <div className="grid gap-6">
                            {items.map(item => (
                                <Card
                                    key={item.id}
                                    className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            {/* Product Image */}
                                            <Link
                                                to={`/products/${item.product.slug}`}
                                                className="flex-shrink-0"
                                            >
                                                <img
                                                    src={
                                                        item.product.imageUrl ||
                                                        "https://placehold.co/200x200/e5e7eb/6b7280?text=Brak"
                                                    }
                                                    alt={item.product.name}
                                                    className="h-48 w-48 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
                                                    onError={e => {
                                                        const target = e.target as HTMLImageElement
                                                        target.src =
                                                            "https://placehold.co/200x200/e5e7eb/6b7280?text=Brak"
                                                    }}
                                                />
                                            </Link>

                                            {/* Product Info */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <Link
                                                        to={`/products/${item.product.slug}`}
                                                        className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    <div className="mt-2">
                                                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                                            {parseFloat(item.product.price).toFixed(2)} zł
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        {item.product.stock > 0 ? (
                                                            <span className="text-green-600 font-semibold">
                                                                ✓ Dostępny ({item.product.stock} szt.)
                                                            </span>
                                                        ) : (
                                                            <span className="text-red-600 font-semibold">
                                                                Niedostępny
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-500">
                                                        Dodano:{" "}
                                                        {new Date(item.addedAt).toLocaleDateString("pl-PL")}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-3 mt-4">
                                                    <Button
                                                        onClick={() => handleAddToCart(item)}
                                                        disabled={item.product.stock === 0}
                                                        className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                                                    >
                                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                                        Dodaj do koszyka
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleRemove(item.productId)}
                                                        variant="outline"
                                                        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-500"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Usuń
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
