import { BannerCarousel } from '@/components/BannerCarousel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoriesSection, FeaturedProductsSection, BenefitsSection } from '@/components/pages/home';
import { banners } from '@/data/home';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <BannerCarousel banners={banners} autoPlayInterval={5000} />

      <main className="flex-1">
        <CategoriesSection />
        <FeaturedProductsSection />
        <BenefitsSection />
      </main>

      <Footer />
    </div>
  );
}
