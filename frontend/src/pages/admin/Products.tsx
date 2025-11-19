import { useState } from "react"
import { AdminLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    useProducts,
    useCategories,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct
} from "@/hooks/useQueries"

interface Product {
    id: string
    name: string
    description: string | null
    price: string
    stock: number
    imageUrl: string | null
    categoryId: string | null
}

export default function AdminProducts() {
    const { data: products = [], isLoading: loading, error } = useProducts()
    const { data: categories = [] } = useCategories()
    const createProduct = useCreateProduct()
    const updateProduct = useUpdateProduct()
    const deleteProduct = useDeleteProduct()

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: ""
    })

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createProduct.mutateAsync({
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            })
            setIsCreateModalOpen(false)
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                imageUrl: "",
                categoryId: ""
            })
        } catch (error) {
            console.error("Błąd tworzenia produktu:", error)
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedProduct) return
        try {
            await updateProduct.mutateAsync({
                id: selectedProduct.id,
                data: {
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock)
                }
            })
            setIsEditModalOpen(false)
            setSelectedProduct(null)
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                imageUrl: "",
                categoryId: ""
            })
        } catch (error) {
            console.error("Błąd aktualizacji produktu:", error)
        }
    }

    const handleDelete = async () => {
        if (!selectedProduct) return
        try {
            await deleteProduct.mutateAsync(selectedProduct.id)
            setIsDeleteModalOpen(false)
            setSelectedProduct(null)
        } catch (error) {
            console.error("Błąd usuwania produktu:", error)
        }
    }

    const openEditModal = (product: Product) => {
        setSelectedProduct(product)
        setFormData({
            name: product.name,
            description: product.description || "",
            price: product.price,
            stock: product.stock.toString(),
            imageUrl: product.imageUrl || "",
            categoryId: product.categoryId || ""
        })
        setIsEditModalOpen(true)
    }

    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product)
        setIsDeleteModalOpen(true)
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory =
            selectedCategory === "all" || product.categoryId === selectedCategory
        return matchesSearch && matchesCategory
    })

    const getStockStatus = (stock: number) => {
        if (stock === 0)
            return {
                label: "Brak",
                color: "bg-red-100 text-red-700",
                textColor: "text-red-600"
            }
        if (stock < 10)
            return {
                label: "Niski stan",
                color: "bg-yellow-100 text-yellow-700",
                textColor: "text-yellow-600"
            }
        return {
            label: "Aktywny",
            color: "bg-green-100 text-green-700",
            textColor: "text-green-600"
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Produkty</h1>
                        <p className="mt-1 text-gray-500">Zarządzaj produktami w sklepie</p>
                    </div>
                    <Button
                        className="gap-2 bg-blue-500 hover:bg-blue-600"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className="h-4 w-4" />
                        Dodaj produkt
                    </Button>
                </div>

                {loading && (
                    <div className="py-12 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Ładowanie produktów...</p>
                    </div>
                )}

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                        {error.message}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Search and Filters */}
                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Szukaj produktów..."
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={selectedCategory}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                >
                                    <option value="all">Wszystkie kategorie</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            {filteredProducts.length === 0 ? (
                                <div className="py-12 text-center text-gray-500">
                                    Brak produktów do wyświetlenia
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="border-b border-gray-200 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Produkt
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Opis
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Cena
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Stan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Akcje
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredProducts.map(product => {
                                            const stockStatus = getStockStatus(product.stock || 0)
                                            return (
                                                <tr key={product.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="max-w-xs truncate text-sm text-gray-500">
                                                            {product.description || "Brak opisu"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium whitespace-nowrap text-gray-900">
                                                        {product.price} zł
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`font-medium ${stockStatus.textColor}`}>
                                                            {product.stock || 0} szt.
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`rounded-full px-2 py-1 text-xs font-medium ${stockStatus.color}`}
                                                        >
                                                            {stockStatus.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="gap-1"
                                                                onClick={() => openEditModal(product)}
                                                            >
                                                                <Edit className="h-3 w-3" />
                                                                Edytuj
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                                onClick={() => openDeleteModal(product)}
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                                Usuń
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">Dodaj produkt</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nazwa *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Opis
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={e =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    rows={3}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Cena *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Stan magazynowy *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    URL obrazka
                                </label>
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Kategoria
                                </label>
                                <select
                                    value={formData.categoryId}
                                    onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Wybierz kategorię</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreateModalOpen(false)
                                        setFormData({
                                            name: "",
                                            description: "",
                                            price: "",
                                            stock: "",
                                            imageUrl: "",
                                            categoryId: ""
                                        })
                                    }}
                                >
                                    Anuluj
                                </Button>
                                <Button type="submit">Dodaj</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && selectedProduct && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">Edytuj produkt</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nazwa *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Opis
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={e =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    rows={3}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Cena *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Stan magazynowy *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    URL obrazka
                                </label>
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Kategoria
                                </label>
                                <select
                                    value={formData.categoryId}
                                    onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Wybierz kategorię</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditModalOpen(false)
                                        setSelectedProduct(null)
                                        setFormData({
                                            name: "",
                                            description: "",
                                            price: "",
                                            stock: "",
                                            imageUrl: "",
                                            categoryId: ""
                                        })
                                    }}
                                >
                                    Anuluj
                                </Button>
                                <Button type="submit">Zapisz</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && selectedProduct && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">Usuń produkt</h2>
                        <p className="mb-6 text-gray-600">
                            Czy na pewno chcesz usunąć produkt "{selectedProduct.name}"?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsDeleteModalOpen(false)
                                    setSelectedProduct(null)
                                }}
                            >
                                Anuluj
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                Usuń
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
