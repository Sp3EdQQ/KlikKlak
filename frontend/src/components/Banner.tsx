import { Button } from '@/components/ui/button';

interface BannerProps {
    imageUrl: string;
    title: string;
    subtitle: string;
    ctaText: string;
    gradient: string;
}

export function Banner({ imageUrl, title, subtitle, ctaText, gradient }: BannerProps) {
    return (
        <div className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
            {/* Background Image */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
                    {title}
                </h2>
                <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl">
                    {subtitle}
                </p>
                <div>
                    <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 transition-all duration-300 transform hover:scale-105"
                    >
                        {ctaText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
