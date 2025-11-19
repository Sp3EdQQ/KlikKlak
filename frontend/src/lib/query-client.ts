import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minut
            gcTime: 1000 * 60 * 10, // 10 minut (wcześniej cacheTime)
            refetchOnWindowFocus: false,
            retry: 3
        },
        mutations: {
            retry: 3
        }
    }
})
