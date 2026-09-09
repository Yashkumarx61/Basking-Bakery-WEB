import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { STORE_CONFIG, WHATSAPP_NUMBER, INSTAGRAM_URL, GOOGLE_REVIEWS_URL } from '../data';
import { getDirectWhatsAppURL } from '../utils';
import swiggyLogo from '../assets/swiggy.png';
import zomatoLogo from '../assets/zomato.png';
import bakeryLogo from '../assets/basking-bakery-logo.png';

function BrandLogo({ name }) {
  if (name === 'google') {
    return <span className="font-bold text-base leading-none" style={{ color: '#4285F4' }} aria-hidden="true">G</span>;
  }
  if (name === 'whatsapp') {
    return <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.55 0 .24 5.31.24 11.84c0 2.09.55 4.13 1.59 5.92L.14 24l6.38-1.67a11.82 11.82 0 0 0 5.56 1.41h.01c6.52 0 11.83-5.31 11.83-11.84 0-3.16-1.23-6.13-3.4-8.42Zm-8.44 18.2h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.79.99 1.01-3.69-.23-.38a9.84 9.84 0 1 1 8.39 4.66Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.45s1.05 2.84 1.2 3.04c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35Z" /></svg>;
  }
  if (name === 'instagram') {
    return <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
  }
  const logo = name === 'swiggy' ? swiggyLogo : zomatoLogo;
  return (
    <span className="inline-flex h-[18px] w-[18px] items-center justify-center overflow-hidden rounded-[4px]" aria-hidden="true">
      <img
        src={logo}
        alt=""
        className={`h-full w-full object-cover ${name === 'zomato' ? 'scale-[1.35]' : ''}`}
      />
    </span>
  );
}

export default function FooterSection() {
  return (
    <footer id="contact" className="bg-bakery-brown text-white pt-16 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand & info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={bakeryLogo} alt="Basking Bakery logo" className="h-10 w-10 rounded-xl object-cover shadow-md" />
              <span className="font-display text-2xl font-bold tracking-tight">
                Basking Bakery
              </span>
            </div>
            <p className="text-sm text-bakery-rose/80 leading-relaxed">
              Your neighborhood bakery in Sector 120 Noida. Baking happiness
              fresh every day with premium ingredients and 100% eggless options.
            </p>

            {/* FSSAI Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/15 text-xs font-medium text-bakery-rose/90">
              <ShieldCheck size={16} className="text-amber-400" />
              <span>FSSAI Lic. No: <strong>22722120000123</strong></span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-bakery-gold">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-bakery-rose/80">
              {['Menu', 'Custom Cakes', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & hours */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-bakery-gold">
              Store Info
            </h3>
            <ul className="space-y-3 text-sm text-bakery-rose/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Shop 14, Amrapali Zodiac Market, Sector 120, Noida, UP 201301
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={18} className="text-amber-400 shrink-0" />
                <span>8:00 AM – 10:00 PM (Every day)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-amber-400 shrink-0" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:underline">
                  {STORE_CONFIG.phoneDisplay}
                </a>
              </li>
            </ul>

            {/* Social, review & ordering buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors text-bakery-darkText shadow-md hover:shadow-lg"
                title="Rate Basking Bakery on Google"
              >
                <BrandLogo name="google" /> Rate Us on Google
              </a>
              <a
                href={getDirectWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-green-600 hover:bg-green-700 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors text-white"
                title="Chat on WhatsApp"
              >
                <BrandLogo name="whatsapp" /> WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors text-white"
                title="Follow on Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg> Instagram
              </a>
              <a
                href="https://swiggy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-orange-600/80 hover:bg-orange-600 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors text-white"
              >
                <BrandLogo name="swiggy" /> Swiggy <ExternalLink size={12} />
              </a>
              <a
                href="https://zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-red-600/80 hover:bg-red-600 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors text-white"
              >
                <BrandLogo name="zomato" /> Zomato <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-bakery-gold">
              Locate Us
            </h3>
            <div className="rounded-xl overflow-hidden h-44 border border-white/10 shadow-inner">
              <iframe
                title="Basking Bakery Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7196020786523!2d77.393456!3d28.578298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef7df702220b%3A0xea8a4ec9ec51a812!2sAmrapali%20Zodiac%2C%20Sector%20120%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-bakery-rose/60 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Basking Bakery. All rights reserved.</p>
          <p>Designed for Sector 120 Noida Residents · Zero Aggregator Commission</p>
        </div>
      </div>
    </footer>
  );
}
