import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"

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

export function FeaturedProducts() {
  return (
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
                  <span className="text-primary text-xl font-bold">{product.price}</span>
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
  )
}
