import { useState, useEffect } from "react"
import { apiService } from "@/services/api.service"
import { useAuth } from "./useAuth"

export function useWishlist(productId?: string) {
    const { user } = useAuth()
    const [isInWishlist, setIsInWishlist] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user && productId) {
            checkWishlistStatus()
        }
    }, [user, productId])

    const checkWishlistStatus = async () => {
        if (!productId || !user) return

        try {
            const response = await apiService.checkWishlistStatus(productId)
            setIsInWishlist(response.isInWishlist)
        } catch (error) {
            console.error("Błąd sprawdzania statusu wishlist:", error)
        }
    }

    const toggleWishlist = async () => {
        if (!user) {
            alert("Musisz być zalogowany, aby dodać produkt do listy życzeń")
            return
        }

        if (!productId) return

        setLoading(true)
        try {
            if (isInWishlist) {
                await apiService.removeFromWishlist(productId)
                setIsInWishlist(false)
            } else {
                await apiService.addToWishlist(productId)
                setIsInWishlist(true)
            }
        } catch (error) {
            console.error("Błąd aktualizacji wishlist:", error)
            alert("Wystąpił błąd. Spróbuj ponownie.")
        } finally {
            setLoading(false)
        }
    }

    return {
        isInWishlist,
        loading,
        toggleWishlist,
    }
}
