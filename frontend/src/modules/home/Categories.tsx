import { Cpu, Gpu, MemoryStick, Microchip } from "lucide-react"

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

export function Categories() {
  return (
    <section className="border-primary/50 border-t py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">Featured Categories</h2>
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
  )
}
