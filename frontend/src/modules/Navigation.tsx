import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Sun, Moon, User } from "lucide-react"
import { NavLink } from "react-router"
import { useDarkMode } from "@/hooks/useDarkMode"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useDarkMode()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <nav className="border-primary/40 sticky top-0 z-50 border-b bg-neutral-100 backdrop-blur-md dark:bg-neutral-900/40">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">
            <NavLink
              to="/"
              className="from-primary via-accent bg-gradient-to-r to-pink-400 bg-clip-text text-transparent"
            >
              KlikKlak
            </NavLink>
          </div>

          <div className="hidden items-center space-x-6 md:flex">
            <NavLink to="/products" className="hover:text-primary font-medium">
              Products
            </NavLink>
            <NavLink to="/build" className="hover:text-primary font-medium">
              Build
            </NavLink>
            <NavLink to="/support" className="hover:text-primary font-medium">
              Support
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/60 hidden md:flex"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/60"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/60"
                onClick={() => setIsUserMenuOpen(open => !open)}
              >
                <User className="h-4 w-4" />
              </Button>
              {isUserMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 flex w-46 flex-col items-center rounded-xl bg-white py-6 text-center shadow-lg dark:bg-neutral-800">
                  <NavLink
                    to="/login"
                    className="mb-4 w-36 rounded-md px-6 py-2 text-sm font-medium transition hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Zaloguj
                  </NavLink>
                  <div className="mb-1 text-xs text-neutral-500 dark:text-neutral-300">
                    Nie masz konta?
                  </div>
                  <NavLink
                    to="/register"
                    className="bg-primary hover:bg-primary/80 w-36 rounded-md px-6 py-2 text-sm font-medium text-white transition"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Zarejestruj się
                  </NavLink>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/60 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-primary/50 mt-4 border-t pt-4 md:hidden">
            <div className="space-y-4 pr-4 text-sm">
              <NavLink
                to="/products"
                className="hover:text-primary block text-right text-xl font-medium"
              >
                Products
              </NavLink>
              <NavLink
                to="/build"
                className="hover:text-primary block text-right text-xl font-medium"
              >
                Build
              </NavLink>
              <NavLink
                to="/support"
                className="hover:text-primary block text-right text-xl font-medium"
              >
                Support
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
