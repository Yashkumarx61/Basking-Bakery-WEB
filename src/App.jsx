import { useState, useEffect } from 'react';
import { CartProvider } from './CartContext';
import { InventoryProvider, useInventory } from './InventoryContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CustomCakeSection from './components/CustomCakeSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import FooterSection from './components/FooterSection';
import CartDrawer from './components/CartDrawer';
import PincodeModal from './components/PincodeModal';
import ProductDetailModal from './components/ProductDetailModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import MobileStickyBar from './components/MobileStickyBar';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function MainLayout() {
  const { adminUser } = useInventory();
  const [view, setView] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.startsWith('/admin') || hash === '#admin') {
      return 'admin';
    }
    return 'shop';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/admin') || hash === '#admin') {
        setView('admin');
      } else {
        setView('shop');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = () => {
    window.history.pushState({}, '', '/');
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'admin') {
    // Protected Admin Route
    if (!adminUser) {
      return <AdminLogin onBackToShop={navigateToShop} />;
    }
    return <AdminDashboard onBackToShop={navigateToShop} />;
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-200 selection:text-bakery-darkText font-body">
      {/* Top Announcement & Pincode Bar */}
      <AnnouncementBar />

      {/* Sticky Header */}
      <Navbar />

      {/* Main Customer Sections */}
      <main className="flex-grow">
        <Hero />
        <MenuSection />
        <CustomCakeSection />
        <TestimonialsSection />
        <AboutSection />
      </main>

      {/* Footer */}
      <FooterSection onOpenAdmin={navigateToAdmin} />

      {/* Modals & Drawers */}
      <CartDrawer />
      <PincodeModal />
      <ProductDetailModal />
      <OrderSuccessModal />

      {/* Sticky Controls */}
      <FloatingWhatsAppButton />
      <MobileStickyBar />
    </div>
  );
}

export default function App() {
  return (
    <InventoryProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </InventoryProvider>
  );
}
