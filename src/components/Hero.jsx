import { ArrowDown, Sparkles, Clock, Truck, Leaf, ExternalLink } from 'lucide-react';
import { GOOGLE_REVIEWS_URL } from '../data';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bakery-cream via-bakery-rose/30 to-bakery-lightGold/40">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-bakery-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center md:text-left space-y-6 animate-fade-in">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-sm font-medium text-bakery-warmBrown">
                100% Eggless Options Available
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-bakery-brown leading-tight">
              Freshly Baked
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bakery-warmBrown to-bakery-gold">
                Treats in Noida
              </span>
              <br />
              Sector 120
            </h1>

            <p className="text-lg text-bakery-warmBrown/80 max-w-md mx-auto md:mx-0 leading-relaxed">
              Handcrafted cakes, pastries & savouries baked every morning in our
              Sector 120 kitchen. Order direct — zero commissions, just pure
              indulgence.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="#menu"
                className="btn-primary flex items-center justify-center gap-2"
              >
                View Menu
                <ArrowDown size={16} />
              </a>
              <a
                href="#custom-cakes"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Order Custom Cake
                <Sparkles size={16} />
              </a>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-bakery-gold/20 mt-6">
              <div className="flex flex-col items-center md:items-start gap-1.5">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf size={18} className="text-green-600" />
                </div>
                <span className="text-xs font-medium text-bakery-warmBrown text-center md:text-left">
                  100% Eggless Options
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1.5">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock size={18} className="text-amber-600" />
                </div>
                <span className="text-xs font-medium text-bakery-warmBrown text-center md:text-left">
                  Fresh Daily Bakes
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1.5">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Truck size={18} className="text-blue-600" />
                </div>
                <span className="text-xs font-medium text-bakery-warmBrown text-center md:text-left">
                  Same-Day 2-Hour Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-slide-up hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
                alt="Freshly baked chocolate cake at Basking Bakery"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bakery-brown/30 to-transparent" />
            </div>

            {/* Clickable Floating Rating Badge */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-5 py-3 animate-pulse-gold hover:scale-105 transition-all duration-200 cursor-pointer group flex items-center gap-3 border border-amber-200/50 shadow-xl"
              title="View Basking Bakery Google Reviews"
            >
              <span className="text-3xl">⭐</span>
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-bold text-bakery-brown">4.8 Rating</p>
                  <ExternalLink size={12} className="text-bakery-warmBrown opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-bakery-warmBrown group-hover:text-bakery-brown group-hover:underline transition-all">
                  Google Reviews ↗
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
