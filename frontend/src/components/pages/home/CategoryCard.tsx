import { ArrowRight, type LucideIcon } from "lucide-react"
import { Link } from "react-router"

interface CategoryCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  productsCount: number
}

export function CategoryCard({
  id,
  title,
  description,
  icon: Icon,
  productsCount
}: CategoryCardProps) {
  return (
    <Link
      to={`/category/${id}`}
      className="group relative w-48 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 p-8">
        <Icon
          className="h-16 w-16 text-blue-500 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-base font-semibold text-gray-900">{title}</h3>
        <p className="mb-2 text-sm leading-tight text-gray-500">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{productsCount} produktów</span>
          <ArrowRight className="h-4 w-4 text-blue-500 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
