import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

type CategoryCardProps = {
  name: string
  icon: LucideIcon
  count: string
  color: string
  image: string
}

export function CategoryCard({ name, count, image }: CategoryCardProps) {
  return (
    <Card className="group border-primary/30 hover:border-primary/30 hover:bg-primary/5 w-60 overflow-hidden pt-0 transition-all duration-300 lg:w-70">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full rounded-t-xl object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="group-hover:text-primary text-center text-lg transition-colors">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-center">
        <span className="text-muted-foreground text-sm">{count}</span>
      </CardContent>
    </Card>
  )
}
