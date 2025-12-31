const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    // Get admin token if available
    const token = localStorage.getItem("adminToken")

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
        ...options?.headers
      }
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Auth
  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    return this.request<any>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  async login(data: { email: string; password: string }) {
    return this.request<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  async logout(refreshToken: string) {
    return this.request<any>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    })
  }

  async refreshToken(refreshToken: string) {
    return this.request<any>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    })
  }

  async getProfile() {
    return this.request<any>("/auth/me")
  }

  // Users
  async getUsers() {
    return this.request<any[]>("/users")
  }

  async getUser(id: string) {
    return this.request<any>(`/users/${id}`)
  }

  async createUser(data: any) {
    return this.request<any>("/users", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  async updateUser(id: string, data: any) {
    return this.request<any>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  }

  async deleteUser(id: string) {
    return this.request<any>(`/users/${id}`, {
      method: "DELETE"
    })
  }

  // Products (Unified table)
  async getProducts(params?: { categoryId?: string; type?: string; page?: number; limit?: number }) {
    const queryParams = new URLSearchParams()
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId)
    if (params?.type) queryParams.append('type', params.type)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const query = queryParams.toString()
    return this.request<any>(`/products${query ? `?${query}` : ''}`)
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`)
  }

  async createProduct(data: any) {
    return this.request<any>("/products", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  async updateProduct(id: string, data: any) {
    return this.request<any>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  }

  async deleteProduct(id: string) {
    return this.request<any>(`/products/${id}`, {
      method: "DELETE"
    })
  }

  // CPUs
  async getCpus() {
    return this.request<any[]>("/cpus")
  }

  async getCpu(id: string) {
    return this.request<any>(`/cpus/${id}`)
  }

  // GPUs
  async getGpus() {
    return this.request<any[]>("/gpus")
  }

  async getGpu(id: string) {
    return this.request<any>(`/gpus/${id}`)
  }

  // RAMs
  async getRams() {
    return this.request<any[]>("/rams")
  }

  async getRam(id: string) {
    return this.request<any>(`/rams/${id}`)
  }

  // SSDs
  async getSsds() {
    return this.request<any[]>("/ssds")
  }

  async getSsd(id: string) {
    return this.request<any>(`/ssds/${id}`)
  }

  // HDDs
  async getHdds() {
    return this.request<any[]>("/hdds")
  }

  async getHdd(id: string) {
    return this.request<any>(`/hdds/${id}`)
  }

  // Motherboards
  async getMotherboards() {
    return this.request<any[]>("/motherboards")
  }

  async getMotherboard(id: string) {
    return this.request<any>(`/motherboards/${id}`)
  }

  // PSUs
  async getPsus() {
    return this.request<any[]>("/psus")
  }

  async getPsu(id: string) {
    return this.request<any>(`/psus/${id}`)
  }

  // CPU Coolers
  async getCpuCoolers() {
    return this.request<any[]>("/cpu-coolers")
  }

  async getCpuCooler(id: string) {
    return this.request<any>(`/cpu-coolers/${id}`)
  }

  // Monitors
  async getMonitors() {
    return this.request<any[]>("/monitors")
  }

  async getMonitor(id: string) {
    return this.request<any>(`/monitors/${id}`)
  }

  // Cases
  async getCases() {
    return this.request<any[]>("/cases")
  }

  async getCase(id: string) {
    return this.request<any>(`/cases/${id}`)
  }

  // Universal method to get all components
  async getAllComponents() {
    const [cpus, gpus, rams, ssds, hdds, motherboards, psus, cpuCoolers, monitors, cases] = await Promise.all([
      this.getCpus(),
      this.getGpus(),
      this.getRams(),
      this.getSsds(),
      this.getHdds(),
      this.getMotherboards(),
      this.getPsus(),
      this.getCpuCoolers(),
      this.getMonitors(),
      this.getCases(),
    ])
    return [...cpus, ...gpus, ...rams, ...ssds, ...hdds, ...motherboards, ...psus, ...cpuCoolers, ...monitors, ...cases]
  }

  // Orders
  async getOrders() {
    return this.request<any[]>("/orders")
  }

  async getOrder(id: string) {
    return this.request<any>(`/orders/${id}`)
  }

  async updateOrder(id: string, data: any) {
    return this.request<any>(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  }

  // Categories
  async getCategories() {
    return this.request<any[]>("/categories")
  }

  async getCategory(id: string) {
    return this.request<any>(`/categories/${id}`)
  }

  async createCategory(data: any) {
    return this.request<any>("/categories", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  async updateCategory(id: string, data: any) {
    return this.request<any>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  }

  async deleteCategory(id: string) {
    return this.request<any>(`/categories/${id}`, {
      method: "DELETE"
    })
  }

  // Tags
  async getTags() {
    return this.request<any[]>("/tags")
  }

  async getTag(id: string) {
    return this.request<any>(`/tags/${id}`)
  }

  async createTag(data: any) {
    return this.request<any>("/tags", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  async updateTag(id: string, data: any) {
    return this.request<any>(`/tags/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  }

  async deleteTag(id: string) {
    return this.request<any>(`/tags/${id}`, {
      method: "DELETE"
    })
  }

  // Reviews
  async getReviews() {
    return this.request<any[]>("/reviews")
  }

  // Wishlists
  async getWishlists() {
    return this.request<any[]>("/wishlist")
  }

  // Statistics
  async getStats() {
    const [users, products, orders, categories, tags, wishlists] = await Promise.all([
      this.getUsers(),
      this.getProducts(),
      this.getOrders(),
      this.getCategories(),
      this.getTags(),
      this.getWishlists()
    ])

    const totalSales = orders.reduce(
      (sum, order) => sum + (parseFloat(order.total) || 0),
      0
    )

    return {
      users: users.length,
      products: products.length,
      orders: orders.length,
      categories: categories.length,
      tags: tags.length,
      wishlists: wishlists.length,
      totalSales
    }
  }
}

export const apiService = new ApiService()
