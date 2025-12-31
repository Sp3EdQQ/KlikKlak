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
      className="group relative w-56 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-8 relative">
        <Icon
          className="h-20 w-20 text-blue-500 transition-all duration-300 group-hover:scale-125 group-hover:text-blue-600 relative z-10"
          strokeWidth={1.5}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-500/0 to-blue-600/0 group-hover:from-blue-400/10 group-hover:via-blue-500/10 group-hover:to-blue-600/10 transition-all duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="mb-3 text-sm leading-tight text-gray-600 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-600">{productsCount} produktów</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-500 transition-colors">
            <ArrowRight className="h-4 w-4 text-blue-600 group-hover:text-white transition-all group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
