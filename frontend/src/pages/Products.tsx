import { Navigation } from "@/modules/Navigation"
import { Footer } from "@/modules/Footer"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Procesory",
    image:
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
    count: "150+ produktów"
  },
  {
    name: "Karty graficzne",
    image:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
    count: "89+ produktów"
  },
  {
    name: "Pamięć RAM",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
    count: "200+ produktów"
  },
  {
    name: "Płyty główne",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    count: "75+ produktów"
  },
  {
    name: "Dyski SSD",
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    count: "120+ produktów"
  },
  {
    name: "Zasilacze",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    count: "60+ produktów"
  },
  {
    name: "Obudowy",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop",
    count: "40+ produktów"
  }
]

export default function Products() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <Navigation />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              Wybierz kategorię sprzętu
            </h1>
            <p className="text-muted-foreground text-lg">
              Znajdź komponenty, których potrzebujesz
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category, idx) => (
              <Card
                key={idx}
                className="group border-primary/30 hover:border-primary/30 hover:bg-primary/5 w-64 cursor-pointer overflow-hidden shadow-sm transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="group-hover:text-primary text-center text-lg transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <span className="text-muted-foreground text-sm">{category.count}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
