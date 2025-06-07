import "./App.css"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Cpu,
  Gpu,
  MemoryStick,
  Microchip,
  Menu,
  X,
  ArrowRight,
  Star,
  Zap
} from "lucide-react"
import { Logo } from "@/assets/svgs"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const featuredProducts = [
    {
      id: 1,
      name: "RTX 4090",
      price: "$1,599",
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
      category: "GPU",
      rating: 4.9,
      special: true
    },
    {
      id: 2,
      name: "i9-14900K",
      price: "$589",
      image:
        "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
      category: "CPU",
      rating: 4.8,
      special: false
    },
    {
      id: 3,
      name: "32GB DDR5",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
      category: "RAM",
      rating: 4.7,
      special: false
    },
    {
      id: 4,
      name: "2TB NVMe",
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
      category: "SSD",
      rating: 4.9,
      special: true
    }
  ]

  const categories = [
    { name: "CPU", icon: Cpu, count: "150+", color: "from-purple-500 to-pink-500" },
    { name: "GPU", icon: Gpu, count: "89+", color: "from-blue-500 to-purple-500" },
    {
      name: "RAM",
      icon: MemoryStick,
      count: "200+",
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Motherboard",
      icon: Microchip,
      count: "75+",
      color: "from-pink-500 to-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Navigation */}
      <nav className="border-primary/40 sticky top-0 z-50 border-b bg-neutral-900/40 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">
              <span className="from-primary via-accent bg-gradient-to-r to-pink-400 bg-clip-text text-transparent">
                KlikKlak
              </span>
            </div>

            <div className="hidden items-center space-x-8 text-sm md:flex">
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
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-800/20 to-neutral-700/20"></div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center space-x-2">
                <Zap className="text-primary h-6 w-6 animate-pulse" />
                <span className="text-primary font-medium">Premium Components</span>
              </div>
              <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
                Build
                <span className="from-primary via-accent block bg-gradient-to-r to-pink-400 bg-clip-text text-transparent">
                  Better
                </span>
              </h1>
              <p className="text-muted-foreground mb-8 max-w-lg text-xl">
                Premium PC components for enthusiasts who demand excellence. Powered by
                cutting-edge technology.
              </p>
              <div className="flex items-center space-x-4">
                <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-primary/20 hover:border-primary/50"
                >
                  Explore Builds
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Logo className="w-84" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-primary/50 border-t py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold tracking-tight">
              Featured Categories
            </h2>
            <p className="text-muted-foreground">This may interest you</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <div key={index} className="group w-60 cursor-pointer">
                <div className="border-primary/30 hover:border-primary/30 hover:bg-primary/5 rounded-xl border p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <div
                    className={`inline-flex rounded-lg bg-gradient-to-br p-3 ${category.color} mb-4`}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-1 font-medium transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground">
              Handpicked components for your ultimate build
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {featuredProducts.map(product => (
              <Card
                key={product.id}
                className={`group border-primary/30 hover:border-primary/30 hover:bg-primary/5 w-60 overflow-hidden pt-0 transition-all duration-300 lg:w-70 ${product.special ? "ring-primary/20 ring-1" : ""}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  {product.special && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="from-primary to-accent bg-gradient-to-r text-white">
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full rounded-t-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-primary/20 text-primary text-xs"
                    >
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-muted-foreground text-xs">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary text-lg transition-colors">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-xl font-bold">
                      {product.price}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-primary/50 bg-primary/2 border-t py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 text-xl font-bold">
                <span className="from-primary via-accent bg-gradient-to-r to-pink-400 bg-clip-text text-transparent">
                  KlikKlak
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Premium PC components for builders who demand the best.
              </p>
            </div>
            <div>
              <h3 className="text-primary mb-4 font-medium">Products</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Processors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Graphics Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Memory
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Storage
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-primary mb-4 font-medium">Support</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Warranty
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-primary/50 text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
            <p>&copy; 2024 KlikKlak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
