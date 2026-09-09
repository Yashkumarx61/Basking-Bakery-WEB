import { CartProvider } from './CartContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CustomCakeSection from './components/CustomCakeSection';
import AboutSection from './components/AboutSection';
import FooterSection from './components/FooterSection';
import CartDrawer from './components/CartDrawer';
import PincodeModal from './components/PincodeModal';
import ProductDetailModal from './components/ProductDetailModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import MobileStickyBar from './components/MobileStickyBar';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col selection:bg-amber-200 selection:text-bakery-darkText font-body">
        {/* Top Announcement & Pincode Bar */}
        <AnnouncementBar />

        {/* Sticky Header */}
        <Navbar />

        {/* Main Sections */}
        <main className="flex-grow">
          <Hero />
          <MenuSection />
          <CustomCakeSection />
          <AboutSection />
        </main>

        {/* Footer */}
        <FooterSection />

        {/* Modals & Drawers */}
        <CartDrawer />
        <PincodeModal />
        <ProductDetailModal />
        <OrderSuccessModal />

        {/* Sticky Controls */}
        <FloatingWhatsAppButton />
        <MobileStickyBar />
      </div>
    </CartProvider>
  );
}
