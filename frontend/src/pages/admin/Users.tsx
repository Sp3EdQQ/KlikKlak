import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Shield, Plus, Pencil, Trash2, X, Search } from "lucide-react"
import { apiService } from "@/services/api.service"

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: "user" | "admin"
  createdAt: string
  updatedAt: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "user" as "user" | "admin"
  })

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await apiService.getUsers()
      setUsers(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Nie udało się pobrać użytkowników")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiService.createUser(formData)
      setIsCreateModalOpen(false)
      setFormData({ email: "", password: "", firstName: "", lastName: "", role: "user" })
      fetchUsers()
    } catch (err) {
      console.error("Error creating user:", err)
      alert("Nie udało się utworzyć użytkownika")
    }
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    try {
      const updateData: any = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role
      }
      if (formData.password) {
        updateData.password = formData.password
      }
      await apiService.updateUser(selectedUser.id, updateData)
      setIsEditModalOpen(false)
      setSelectedUser(null)
      setFormData({ email: "", password: "", firstName: "", lastName: "", role: "user" })
      fetchUsers()
    } catch (err) {
      console.error("Error updating user:", err)
      alert("Nie udało się zaktualizować użytkownika")
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    try {
      await apiService.deleteUser(selectedUser.id)
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
      fetchUsers()
    } catch (err) {
      console.error("Error deleting user:", err)
      alert("Nie udało się usunąć użytkownika")
    }
  }

  const filteredUsers = users.filter(
    user =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName &&
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setFormData({
      email: user.email,
      password: "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      role: user.role
    })
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL")
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }
    if (firstName) return firstName.charAt(0).toUpperCase()
    return "U"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Użytkownicy</h1>
            <p className="mt-1 text-gray-500">Zarządzaj użytkownikami systemu</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Dodaj użytkownika
          </Button>
        </div>

        {loading && (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Ładowanie użytkowników...</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Search Bar */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Szukaj użytkowników..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              {filteredUsers.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  Brak użytkowników do wyświetlenia
                </div>
              ) : (
                <table className="w-full">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Użytkownik
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Rola
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Data dołączenia
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Akcje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-10 w-10 rounded-full ${user.role === "admin" ? "bg-purple-500" : "bg-blue-500"} flex items-center justify-center font-medium text-white`}
                            >
                              {getInitials(user.firstName, user.lastName)}
                            </div>
                            <div className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Mail className="h-4 w-4" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role === "admin" && <Shield className="h-3 w-3" />}
                            {user.role === "admin" ? "Admin" : "Użytkownik"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="space-x-2 px-6 py-4 text-right whitespace-nowrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(user)}
                            className="inline-flex items-center gap-1"
                          >
                            <Pencil className="h-3 w-3" />
                            Edytuj
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteModal(user)}
                            className="inline-flex items-center gap-1 text-red-600 hover:border-red-300 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                            Usuń
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Create User Modal */}
        {isCreateModalOpen && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Dodaj użytkownika</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Hasło
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Imię
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nazwisko
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Rola
                  </label>
                  <select
                    value={formData.role}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "user" | "admin"
                      })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="user">Użytkownik</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Dodaj użytkownika
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1"
                  >
                    Anuluj
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditModalOpen && selectedUser && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Edytuj użytkownika</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Hasło (pozostaw puste, aby nie zmieniać)
                  </label>
                  <input
                    type="password"
                    minLength={6}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Imię
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nazwisko
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Rola
                  </label>
                  <select
                    value={formData.role}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "user" | "admin"
                      })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="user">Użytkownik</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Zapisz zmiany
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1"
                  >
                    Anuluj
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete User Modal */}
        {isDeleteModalOpen && selectedUser && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-red-600">Usuń użytkownika</h2>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mb-6 text-gray-600">
                Czy na pewno chcesz usunąć użytkownika{" "}
                <strong>
                  {selectedUser.firstName} {selectedUser.lastName}
                </strong>{" "}
                ({selectedUser.email})? Ta operacja jest nieodwracalna.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleDeleteUser}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Usuń użytkownika
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1"
                >
                  Anuluj
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
