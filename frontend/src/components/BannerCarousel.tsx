import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerData {
    imageUrl: string;
    title: string;
    subtitle: string;
    ctaText: string;
    gradient: string;
}

interface BannerCarouselProps {
    banners: BannerData[];
    autoPlayInterval?: number;
}

export function BannerCarousel({ banners, autoPlayInterval = 5000 }: BannerCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [banners.length, autoPlayInterval]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const currentBanner = banners[currentIndex];

    return (
        <div className="mx-auto py-8 w-full px-4">
            <div className="relative h-130 w-full overflow-hidden rounded-2xl shadow-lg">
                {/* Background Image with Transition */}
                <div className="absolute inset-0">
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={banner.imageUrl}
                                alt={banner.title}
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
                    <div className="max-w-2xl">
                        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                            {currentBanner.title}
                        </h2>
                        <p className="text-white/90 text-lg md:text-xl mb-8 animate-fade-in">
                            {currentBanner.subtitle}
                        </p>
                        <div className="animate-fade-in">
                            <Button
                                size="lg"
                                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8"
                            >
                                {currentBanner.ctaText}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
