import { Store, Award, Clock, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=600&h=500&fit=crop"
                alt="Inside Basking Bakery kitchen"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 glass-card rounded-2xl px-6 py-4 hidden md:block">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏪</span>
                <div>
                  <p className="font-bold text-bakery-brown">Amrapali Zodiac Market</p>
                  <p className="text-xs text-bakery-warmBrown">Sector 120, Noida</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-6">
            <span className="text-sm font-medium text-bakery-gold uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="section-title">About Basking Bakery</h2>
            <p className="text-bakery-warmBrown/80 leading-relaxed">
              Nestled in the heart of Amrapali Zodiac Market, Sector 120, Noida —
              Basking Bakery is your neighborhood bakery dedicated to bringing you
              the freshest cakes, pastries, and savoury treats every single day.
            </p>
            <p className="text-bakery-warmBrown/80 leading-relaxed">
              We believe in quality over everything. From premium 100% eggless
              options to custom celebration cakes, every item is crafted with love
              and the finest ingredients.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                {
                  icon: <Store size={20} />,
                  title: 'Local Bakery',
                  desc: 'Right in your neighborhood',
                },
                {
                  icon: <Award size={20} />,
                  title: 'Quality First',
                  desc: 'Premium ingredients only',
                },
                {
                  icon: <Clock size={20} />,
                  title: 'Fresh Daily',
                  desc: 'Baked every morning',
                },
                {
                  icon: <Heart size={20} />,
                  title: 'Made with Love',
                  desc: 'For our community',
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-bakery-cream/50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-bakery-gold/20 flex items-center justify-center text-bakery-brown mb-2">
                    {f.icon}
                  </div>
                  <h4 className="font-semibold text-sm text-bakery-brown">
                    {f.title}
                  </h4>
                  <p className="text-xs text-bakery-warmBrown/60 mt-0.5">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
