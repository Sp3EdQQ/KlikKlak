import { Button } from "@/components/ui/button"

interface BannerProps {
  imageUrl: string
  title: string
  subtitle: string
  ctaText: string
  gradient: string
}

export function Banner({ imageUrl, title, subtitle, ctaText, gradient }: BannerProps) {
  return (
    <div className="group relative h-[400px] cursor-pointer overflow-hidden rounded-2xl">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
        <h2 className="mb-4 max-w-2xl text-4xl font-bold text-white md:text-5xl">
          {title}
        </h2>
        <p className="mb-8 max-w-xl text-lg text-white/90 md:text-xl">{subtitle}</p>
        <div>
          <Button
            size="lg"
            className="transform bg-white px-8 font-semibold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  )
}
