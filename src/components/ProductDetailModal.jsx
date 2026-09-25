import { useState, useEffect } from 'react';
import { X, Star, Leaf, ShoppingCart, ShieldCheck, Clock, AlertCircle, Minus, Plus } from 'lucide-react';
import { useCart } from '../CartContext';
import { useInventory } from '../InventoryContext';
import { formatPrice } from '../utils';
import ImageWithFallback from './ImageWithFallback';

export default function ProductDetailModal() {
  const { productModalData, closeProductModal, addItem, increment, decrement, getItemQuantity } = useCart();
  const { products } = useInventory();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  useEffect(() => {
    if (productModalData) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeProductModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [productModalData, closeProductModal]);

  if (!productModalData) return null;

  // Look up live product from Inventory Context so any staff edits/deletions update immediately
  const product = products.find((p) => p.id === productModalData.id) || productModalData;
  const variant = product.variants?.[selectedVariantIdx] || product.variants?.[0] || { label: '1 Portion', price: 0 };
  const qty = getItemQuantity(product.id, variant.label);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 overlay backdrop-blur-sm"
        onClick={closeProductModal}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[600px] max-h-[90vh] bg-white rounded-3xl z-50 shadow-2xl overflow-y-auto cart-scroll animate-fade-in border border-amber-100"
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-bakery-cream">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={closeProductModal}
            className="absolute top-4 right-4 p-2.5 bg-white/80 hover:bg-white text-bakery-brown rounded-full backdrop-blur-md transition shadow-md"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-3 left-4 flex gap-2">
            {product.isVeg && (
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Leaf size={12} /> 100% EGGLESS & VEG
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-amber-400 text-bakery-darkText text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                ⭐ BEST SELLER
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-2xl font-bold text-bakery-brown">
                {product.name}
              </h2>
              <div className="flex items-center gap-1 text-sm font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Star size={15} className="fill-amber-500 text-amber-500" />
                <span>{product.rating || '4.8'}</span>
                <span className="text-bakery-warmBrown text-xs font-normal">({product.reviewsCount || 42})</span>
              </div>
            </div>
            <p className="text-sm text-bakery-warmBrown/90 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variant Chips */}
          <div>
            <span className="text-xs font-semibold text-bakery-brown uppercase tracking-wider block mb-2">
              Select Portion / Weight
            </span>
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((v, idx) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium border transition-all ${
                    idx === selectedVariantIdx
                      ? 'bg-bakery-brown text-white border-bakery-brown shadow-md scale-105'
                      : 'bg-bakery-cream/40 border-bakery-lightGold text-bakery-warmBrown hover:border-bakery-gold'
                  }`}
                >
                  {v.label} — {formatPrice(v.price)}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-amber-100 text-xs">
            <div className="bg-bakery-cream/50 p-3.5 rounded-2xl space-y-1">
              <span className="font-bold text-bakery-brown flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" /> Ingredients
              </span>
              <p className="text-bakery-warmBrown/80">{product.ingredients || 'Fresh daily bakery ingredients'}</p>
            </div>
            <div className="bg-bakery-cream/50 p-3.5 rounded-2xl space-y-1">
              <span className="font-bold text-bakery-brown flex items-center gap-1">
                <Clock size={14} className="text-amber-600" /> Shelf Life & Storage
              </span>
              <p className="text-bakery-warmBrown/80">{product.shelfLife || 'Best within 48 hours'}</p>
            </div>
            <div className="bg-bakery-cream/50 p-3.5 rounded-2xl space-y-1 sm:col-span-2">
              <span className="font-bold text-bakery-brown flex items-center gap-1">
                <AlertCircle size={14} className="text-rose-500" /> Allergen Information
              </span>
              <p className="text-bakery-warmBrown/80">{product.allergens || 'Contains Gluten & Dairy'}</p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-100">
            <div>
              <span className="text-xs text-bakery-warmBrown font-medium block">Total Price</span>
              <span className={`text-2xl font-bold ${product.isAvailable !== false ? 'text-bakery-brown' : 'text-slate-400 line-through'}`}>
                {formatPrice(variant.price)}
              </span>
            </div>

            {product.isAvailable === false ? (
              <button
                disabled
                className="bg-slate-200 text-slate-500 font-bold text-sm px-6 py-3 rounded-full cursor-not-allowed border border-slate-300"
              >
                Currently Out of Stock
              </button>
            ) : qty === 0 ? (
              <button
                onClick={() => addItem(product, variant)}
                className="btn-primary flex items-center gap-2 text-sm px-6 py-3"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-bakery-brown rounded-full px-2 py-1.5 shadow-md">
                <button
                  onClick={() => decrement(`${product.id}-${variant.label}`)}
                  className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition"
                >
                  <Minus size={14} />
                </button>
                <span className="text-white font-bold text-base w-6 text-center">{qty}</span>
                <button
                  onClick={() => increment(`${product.id}-${variant.label}`)}
                  className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
