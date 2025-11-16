import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { apiService } from '../../services/api.service';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

interface Tag {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export default function Tags() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            setLoading(true);
            const data = await apiService.getTags();
            setTags(data);
        } catch (error) {
            console.error('Błąd pobierania tagów:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiService.createTag(formData);
            setIsCreateModalOpen(false);
            setFormData({ name: '' });
            fetchTags();
        } catch (error) {
            console.error('Błąd tworzenia tagu:', error);
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTag) return;
        try {
            await apiService.updateTag(selectedTag.id, formData);
            setIsEditModalOpen(false);
            setSelectedTag(null);
            setFormData({ name: '' });
            fetchTags();
        } catch (error) {
            console.error('Błąd aktualizacji tagu:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedTag) return;
        try {
            await apiService.deleteTag(selectedTag.id);
            setIsDeleteModalOpen(false);
            setSelectedTag(null);
            fetchTags();
        } catch (error) {
            console.error('Błąd usuwania tagu:', error);
        }
    };

    const openEditModal = (tag: Tag) => {
        setSelectedTag(tag);
        setFormData({
            name: tag.name,
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (tag: Tag) => {
        setSelectedTag(tag);
        setIsDeleteModalOpen(true);
    };

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tagi</h1>
                        <p className="text-gray-500 mt-1">Zarządzaj tagami produktów</p>
                    </div>
                    <Button className="gap-2 bg-blue-500 hover:bg-blue-600" onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="h-4 w-4" />
                        Dodaj tag
                    </Button>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Ładowanie tagów...</p>
                    </div>
                )}

                {!loading && (
                    <>
                        {/* Search Bar */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Szukaj tagów..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {filteredTags.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    Brak tagów do wyświetlenia
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nazwa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Data utworzenia
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Akcje
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredTags.map((tag) => (
                                            <tr key={tag.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{tag.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {new Date(tag.createdAt).toLocaleDateString('pl-PL')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" className="gap-1" onClick={() => openEditModal(tag)}>
                                                            <Pencil className="h-3 w-3" />
                                                            Edytuj
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => openDeleteModal(tag)}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Dodaj tag</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nazwa *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreateModalOpen(false);
                                        setFormData({ name: '' });
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
            {isEditModalOpen && selectedTag && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edytuj tag</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nazwa *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setSelectedTag(null);
                                        setFormData({ name: '' });
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
            {isDeleteModalOpen && selectedTag && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Usuń tag</h2>
                        <p className="text-gray-600 mb-6">
                            Czy na pewno chcesz usunąć tag "{selectedTag.name}"?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setSelectedTag(null);
                                }}
                            >
                                Anuluj
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                Usuń
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
