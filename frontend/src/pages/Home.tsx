import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BannerCarousel } from '@/components/BannerCarousel';
import { Header, Footer } from '@/components/layout/index';
import { CategoriesSection, FeaturedProductsSection } from '@/components/pages/home';
import { banners } from '@/data/home';
import Dashboard from './admin/Dashboard';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hostname = window.location.hostname;
    const isAdminSubdomain = hostname.startsWith('admin.');
    setIsAdmin(isAdminSubdomain);

    // Jeśli to subdomena admin, sprawdź autoryzację
    if (isAdminSubdomain) {
      const token = localStorage.getItem('adminToken');
      const userStr = localStorage.getItem('adminUser');

      if (!token || !userStr) {
        navigate('/login');
        return;
      }

      try {
        const user = JSON.parse(userStr);
        if (user.role !== 'admin') {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    }
  }, [navigate]);

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
