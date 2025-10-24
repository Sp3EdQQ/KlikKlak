import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Cpu, Gpu, MemoryStick, Microchip, HardDrive, Power, Square } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Procesory",
    icon: Cpu,
    count: "150+ produktów",
    color: "from-purple-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop"
  },
  {
    name: "Karty graficzne",
    icon: Gpu,
    count: "89+ produktów",
    color: "from-blue-500 to-purple-500",
    image:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop"
  },
  {
    name: "Pamięć RAM",
    icon: MemoryStick,
    count: "200+ produktów",
    color: "from-purple-500 to-indigo-500",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop"
  },
  {
    name: "Płyty główne",
    icon: Microchip,
    count: "75+ produktów",
    color: "from-pink-500 to-purple-500",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop"
  },
  {
    name: "Dyski SSD",
    icon: HardDrive,
    count: "120+ produktów",
    color: "from-green-500 to-blue-500",
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop"
  },
  {
    name: "Zasilacze",
    icon: Power,
    count: "60+ produktów",
    color: "from-yellow-500 to-orange-500",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
  },
  {
    name: "Obudowy",
    icon: Square,
    count: "40+ produktów",
    color: "from-gray-500 to-neutral-500",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop"
  }
]

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
                className="group border-primary/30 hover:border-primary/30 hover:bg-primary/5 w-60 overflow-hidden pt-0 transition-all duration-300 lg:w-70"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full rounded-t-xl object-cover transition-transform duration-500 group-hover:scale-105"
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
