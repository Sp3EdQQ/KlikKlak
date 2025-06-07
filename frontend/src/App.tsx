import "./App.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Cpu, Gpu, MemoryStick, Microchip, Menu, X, ArrowRight, Star, Zap } from "lucide-react";



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: "RTX 4090",
      price: "$1,599",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
      category: "GPU",
      rating: 4.9,
      special: true
    },
    {
      id: 2,
      name: "i9-14900K",
      price: "$589",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
      category: "CPU",
      rating: 4.8,
      special: false
    },
    {
      id: 3,
      name: "32GB DDR5",
      price: "$299",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
      category: "RAM",
      rating: 4.7,
      special: false
    },
    {
      id: 4,
      name: "2TB NVMe",
      price: "$199",
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
      category: "SSD",
      rating: 4.9,
      special: true
    }
  ];

  const categories = [
    { name: "CPU", icon: Cpu, count: "150+", color: "from-purple-500 to-pink-500" },
    { name: "GPU", icon: Gpu, count: "89+", color: "from-blue-500 to-purple-500" },
    { name: "RAM", icon: MemoryStick, count: "200+", color: "from-purple-500 to-indigo-500" },
    { name: "Motherboard", icon: Microchip, count: "75+", color: "from-pink-500 to-purple-500" },
  ];



  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Navigation */}
      <nav className="border-b border-primary/40 backdrop-blur-md bg-neutral-900/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-pink-400 bg-clip-text text-transparent">KlikKlak</span>
            </div>

            <div className="hidden md:flex items-center space-x-8 text-sm">
              <a href="#" className="hover:text-primary font-medium">Products</a>
              <a href="#" className="hover:text-primary font-medium">Build</a>
              <a href="#" className="hover:text-primary font-medium">Support</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex hover:bg-primary/60">
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
            <div className="md:hidden mt-4 pt-4 border-t border-primary/50">
              <div className="space-y-4 text-sm pr-4">
                <a href="#" className="block hover:text-primary text-right font-medium text-xl">Products</a>
                <a href="#" className="block hover:text-primary text-right font-medium text-xl">Build</a>
                <a href="#" className="block hover:text-primary text-right font-medium text-xl">Support</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-800/20 to-neutral-700/20"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-6">
              <Zap className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-primary font-medium">Premium Components</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Build
              <span className="bg-gradient-to-r from-primary via-accent to-pink-400 bg-clip-text text-transparent block">
                Better
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Premium PC components for enthusiasts who demand excellence. Powered by cutting-edge technology.
            </p>
            <div className="flex items-center space-x-4">
              <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-primary/20 hover:border-primary/50">
                Explore Builds
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-t border-primary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Categories</h2>
            <p className="text-muted-foreground">This may interest you</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="hover:bg-primary/5 border border-primary/30 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} mb-4`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium mb-1 text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked components for your ultimate build</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className={`group pt-0 border-primary/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 overflow-hidden ${product.special ? 'ring-1 ring-primary/20' : ''}`}>
                <div className="aspect-square overflow-hidden relative">
                  {product.special && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary">{product.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                    <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
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
      <footer className="border-t border-border/50 py-12 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-accent to-pink-400 bg-clip-text text-transparent">KlikKlak</span>
              </div>
              <p className="text-sm text-muted-foreground">Premium PC components for builders who demand the best.</p>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-primary">Products</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Processors</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Graphics Cards</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Memory</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Storage</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-primary">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Warranty</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 KlikKlak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;