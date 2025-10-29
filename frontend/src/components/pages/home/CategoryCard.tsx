import { ArrowRight, type LucideIcon } from 'lucide-react';

interface CategoryCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    productsCount: number;
}

export function CategoryCard({ title, description, icon: Icon, productsCount }: CategoryCardProps) {
    return (
        <a
            href="#"
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1 flex-shrink-0 w-48"
        >
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
                <Icon className="h-16 w-16 text-blue-500 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <div className="p-4">
                <h3 className="mb-2 font-semibold text-gray-900 text-base">{title}</h3>
                <p className="text-gray-500 mb-2 text-sm leading-tight">{description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{productsCount} produktów</span>
                    <ArrowRight className="h-4 w-4 text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </a>
    );
}
