import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/layout"
import { Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { apiService } from "@/services/api.service"

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await apiService.getOrders()
      setOrders(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError("Nie udało się pobrać zamówień")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async () => {
    if (!selectedOrder || !newStatus) return
    try {
      await apiService.updateOrder(selectedOrder.id, { status: newStatus })
      setIsStatusModalOpen(false)
      setSelectedOrder(null)
      setNewStatus("")
      fetchOrders()
    } catch (error) {
      console.error("Błąd aktualizacji statusu:", error)
    }
  }

  const openStatusModal = (order: any) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setIsStatusModalOpen(true)
  }

  const filteredOrders = orders.filter(
    order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Oczekuje", color: "bg-yellow-100 text-yellow-700" }
      case "processing":
        return { label: "W realizacji", color: "bg-blue-100 text-blue-700" }
      case "completed":
        return { label: "Zrealizowane", color: "bg-green-100 text-green-700" }
      case "cancelled":
        return { label: "Anulowane", color: "bg-red-100 text-red-700" }
      default:
        return { label: status, color: "bg-gray-100 text-gray-700" }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Zamówienia</h1>
          <p className="mt-1 text-gray-500">Zarządzaj zamówieniami klientów</p>
        </div>

        {loading && (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Ładowanie zamówień...</p>
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
                  placeholder="Szukaj zamówień..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              {filteredOrders.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  Brak zamówień do wyświetlenia
                </div>
              ) : (
                <table className="w-full">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Suma
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
                    {filteredOrders.map(order => {
                      const statusInfo = getStatusInfo(order.status)
                      return (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-blue-600">#{order.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-6 py-4 font-medium whitespace-nowrap text-gray-900">
                            {order.totalAmount} zł
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${statusInfo.color}`}
                            >
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => openStatusModal(order)}
                            >
                              <Eye className="h-3 w-3" />
                              Zmień status
                            </Button>
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

      {/* Status Change Modal */}
      {isStatusModalOpen && selectedOrder && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Zmień status zamówienia</h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-600">
                  Zamówienie #{selectedOrder.id}
                </p>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="pending">Oczekuje</option>
                  <option value="processing">W realizacji</option>
                  <option value="completed">Zrealizowane</option>
                  <option value="cancelled">Anulowane</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsStatusModalOpen(false)
                    setSelectedOrder(null)
                    setNewStatus("")
                  }}
                >
                  Anuluj
                </Button>
                <Button onClick={handleStatusChange}>Zapisz</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
