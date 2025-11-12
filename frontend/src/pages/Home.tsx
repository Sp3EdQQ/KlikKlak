import { useEffect, useState } from 'react';
import { BannerCarousel } from '@/components/BannerCarousel';
import { Header, Footer } from '@/components/layout/index';
import { CategoriesSection, FeaturedProductsSection } from '@/components/pages/home';
import { banners } from '@/data/home';
import Dashboard from './admin/Dashboard';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    setIsAdmin(hostname.startsWith('admin.'));
  }, []);

  // If on admin subdomain, show admin dashboard
  if (isAdmin) {
    return <Dashboard />;
  }

  // Otherwise show regular home page
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <BannerCarousel banners={banners} autoPlayInterval={5000} />

      <main className="flex-1">
        <CategoriesSection />
        <FeaturedProductsSection />
      </main>

      <Footer />
    </div>
  );
}
