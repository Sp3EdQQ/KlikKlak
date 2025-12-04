import { useCart } from '../hooks/useCart';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';

export default function Cart() {
  const {
    cart,
    isLoading,
    updateCartItem,
    removeCartItem,
    clearCart,
    isUpdating,
    isRemoving,
  } = useCart();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Ładowanie koszyka...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Twój koszyk jest pusty</h2>
        <p className="text-gray-600 mb-8">Dodaj produkty, aby kontynuować zakupy</p>
        <Link to="/products">cz
          <Button>Przejdź do sklepu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Koszyk</h1>
        <Button
          variant="outline"
          onClick={() => clearCart()}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Wyczyść koszyk
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm"
            >
              <img
                src={item.product.imageUrl || 'https://placehold.co/100x100'}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  {item.product.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  {Number(item.product.price).toFixed(2)} zł
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() =>
                        updateCartItem({
                          itemId: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      }
                      disabled={isUpdating || item.quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartItem({
                          itemId: item.id,
                          quantity: item.quantity + 1,
                        })
                      }
                      disabled={isUpdating || item.quantity >= item.product.stock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-sm text-gray-600">
                    Dostępne: {item.product.stock}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCartItem(item.id)}
                  disabled={isRemoving}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>

                <p className="text-xl font-bold">
                  {(Number(item.product.price) * item.quantity).toFixed(2)} zł
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-white shadow-sm sticky top-4">
            <h2 className="text-xl font-bold mb-4">Podsumowanie</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Produkty ({cart.itemCount})</span>
                <span>{cart.total.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Dostawa</span>
                <span>Darmowa</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Razem</span>
                <span>{cart.total.toFixed(2)} zł</span>
              </div>
            </div>

            <Button className="w-full mb-3" size="lg">
              Przejdź do płatności
            </Button>

            <Link to="/products">
              <Button variant="outline" className="w-full">
                Kontynuuj zakupy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
