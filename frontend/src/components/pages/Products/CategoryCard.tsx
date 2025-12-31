import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

type CategoryCardProps = {
  name: string
  icon: LucideIcon
  count: string
  color: string
  image: string
}

export function CategoryCard({ name, count, image }: CategoryCardProps) {
  return (
    <Card className="group relative w-64 overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight className="h-6 w-6 text-white" />
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-center pb-5">
        <span className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors font-medium">{count}</span>
      </CardContent>
    </Card>
  )
}
