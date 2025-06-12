import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="border-primary/40 dark:border-red-500 sticky top-0 z-50 border-b bg-neutral-900/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">
            <span className="from-primary via-accent bg-gradient-to-r to-pink-400 bg-clip-text text-transparent">
              KlikKlak
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-primary font-medium">
              Products
            </a>
            <a href="#" className="hover:text-primary font-medium">
              Build
            </a>
            <a href="#" className="hover:text-primary font-medium">
              Support
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/60 hidden md:flex"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
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
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-primary/50 mt-4 border-t pt-4 md:hidden">
            <div className="space-y-4 pr-4 text-sm">
              <a
                href="#"
                className="hover:text-primary block text-right text-xl font-medium"
              >
                Products
              </a>
              <a
                href="#"
                className="hover:text-primary block text-right text-xl font-medium"
              >
                Build
              </a>
              <a
                href="#"
                className="hover:text-primary block text-right text-xl font-medium"
              >
                Support
              </a>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-end"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
