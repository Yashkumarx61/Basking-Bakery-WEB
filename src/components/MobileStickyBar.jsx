import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';
import { formatPrice } from '../utils';

export default function MobileStickyBar() {
  const { itemCount, total, toggleCart } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-bakery-lightGold p-3 shadow-2xl animate-slide-up">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative bg-bakery-brown text-white p-2.5 rounded-full">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-amber-400 text-bakery-darkText text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </span>
          </div>
          <div>
            <p className="text-xs text-bakery-warmBrown font-medium">Total Amount</p>
            <p className="text-base font-bold text-bakery-brown">{formatPrice(total)}</p>
          </div>
        </div>

        <button
          onClick={toggleCart}
          className="btn-primary py-2.5 px-5 text-sm flex items-center gap-2"
        >
          View Cart
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
