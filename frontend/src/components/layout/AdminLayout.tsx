import { useState } from "react"
import { Link, useLocation } from "react-router"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home
} from "lucide-react"
import { Logo } from "@/assets/svgs"
import { useAdminAuth } from "@/hooks/useAdminAuth"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, loading, logout } = useAdminAuth()

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Użytkownicy", href: "/users", icon: Users },
    { name: "Kategorie", href: "/categories", icon: LayoutDashboard },
    { name: "Produkty", href: "/products-admin", icon: Package },
    { name: "Tagi", href: "/tags", icon: LayoutDashboard },
    { name: "Zamówienia", href: "/orders", icon: ShoppingCart },
    { name: "Ustawienia", href: "/settings", icon: Settings }
  ]

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/"
    return location.pathname.startsWith(href)
  }

  const handleStoreRedirect = () => {
    // Przekieruj do głównej domeny (usuń subdomenę admin)
    const currentHost = window.location.hostname
    const mainHost = currentHost.replace("admin.", "")
    window.location.href = `${window.location.protocol}//${mainHost}${window.location.port ? ":" + window.location.port : ""}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-gray-900 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">KlikKlak Admin</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
            {navigation.map(item => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                    active
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className="space-y-2 border-t border-gray-800 p-4">
            {user && (
              <div className="mb-2 px-4 py-3">
                <p className="text-xs text-gray-400">Zalogowany jako</p>
                <p className="text-sm font-medium text-white">{user.email}</p>
              </div>
            )}
            <button
              onClick={handleStoreRedirect}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Wróć do sklepu</span>
            </button>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-300 transition-colors hover:bg-gray-800 hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Wyloguj się</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {loading ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600"></div>
              <p className="text-gray-600">Sprawdzanie autoryzacji...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Top bar */}
            <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
              <div className="flex h-16 items-center justify-between px-6">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-gray-600 hover:text-gray-900 lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="ml-auto flex items-center gap-4">
                  {user && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 font-medium text-white">
                        {user.firstName?.[0] || user.email[0].toUpperCase()}
                      </div>
                      <div className="hidden md:block">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="p-6">{children}</main>
          </>
        )}
      </div>
    </div>
  )
}
