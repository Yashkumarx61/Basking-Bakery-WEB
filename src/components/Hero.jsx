import { useState, useRef, useEffect } from 'react';
import { ArrowDown, Sparkles, Clock, Truck, Leaf, ExternalLink } from 'lucide-react';
import { GOOGLE_REVIEWS_URL } from '../data';

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or failed:', err);
      });
    }
  }, []);

  const videoSrc = `${import.meta.env.BASE_URL}videos/hero-bg.mp4`;
  const fallbackImg = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-amber-950">
      {/* Background Video & Fallback Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Background Video */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Fallback Poster / Background Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            !videoLoaded || videoError ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${fallbackImg})` }}
        />

        {/* Subtle Dark/Warm Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 via-amber-950/75 to-amber-950/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Warm Decorative Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-bakery-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-3xl" />
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32 w-full">
        <div className="max-w-3xl text-center md:text-left space-y-6 animate-fade-in">
          {/* Eyebrow & Google Review Badge */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-1.5 shadow-md border border-amber-200/50">
              <Sparkles size={14} className="text-amber-600" />
              <span className="text-sm font-semibold text-bakery-darkText">
                100% Eggless Options Available
              </span>
            </div>

            {/* Clickable Google Rating Badge */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-1.5 shadow-md border border-amber-200/50 hover:scale-105 transition-all duration-200 group cursor-pointer"
              title="View Basking Bakery Google Reviews"
            >
              <span className="text-sm">⭐</span>
              <span className="text-sm font-bold text-bakery-brown">4.8 Rating</span>
              <span className="text-xs text-bakery-warmBrown group-hover:underline">Google Reviews ↗</span>
              <ExternalLink size={12} className="text-bakery-warmBrown opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-50 leading-tight drop-shadow-md">
            Freshly Baked
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-bakery-gold">
              Treats in Noida
            </span>
            <br />
            Sector 120
          </h1>

          <p className="text-lg text-amber-100/90 max-w-xl mx-auto md:mx-0 leading-relaxed drop-shadow-sm font-normal">
            Handcrafted cakes, pastries & savouries baked every morning in our
            Sector 120 kitchen. Order direct — zero commissions, just pure
            indulgence.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
            <a
              href="#menu"
              className="btn-primary flex items-center justify-center gap-2 shadow-xl shadow-amber-950/40"
            >
              View Menu
              <ArrowDown size={16} />
            </a>
            <a
              href="#custom-cakes"
              className="btn-secondary flex items-center justify-center gap-2 shadow-xl shadow-amber-950/40"
            >
              Order Custom Cake
              <Sparkles size={16} />
            </a>
          </div>

          {/* Trust highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-amber-200/20 mt-6 max-w-2xl">
            <div className="flex items-center md:items-start gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg">
              <div className="w-10 h-10 shrink-0 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/30">
                <Leaf size={18} className="text-green-300" />
              </div>
              <span className="text-xs font-medium text-amber-100">
                100% Eggless Options
              </span>
            </div>
            <div className="flex items-center md:items-start gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg">
              <div className="w-10 h-10 shrink-0 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/30">
                <Clock size={18} className="text-amber-300" />
              </div>
              <span className="text-xs font-medium text-amber-100">
                Fresh Daily Bakes
              </span>
            </div>
            <div className="flex items-center md:items-start gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg">
              <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                <Truck size={18} className="text-blue-300" />
              </div>
              <span className="text-xs font-medium text-amber-100">
                Same-Day 2-Hour Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

