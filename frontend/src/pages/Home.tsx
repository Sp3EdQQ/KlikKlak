import { ShoppingCart, ArrowRight, Star, Cpu, Monitor, HardDrive, Keyboard, Mouse, Headphones, MemoryStick, Zap, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BannerCarousel } from '@/components/BannerCarousel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// CategoryCard Component
interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  productsCount: number;
}

function CategoryCard({ title, description, icon: Icon, productsCount }: CategoryCardProps) {
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

// ProductCard Component
interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

function ProductCard({
  name,
  price,
  originalPrice,
  imageUrl,
  rating,
  reviews,
  inStock,
  badge,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg">
      {/* Badge */}
      {badge && (
        <div className="absolute left-3 top-3 z-10">
          <Badge variant="destructive">{badge}</Badge>
        </div>
      )}

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2">{name}</h3>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-100 text-gray-100'
                  }`}
              />
            ))}
          </div>
          <span className="text-gray-500">({reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-2xl">${price.toFixed(2)}</span>
          {originalPrice && (
            <>
              <span className="text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <Badge variant="secondary">-{discount}%</Badge>
            </>
          )}
        </div>

        {/* Stock status */}
        <div className="mb-3">
          {inStock ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </div>

        {/* Add to cart button */}
        <Button className="mt-auto w-full gap-2 bg-blue-500 hover:bg-blue-600" disabled={!inStock}>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

// Main App Component
export default function Home() {
  const banners = [
    {
      imageUrl: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwfGVufDF8fHx8MTc2MTQwMDc3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Premium Gaming PCs",
      subtitle: "Experience ultimate performance with our custom-built gaming rigs",
      ctaText: "Shop Gaming PCs",
      gradient: "from-black/80 via-black/60 to-transparent"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1662830857519-2f9b28e3b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGhhcmR3YXJlJTIwY29tcG9uZW50c3xlbnwxfHx8fDE3NjEzODE4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "PC Components & Upgrades",
      subtitle: "High-quality parts from top brands - Build your dream setup",
      ctaText: "Browse Components",
      gradient: "from-blue-900/80 via-blue-900/50 to-transparent"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxNDUyMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Laptops & Workstations",
      subtitle: "Powerful portable solutions for work and creative professionals",
      ctaText: "View Laptops",
      gradient: "from-gray-900/80 via-gray-900/50 to-transparent"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1613442986373-af81e5c618d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZ2IlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjE0ODI2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "RGB & Peripherals",
      subtitle: "Customize your setup with premium keyboards, mice, and lighting",
      ctaText: "Shop Accessories",
      gradient: "from-purple-900/80 via-purple-900/50 to-transparent"
    }
  ];

  const categories = [
    {
      title: 'Procesory',
      description: 'Intel & AMD CPUs',
      icon: Cpu,
      productsCount: 245,
    },
    {
      title: 'Monitory',
      description: 'NVIDIA & AMD GPUs',
      icon: Monitor,
      productsCount: 189,
    },
    {
      title: 'Dyski',
      description: 'SSD, NVMe, HDD',
      icon: HardDrive,
      productsCount: 312,
    },
    {
      title: 'Pamięć',
      description: 'DDR4 & DDR5 RAM',
      icon: MemoryStick,
      productsCount: 428,
    },
    {
      title: 'Klawiatury',
      description: 'Mechaniczne i membranowe',
      icon: Keyboard,
      productsCount: 567,
    },
    {
      title: 'Myszki',
      description: 'Gaming & biurowe',
      icon: Mouse,
      productsCount: 198,
    },
    {
      title: 'Słuchawki',
      description: 'Gaming & profesjonalne',
      icon: Headphones,
      productsCount: 276,
    },
  ];

  const featuredProducts = [
    {
      name: 'AMD Ryzen 9 7950X 16-Core Processor',
      price: 549.99,
      originalPrice: 699.99,
      imageUrl: 'https://images.unsplash.com/photo-1707921270852-0bc1743a7604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHByb2Nlc3NvciUyMENQVXxlbnwxfHx8fDE3NjExODE3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 1243,
      inStock: true,
      badge: 'Hot Deal',
    },
    {
      name: 'NVIDIA GeForce RTX 4080 Super Gaming Graphics Card',
      price: 999.99,
      originalPrice: 1199.99,
      imageUrl: 'https://images.unsplash.com/photo-1658673847785-08f1738116f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljcyUyMGNhcmQlMjBHUFV8ZW58MXx8fHwxNzYxMjkzODQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 2156,
      inStock: true,
      badge: 'Best Seller',
    },
    {
      name: 'ASUS ROG Strix Z790-E Gaming WiFi Motherboard',
      price: 429.99,
      imageUrl: 'https://images.unsplash.com/photo-1562408590-e32931084e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vdGhlcmJvYXJkfGVufDF8fHx8MTc2MTIzOTYzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 892,
      inStock: true,
    },
    {
      name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
      price: 159.99,
      originalPrice: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1666868213704-1677b7f04c30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMFJBTSUyMG1lbW9yeXxlbnwxfHx8fDE3NjEyODk3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 1567,
      inStock: true,
    },
    {
      name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
      price: 179.99,
      originalPrice: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1628557119555-fb3d687cc310?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHN0b3JhZ2UlMjBTU0R8ZW58MXx8fHwxNzYxMjg5NzAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 2341,
      inStock: false,
    },
    {
      name: 'Corsair RM850x 850W 80+ Gold Modular Power Supply',
      price: 139.99,
      imageUrl: 'https://images.unsplash.com/photo-1588382472578-8d8b337b277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHBvd2VyJTIwc3VwcGx5fGVufDF8fHx8MTc2MTI4OTcwMnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 1876,
      inStock: true,
    },
    {
      name: 'NZXT H9 Elite Mid-Tower Gaming Case - White',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1618339220157-daa2cd9ade56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQQyUyMGNhc2V8ZW58MXx8fHwxNzYxMjk1NzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 654,
      inStock: true,
      badge: 'New',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <BannerCarousel banners={banners} autoPlayInterval={5000} />

      <main className="flex-1">
        {/* Categories Section */}
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


        {/* Featured Products Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">Wyróżnione produkty</h2>
              <p className="text-gray-500">
                Najwyżej oceniane komponenty wybrane przez naszych klientów
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  imageUrl={product.imageUrl}
                  rating={product.rating}
                  reviews={product.reviews}
                  inStock={product.inStock}
                  badge={product.badge}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <svg
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Oryginalne produkty</h3>
                <p className="text-gray-500">
                  100% oryginalne produkty od autoryzowanych dystrybutorów z pełną gwarancją
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <svg
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Szybka wysyłka</h3>
                <p className="text-gray-500">
                  Darmowa wysyłka przy zamówieniach powyżej 500 zł. Dostępna ekspresowa dostawa
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <svg
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Wsparcie ekspertów</h3>
                <p className="text-gray-500">
                  Nasi eksperci techniczni pomogą Ci w doradztwie i wsparciu przy budowie komputera
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
