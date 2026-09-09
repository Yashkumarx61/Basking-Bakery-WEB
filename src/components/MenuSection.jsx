import { useState, useMemo } from 'react';
import { Filter, Leaf, Sparkles } from 'lucide-react';
import { products, categories } from '../data';
import ProductCard from './ProductCard';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [egglessOnly, setEgglessOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        activeCategory === 'all' || p.category === activeCategory;
      const dietaryMatch = !egglessOnly || p.isEggless;
      return categoryMatch && dietaryMatch;
    });
  }, [activeCategory, egglessOnly]);

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100/60 rounded-full px-4 py-1 mb-3">
            <Sparkles size={13} className="text-amber-700" />
            <span className="text-xs font-semibold text-amber-900 uppercase tracking-widest">
              Fresh Daily Menu
            </span>
          </div>
          <h2 className="section-title">Explore Our Artisan Bakes</h2>
          <p className="text-bakery-warmBrown/80 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Handcrafted with premium ingredients & baked fresh every morning in Sector 120 Noida.
          </p>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 md:top-20 z-30 bg-[#FAF7F2]/95 backdrop-blur-md py-4 mb-8 border-b border-amber-200/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills Navigator */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === 'custom-orders') {
                      document.getElementById('custom-cakes')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setActiveCategory(cat.id);
                    }
                  }}
                  className={`whitespace-nowrap text-xs sm:text-sm px-4 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-[#5C3D2E] text-white shadow-md scale-[1.02]'
                      : 'bg-white text-bakery-warmBrown border border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Eggless Toggle */}
            <button
              onClick={() => setEgglessOnly(!egglessOnly)}
              className={`flex items-center gap-2 text-xs sm:text-sm px-4 py-2.5 rounded-full border transition-all duration-200 shrink-0 font-semibold ${
                egglessOnly
                  ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-md'
                  : 'bg-white text-bakery-warmBrown border-amber-200 hover:border-emerald-500'
              }`}
            >
              <Leaf size={14} className={egglessOnly ? 'text-white' : 'text-emerald-600'} />
              100% Eggless Only
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl p-8 max-w-md mx-auto card-shadow">
            <Filter size={48} className="mx-auto text-amber-300 mb-4" />
            <p className="text-bakery-brown font-display text-lg font-bold">
              No items match your filter
            </p>
            <p className="text-xs text-bakery-warmBrown mt-1">
              Try switching off &quot;100% Eggless Only&quot; or select &quot;All Items&quot;.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setEgglessOnly(false);
              }}
              className="mt-4 text-xs font-bold text-amber-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
