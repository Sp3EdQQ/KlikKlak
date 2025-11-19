import { Cpu, Gpu, MemoryStick, Microchip, HardDrive, Power, Square } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type Category = {
  name: string
  icon: LucideIcon
  count: string
  color: string
  image: string
}

export const categories: Category[] = [
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
