import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiService } from "@/services/api.service"

// ============= QUERIES =============

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => apiService.getProducts()
    })
}

export const useProduct = (id: string | undefined) => {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => apiService.getProduct(id!),
        enabled: !!id
    })
}

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => apiService.getCategories()
    })
}

export const useCategory = (id: string | undefined) => {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: () => apiService.getCategory(id!),
        enabled: !!id
    })
}

export const useStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => apiService.getStats()
    })
}

// ============= MUTATIONS =============

// Products
export const useCreateProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: any) => apiService.createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            apiService.updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => apiService.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}

// Categories
export const useCreateCategory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: any) => apiService.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            apiService.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => apiService.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
}

// Register
export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: {
            email: string
            password: string
            firstName: string
            lastName: string
        }) => {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    role: "user"
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Nie udało się utworzyć konta")
            }

            return response.json()
        }
    })
}
