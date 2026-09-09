import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Leaf, Eye, Star } from 'lucide-react';
import { useCart } from '../CartContext';
import { formatPrice } from '../utils';

export default function ProductCard({ product }) {
  const { addItem, increment, decrement, getItemQuantity, openProductModal } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  const variant = product.variants[selectedVariantIdx] || product.variants[0];
  const qty = getItemQuantity(product.id, variant.label);

  return (
    <div className="group bg-white rounded-3xl card-shadow hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-amber-100/60">
      {/* Image & Badges */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => openProductModal(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 backdrop-blur-md text-[#2B1810] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <Eye size={14} /> Quick View
          </span>
        </div>

        {/* Dietary & Rating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.isVeg && (
            <span className="bg-[#2D6A4F] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />
              100% EGGLESS
            </span>
          )}
        </div>

        {product.bestSeller && (
          <span className="absolute top-3 right-3 bg-amber-400 text-[#2B1810] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            ⭐ BEST SELLER
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
            <Star size={13} className="fill-amber-500 text-amber-500" />
            <span>{product.rating || '4.8'}</span>
            <span className="text-bakery-warmBrown/60 font-normal">({product.reviewsCount || 40})</span>
          </div>
          <button
            onClick={() => openProductModal(product)}
            className="text-[11px] font-semibold text-[#8B6F47] hover:underline"
          >
            Details & Ingredients →
          </button>
        </div>

        <h3
          onClick={() => openProductModal(product)}
          className="font-display text-lg font-bold text-[#2B1810] leading-snug cursor-pointer hover:text-[#8B6F47] transition-colors"
        >
          {product.name}
        </h3>
        <p className="text-xs text-[#8B6F47]/80 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Variant Selectors */}
        {product.variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.variants.map((v, idx) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setSelectedVariantIdx(idx)}
                className={`text-[11px] px-3 py-1 rounded-full border font-medium transition-all ${
                  idx === selectedVariantIdx
                    ? 'bg-[#5C3D2E] text-white border-[#5C3D2E] shadow-sm'
                    : 'bg-bakery-cream/30 border-amber-200 text-[#8B6F47] hover:border-[#5C3D2E]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add to Cart Stepper */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-amber-100/60">
          <div>
            <span className="text-xs text-bakery-warmBrown block text-[10px]">Price</span>
            <span className="text-xl font-bold text-[#2B1810]">
              {formatPrice(variant.price)}
            </span>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => addItem(product, variant)}
              className="flex items-center gap-1.5 bg-[#5C3D2E] hover:bg-[#8B6F47] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-md active:scale-95"
            >
              <ShoppingCart size={14} />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-[#5C3D2E] rounded-full px-1.5 py-1 shadow-md">
              <button
                onClick={() => decrement(`${product.id}-${variant.label}`)}
                className="w-7 h-7 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <Minus size={13} />
              </button>
              <span className="text-white font-bold text-xs w-4 text-center">
                {qty}
              </span>
              <button
                onClick={() => increment(`${product.id}-${variant.label}`)}
                className="w-7 h-7 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
