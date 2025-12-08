import { useState, useEffect } from "react"
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Heart,
  Package,
  ChevronDown,
  Cpu,
  Monitor,
  HardDrive,
  Keyboard,
  Mouse,
  Headphones,
  X,
  LogOut,
  MemoryStick,
  Zap,
  Box,
  Fan,
  Server,
  Disc
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/assets/svgs"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { apiService } from "@/services/api.service"
import type { LucideIcon } from "lucide-react"
import { Link } from "react-router"

interface Category {
  id: string
  name: string
  description: string | null
}

// Mapowanie ikon dla kategorii
const iconMap: Record<string, LucideIcon> = {
  "procesory": Cpu,
  "cpus": Cpu,
  "karty graficzne": Monitor,
  "gpus": Monitor,
  "pamięć ram": MemoryStick,
  "rams": MemoryStick,
  "dyski ssd": Disc,
  "ssds": Disc,
  "dyski hdd": HardDrive,
  "hdds": HardDrive,
  "płyty główne": Server,
  "motherboards": Server,
  "zasilacze": Zap,
  "psus": Zap,
  "chłodzenia cpu": Fan,
  "cpu coolers": Fan,
  "cpu-coolers": Fan,
  "monitory": Monitor,
  "monitors": Monitor,
  "obudowy": Box,
  "cases": Box,
  "klawiatury": Keyboard,
  "myszki": Mouse,
  "słuchawki": Headphones
}

const getIconForCategory = (name: string): LucideIcon => {
  const key = name.toLowerCase().trim()
  return iconMap[key] || HardDrive
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const { user, isAuthenticated, logout } = useAuth()
  const { cart } = useCart()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Błąd pobierania kategorii:", error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top info bar */}
      <div className="bg-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex h-9 items-center justify-center text-sm font-medium">
            <span>KlikKlak - Projekt Inżynierski</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <a href="/" className="flex shrink-0 items-center gap-2">
                <Logo className="aspect-square h-12 w-12" />
                <div className="hidden md:block">
                  <h1 className="text-xl font-bold text-gray-900">KlikKlak</h1>
                  <p className="text-xs text-gray-500">Twój sklep komputerowy</p>
                </div>
              </a>
            </div>

            {/* Search - Desktop */}
            <div className="hidden max-w-2xl flex-1 lg:flex">
              <div className="relative w-full">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Szukaj produktów, kategorii..."
                  className="h-12 w-full border-gray-200 pr-4 pl-12 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  size="sm"
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 bg-blue-500"
                >
                  Szukaj
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden md:flex"
                title="Lista życzeń"
              >
                <Heart className="h-5 w-5" />
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 text-xs bg-blue-500"
                >
                  5
                </Badge>
              </Button>

              {/* Account */}
              {isAuthenticated && user ? (
                <div className="relative hidden md:block">
                  <Button
                    variant="ghost"
                    className="flex gap-2"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-medium text-white">
                      {user.firstName?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div className="hidden flex-col items-start xl:flex">
                      <span className="text-xs text-gray-500">Witaj</span>
                      <span className="text-sm font-medium">
                        {user.firstName || user.email}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                        <div className="border-b border-gray-200 px-4 py-2">
                          <p className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <a
                          href="/zamowienia"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Package className="h-4 w-4" />
                          Moje zamówienia
                        </a>
                        <a
                          href="/ulubione"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Heart className="h-4 w-4" />
                          Lista życzeń
                        </a>
                        <a
                          href="/konto"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User className="h-4 w-4" />
                          Ustawienia konta
                        </a>
                        <hr className="my-2" />
                        <button
                          onClick={() => {
                            logout()
                            setIsUserMenuOpen(false)
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Wyloguj się
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="hidden gap-2 md:flex"
                  title="Konto użytkownika"
                  asChild
                >
                  <a href="/logowanie">
                    <User className="h-5 w-5" />
                    <div className="hidden flex-col items-start xl:flex">
                      <span className="text-xs text-gray-500">Moje konto</span>
                      <span className="text-sm font-medium">Zaloguj się</span>
                    </div>
                  </a>
                </Button>
              )}

              {/* Cart */}
              <Link to="/cart">
                <Button variant="default" className="relative h-11 gap-2 bg-blue-500">
                  <ShoppingCart className="h-5 w-5" />
                  <div className="hidden flex-col items-start sm:flex">
                    <span className="text-xs">Koszyk</span>
                    <span className="text-sm font-bold">
                      {cart ? `${cart.total.toFixed(2)} zł` : "0.00 zł"}
                    </span>
                  </div>
                  {cart && cart.itemCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-2 -right-2 h-6 min-w-6 rounded-full border-2 border-white bg-red-500 px-1.5 text-white"
                    >
                      {cart.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="border-b border-gray-200 bg-white p-4 lg:hidden">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Szukaj produktów..."
              className="w-full pr-10 pl-10"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-1 -translate-y-1/2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Categories Navigation */}
      <div className="hidden border-b border-gray-200 bg-gray-50 lg:block">
        <div className="container mx-auto px-4">
          <nav className="flex h-12 items-center gap-1">
            <Button variant="ghost" className="gap-2 font-semibold">
              Wszystkie kategorie
              <ChevronDown className="h-4 w-4" />
            </Button>
            {categories.map(category => {
              const CategoryIcon = getIconForCategory(category.name)
              return (
                <a
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white hover:text-gray-900"
                >
                  <CategoryIcon className="h-4 w-4" />
                  {category.name}
                </a>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-gray-200 bg-white lg:hidden">
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-1">
              {categories.map(category => {
                const CategoryIcon = getIconForCategory(category.name)
                return (
                  <a
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <CategoryIcon className="h-5 w-5" />
                    {category.name}
                  </a>
                )
              })}
              <div className="my-2 border-t border-gray-200 pt-2">
                <a
                  href="/logowanie"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-5 w-5" />
                  Moje konto
                </a>
                <a
                  href="/wishlist"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Heart className="h-5 w-5" />
                  Lista życzeń
                </a>
                <a
                  href="/orders"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Package className="h-5 w-5" />
                  Moje zamówienia
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
