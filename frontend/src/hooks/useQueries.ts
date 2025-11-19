import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiService } from "@/services/api.service"

// ============= QUERIES =============

// Products (Unified table with filters)
export const useProducts = (params?: { categoryId?: string; type?: string }) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => apiService.getProducts(params)
    })
}

export const useProduct = (id: string | undefined) => {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => apiService.getProduct(id!),
        enabled: !!id
    })
}

// All Components Combined
export const useAllComponents = () => {
    return useQuery({
        queryKey: ["components", "all"],
        queryFn: () => apiService.getAllComponents()
    })
}

// CPUs
export const useCpus = () => {
    return useQuery({
        queryKey: ["cpus"],
        queryFn: () => apiService.getCpus()
    })
}

export const useCpu = (id: string | undefined) => {
    return useQuery({
        queryKey: ["cpus", id],
        queryFn: () => apiService.getCpu(id!),
        enabled: !!id
    })
}

// GPUs
export const useGpus = () => {
    return useQuery({
        queryKey: ["gpus"],
        queryFn: () => apiService.getGpus()
    })
}

export const useGpu = (id: string | undefined) => {
    return useQuery({
        queryKey: ["gpus", id],
        queryFn: () => apiService.getGpu(id!),
        enabled: !!id
    })
}

// RAMs
export const useRams = () => {
    return useQuery({
        queryKey: ["rams"],
        queryFn: () => apiService.getRams()
    })
}

export const useRam = (id: string | undefined) => {
    return useQuery({
        queryKey: ["rams", id],
        queryFn: () => apiService.getRam(id!),
        enabled: !!id
    })
}

// SSDs
export const useSsds = () => {
    return useQuery({
        queryKey: ["ssds"],
        queryFn: () => apiService.getSsds()
    })
}

export const useSsd = (id: string | undefined) => {
    return useQuery({
        queryKey: ["ssds", id],
        queryFn: () => apiService.getSsd(id!),
        enabled: !!id
    })
}

// HDDs
export const useHdds = () => {
    return useQuery({
        queryKey: ["hdds"],
        queryFn: () => apiService.getHdds()
    })
}

export const useHdd = (id: string | undefined) => {
    return useQuery({
        queryKey: ["hdds", id],
        queryFn: () => apiService.getHdd(id!),
        enabled: !!id
    })
}

// Motherboards
export const useMotherboards = () => {
    return useQuery({
        queryKey: ["motherboards"],
        queryFn: () => apiService.getMotherboards()
    })
}

export const useMotherboard = (id: string | undefined) => {
    return useQuery({
        queryKey: ["motherboards", id],
        queryFn: () => apiService.getMotherboard(id!),
        enabled: !!id
    })
}

// PSUs
export const usePsus = () => {
    return useQuery({
        queryKey: ["psus"],
        queryFn: () => apiService.getPsus()
    })
}

export const usePsu = (id: string | undefined) => {
    return useQuery({
        queryKey: ["psus", id],
        queryFn: () => apiService.getPsu(id!),
        enabled: !!id
    })
}

// CPU Coolers
export const useCpuCoolers = () => {
    return useQuery({
        queryKey: ["cpu-coolers"],
        queryFn: () => apiService.getCpuCoolers()
    })
}

export const useCpuCooler = (id: string | undefined) => {
    return useQuery({
        queryKey: ["cpu-coolers", id],
        queryFn: () => apiService.getCpuCooler(id!),
        enabled: !!id
    })
}

// Monitors
export const useMonitors = () => {
    return useQuery({
        queryKey: ["monitors"],
        queryFn: () => apiService.getMonitors()
    })
}

export const useMonitor = (id: string | undefined) => {
    return useQuery({
        queryKey: ["monitors", id],
        queryFn: () => apiService.getMonitor(id!),
        enabled: !!id
    })
}

// Cases
export const useCases = () => {
    return useQuery({
        queryKey: ["cases"],
        queryFn: () => apiService.getCases()
    })
}

export const useCase = (id: string | undefined) => {
    return useQuery({
        queryKey: ["cases", id],
        queryFn: () => apiService.getCase(id!),
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
