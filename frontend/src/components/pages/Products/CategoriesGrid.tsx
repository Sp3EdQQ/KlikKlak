import { CategoryCard } from "./CategoryCard"
import { categories } from "./categories"

export function CategoriesGrid() {
    return (
        <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category, idx) => (
                <CategoryCard
                    key={idx}
                    name={category.name}
                    icon={category.icon}
                    count={category.count}
                    color={category.color}
                    image={category.image}
                />
            ))}
        </div>
    )
}
