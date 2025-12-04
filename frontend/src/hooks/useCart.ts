import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string | null;
    stock: number;
    categoryId: string;
  };
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface AddToCartPayload {
  productId: string;
  quantity: number;
}

interface UpdateCartItemPayload {
  itemId: string;
  quantity: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const useCart = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('accessToken');

  const { data: cart, isLoading, error } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/carts/me`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    },
    enabled: !!token,
    retry: false,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Musisz być zalogowany aby dodać produkt do koszyka');
      }
      const response = await axios.post(
        `${API_URL}/carts/items`,
        payload,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        alert('Musisz być zalogowany aby dodać produkt do koszyka');
      } else {
        alert(error.message || 'Nie udało się dodać produktu do koszyka');
      }
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: UpdateCartItemPayload) => {
      const response = await axios.patch(
        `${API_URL}/carts/items/${itemId}`,
        { quantity },
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeCartItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await axios.delete(
        `${API_URL}/carts/items/${itemId}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `${API_URL}/carts/clear`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    cart,
    isLoading,
    error,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartItemMutation.mutate,
    removeCartItem: removeCartItemMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdating: updateCartItemMutation.isPending,
    isRemoving: removeCartItemMutation.isPending,
    isClearing: clearCartMutation.isPending,
  };
};
