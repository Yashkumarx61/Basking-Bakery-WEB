import { CheckCircle2, MessageCircle, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';
import { formatPrice } from '../utils';

export default function OrderSuccessModal() {
  const { orderSuccessData, closeOrderSuccess } = useCart();

  if (!orderSuccessData) return null;

  const { orderId, items, customer, location, slot, totals, whatsappUrl } = orderSuccessData;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 overlay backdrop-blur-sm"
        onClick={closeOrderSuccess}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[500px] bg-white rounded-3xl z-50 shadow-2xl p-6 sm:p-8 animate-fade-in border border-emerald-100 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 animate-bounce-subtle">
          <CheckCircle2 size={36} />
        </div>

        <h3 className="font-display text-2xl font-bold text-bakery-brown">
          Order Placed Successfully!
        </h3>
        <p className="text-xs text-bakery-warmBrown mt-1">
          Order ID: <strong className="font-mono text-bakery-brown">#{orderId}</strong>
        </p>

        {/* Receipt Box */}
        <div className="bg-bakery-cream/50 rounded-2xl p-4 my-5 text-left text-xs space-y-2 border border-bakery-lightGold/50">
          <div className="flex justify-between border-b border-bakery-gold/20 pb-2">
            <span className="font-semibold text-bakery-brown">Customer</span>
            <span>{customer.name} ({location.name})</span>
          </div>
          <div className="flex justify-between border-b border-bakery-gold/20 pb-2">
            <span className="font-semibold text-bakery-brown">Delivery Slot</span>
            <span>{slot.label} ({slot.time})</span>
          </div>
          <div className="flex justify-between font-bold text-bakery-brown pt-1 text-sm">
            <span>Total Payable</span>
            <span>{formatPrice(totals.grandTotal)}</span>
          </div>
        </div>

        <p className="text-xs text-bakery-warmBrown/90 mb-6 leading-relaxed">
          We have initiated preparation! Send your order summary to our WhatsApp counter to receive instant live tracking updates.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeOrderSuccess}
            className="btn-whatsapp w-full flex items-center justify-center gap-2 py-3.5 text-sm"
          >
            <MessageCircle size={18} /> Send Order & Track on WhatsApp
          </a>

          <button
            onClick={closeOrderSuccess}
            className="w-full text-xs text-bakery-warmBrown hover:text-bakery-brown py-2 font-medium"
          >
            Close Receipt & Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
