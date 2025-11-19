import { useState } from "react"
import { AdminLayout } from "../../components/layout/AdminLayout"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
    useCategories,
    useCreateCategory,
    useUpdateCategory,
    useDeleteCategory
} from "@/hooks/useQueries"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

interface Category {
    id: string
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
}

export default function Categories() {
    const { data: categories = [], isLoading: loading } = useCategories()
    const createCategory = useCreateCategory()
    const updateCategory = useUpdateCategory()
    const deleteCategory = useDeleteCategory()

    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createCategory.mutateAsync(formData)
            setIsCreateModalOpen(false)
            setFormData({ name: "", description: "" })
        } catch (error) {
            console.error("Błąd tworzenia kategorii:", error)
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedCategory) return
        try {
            await updateCategory.mutateAsync({
                id: selectedCategory.id,
                data: formData
            })
            setIsEditModalOpen(false)
            setSelectedCategory(null)
            setFormData({ name: "", description: "" })
        } catch (error) {
            console.error("Błąd aktualizacji kategorii:", error)
        }
    }

    const handleDelete = async () => {
        if (!selectedCategory) return
        try {
            await deleteCategory.mutateAsync(selectedCategory.id)
            setIsDeleteModalOpen(false)
            setSelectedCategory(null)
        } catch (error) {
            console.error("Błąd usuwania kategorii:", error)
        }
    }

    const openEditModal = (category: Category) => {
        setSelectedCategory(category)
        setFormData({
            name: category.name,
            description: category.description || ""
        })
        setIsEditModalOpen(true)
    }

    const openDeleteModal = (category: Category) => {
        setSelectedCategory(category)
        setIsDeleteModalOpen(true)
    }

    const filteredCategories = categories.filter(
        category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (category.description &&
                category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kategorie</h1>
                        <p className="mt-1 text-gray-500">Zarządzaj kategoriami produktów</p>
                    </div>
                    <Button
                        className="gap-2 bg-blue-500 hover:bg-blue-600"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className="h-4 w-4" />
                        Dodaj kategorię
                    </Button>
                </div>

                {loading && (
                    <div className="py-12 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Ładowanie kategorii...</p>
                    </div>
                )}

                {!loading && (
                    <>
                        {/* Search Bar */}
                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Szukaj kategorii..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            {filteredCategories.length === 0 ? (
                                <div className="py-12 text-center text-gray-500">
                                    Brak kategorii do wyświetlenia
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="border-b border-gray-200 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Nazwa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Opis
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Data utworzenia
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Akcje
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredCategories.map(category => (
                                            <tr key={category.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{category.name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-xs truncate text-sm text-gray-500">
                                                        {category.description || "-"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {new Date(category.createdAt).toLocaleDateString("pl-PL")}
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-1"
                                                            onClick={() => openEditModal(category)}
                                                        >
                                                            <Pencil className="h-3 w-3" />
                                                            Edytuj
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                            onClick={() => openDeleteModal(category)}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            Usuń
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">Dodaj kategorię</h2>
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
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreateModalOpen(false)
                                        setFormData({ name: "", description: "" })
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
            {isEditModalOpen && selectedCategory && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">Edytuj kategorię</h2>
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
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditModalOpen(false)
                                        setSelectedCategory(null)
                                        setFormData({ name: "", description: "" })
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
            {isDeleteModalOpen && selectedCategory && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">Usuń kategorię</h2>
                        <p className="mb-6 text-gray-600">
                            Czy na pewno chcesz usunąć kategorię "{selectedCategory.name}"?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsDeleteModalOpen(false)
                                    setSelectedCategory(null)
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
