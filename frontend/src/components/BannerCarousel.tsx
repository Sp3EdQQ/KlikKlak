import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BannerData {
  imageUrl: string
  title: string
  subtitle: string
  ctaText: string
  gradient: string
}

interface BannerCarouselProps {
  banners: BannerData[]
  autoPlayInterval?: number
}

export function BannerCarousel({
  banners,
  autoPlayInterval = 5000
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [banners.length, autoPlayInterval])

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentBanner = banners[currentIndex]

  return (
    <div className="mx-auto w-full px-4 py-8">
      <div className="relative h-130 w-full overflow-hidden rounded-2xl shadow-lg">
        {/* Background Image with Transition */}
        <div className="absolute inset-0">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative container mx-auto flex h-full flex-col justify-center px-4">
          <div className="max-w-2xl">
            <h2 className="animate-fade-in mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {currentBanner.title}
            </h2>
            <p className="animate-fade-in mb-8 text-lg text-white/90 md:text-xl">
              {currentBanner.subtitle}
            </p>
            <div className="animate-fade-in">
              <Button
                size="lg"
                className="bg-white px-8 font-semibold text-gray-900 hover:bg-gray-100"
              >
                {currentBanner.ctaText}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
