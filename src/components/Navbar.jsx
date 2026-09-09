import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MessageCircle, MapPin } from 'lucide-react';
import { useCart } from '../CartContext';
import { formatPrice, getDirectWhatsAppURL } from '../utils';
import { STORE_CONFIG } from '../data';
import bakeryLogo from '../assets/basking-bakery-logo.png';

const navLinks = [
  { label: 'Menu Catalog', href: '#menu' },
  { label: 'Custom Cakes', href: '#custom-cakes' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { itemCount, grandTotal, toggleCart, selectedLocation, openPincodeModal } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-amber-100/60'
          : 'bg-[#FAF7F2]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition">
              <img src={bakeryLogo} alt="Basking Bakery logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-bold text-[#2B1810] leading-tight group-hover:text-[#8B6F47] transition-colors">
                Basking Bakery
              </span>
              <span className="text-[10px] text-[#8B6F47] tracking-wider uppercase font-semibold -mt-0.5">
                Sector 120, Noida
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#2B1810]/80 hover:text-[#2B1810] relative py-1
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C4956A]
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Instagram direct link */}
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-pink-600 hover:bg-pink-50 rounded-full transition-colors hidden sm:flex"
              title="Follow Basking Bakery on Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Direct WhatsApp button */}
            <a
              href={getDirectWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2.5 rounded-full transition-all duration-300 shadow-sm"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 bg-[#5C3D2E] hover:bg-[#8B6F47] text-white rounded-full px-4 py-2.5 transition-all duration-300 hover:shadow-lg"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <>
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-[#2B1810] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-subtle shadow-md">
                    {itemCount}
                  </span>
                  <span className="hidden sm:inline text-sm font-semibold">
                    {formatPrice(grandTotal)}
                  </span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#5C3D2E] hover:bg-amber-100/50 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in space-y-2 border-t border-amber-100 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPincodeModal();
              }}
              className="w-full flex items-center justify-between p-3 bg-amber-50 rounded-xl text-xs font-semibold text-[#5C3D2E] border border-amber-200"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-amber-600" />
                Delivering to: {selectedLocation.name}
              </span>
              <span className="text-amber-700 underline">Change</span>
            </button>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-[#2B1810] font-medium hover:bg-amber-100/30 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={getDirectWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
