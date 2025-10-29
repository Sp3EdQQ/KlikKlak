import { CategoryCard } from './CategoryCard';
import { categories } from '@/data/home';

export function CategoriesSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">Kategorie produktów</h2>
                    <p className="text-gray-500">
                        Znajdź idealne komponenty do swojego zestawu
                    </p>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={index}
                            title={category.title}
                            description={category.description}
                            icon={category.icon}
                            productsCount={category.productsCount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
