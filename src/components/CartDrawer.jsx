import { useState } from 'react';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  MapPin,
  User,
  Home,
  Truck,
  Store,
  Tag,
  Clock,
  Sparkles,
  CheckCircle2,
  Phone,
  CreditCard,
  Check,
} from 'lucide-react';
import { useCart } from '../CartContext';
import { crossSellAddons, deliverySlots, serviceabilityData } from '../data';
import { formatPrice, buildOrderWhatsAppURL } from '../utils';

const initialCustomer = {
  name: '',
  phone: '',
  address: '',
  deliveryType: 'delivery',
  paymentMethod: 'Pay on Delivery (Cash / UPI QR)',
};

export default function CartDrawer() {
  const {
    items,
    addons,
    isOpen,
    closeCart,
    rawSubtotal,
    deliveryFee,
    slotFee,
    discountAmount,
    grandTotal,
    itemCount,
    increment,
    decrement,
    removeItem,
    toggleAddon,
    appliedPromo,
    promoError,
    applyPromo,
    removePromo,
    selectedLocation,
    setLocation,
    selectedSlot,
    setDeliverySlot,
    setOrderSuccess,
    clearCart,
  } = useCart();

  const [customer, setCustomer] = useState(initialCustomer);
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout'
  const [promoInput, setPromoInput] = useState('');

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleApplyPromoSubmit = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    applyPromo(promoInput);
  };

  const handleDirectCheckout = () => {
    if (!customer.name || !selectedLocation) return;

    const totals = { rawSubtotal, deliveryFee, slotFee, discountAmount, grandTotal };
    const whatsappUrl = buildOrderWhatsAppURL(
      items,
      addons,
      customer,
      selectedLocation,
      selectedSlot,
      totals,
      appliedPromo
    );

    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    const receipt = {
      orderId: randomId,
      items,
      addons,
      customer,
      location: selectedLocation,
      slot: selectedSlot,
      totals,
      whatsappUrl,
    };

    setOrderSuccess(receipt);
    clearCart();
  };

  const handleWhatsAppCheckout = () => {
    if (!customer.name || !selectedLocation) return;
    const totals = { rawSubtotal, deliveryFee, slotFee, discountAmount, grandTotal };
    const url = buildOrderWhatsAppURL(
      items,
      addons,
      customer,
      selectedLocation,
      selectedSlot,
      totals,
      appliedPromo
    );
    window.open(url, '_blank');
  };

  const canProceed = items.length > 0;
  const canSend = customer.name && selectedLocation;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 overlay backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#FAF7F2] z-50 shadow-2xl animate-slide-in-right flex flex-col border-l border-amber-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-amber-200/60 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-[#5C3D2E]">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-[#2B1810]">
                {step === 'cart' ? 'Your Cart Basket' : 'Express Delivery Details'}
              </h2>
              <p className="text-[11px] text-[#8B6F47]">
                Delivering to: <strong>{selectedLocation.name}</strong>
              </p>
            </div>
            {itemCount > 0 && (
              <span className="bg-[#5C3D2E] text-white text-xs font-bold px-2.5 py-0.5 rounded-full ml-1">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-amber-100/50 transition"
          >
            <X size={20} className="text-[#5C3D2E]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto cart-scroll p-4 sm:p-6 space-y-6">
          {step === 'cart' ? (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center my-12">
                  <div className="w-20 h-20 bg-amber-100/50 rounded-full flex items-center justify-center text-amber-300 mb-4">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#2B1810]">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-[#8B6F47] mt-1 max-w-xs">
                    Explore our artisan cakes, pastries & fresh daily bakes!
                  </p>
                  <button
                    onClick={closeCart}
                    className="btn-primary mt-6 text-sm"
                  >
                    Browse Bakery Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.key}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 flex gap-3.5"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-[#2B1810] truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-[#8B6F47]">
                            {item.variantLabel} · {formatPrice(item.price)} each
                          </p>
                          {item.customMessage && (
                            <p className="text-[10px] italic text-amber-900 bg-amber-50 px-2 py-0.5 rounded mt-1">
                              Msg: &quot;{item.customMessage}&quot;
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-full px-1.5 py-0.5 border border-amber-200">
                              <button
                                onClick={() => decrement(item.key)}
                                className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-[#5C3D2E] shadow-sm hover:scale-105"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-xs font-bold text-[#5C3D2E] w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increment(item.key)}
                                className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-[#5C3D2E] shadow-sm hover:scale-105"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="font-bold text-sm text-[#2B1810]">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeItem(item.key)}
                                className="p-1 text-rose-400 hover:text-rose-600 rounded transition"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Smart Cross-Sell Celebration Addons */}
                  <div className="pt-3 border-t border-amber-200/60">
                    <span className="text-xs font-bold text-[#2B1810] flex items-center gap-1.5 mb-2.5">
                      <Sparkles size={14} className="text-amber-600" /> Add a Celebration Touch
                    </span>
                    <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2">
                      {crossSellAddons.map((addon) => {
                        const isAdded = addons.some((a) => a.id === addon.id);
                        return (
                          <div
                            key={addon.id}
                            className={`shrink-0 w-40 bg-white p-3 rounded-2xl border transition-all ${
                              isAdded ? 'border-[#5C3D2E] bg-amber-50/50 shadow-md' : 'border-amber-100'
                            }`}
                          >
                            <span className="text-2xl block mb-1">{addon.image}</span>
                            <p className="font-bold text-xs text-[#2B1810] line-clamp-1">{addon.name}</p>
                            <p className="text-[11px] font-bold text-[#8B6F47] mt-0.5">{formatPrice(addon.price)}</p>
                            <button
                              type="button"
                              onClick={() => toggleAddon(addon)}
                              className={`mt-2 w-full py-1 rounded-full text-[10px] font-bold transition ${
                                isAdded
                                  ? 'bg-[#5C3D2E] text-white'
                                  : 'bg-amber-100 text-[#5C3D2E] hover:bg-amber-200'
                              }`}
                            >
                              {isAdded ? '✓ Added' : '+ Add'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Delivery Slot Selector */}
                  <div className="pt-3 border-t border-amber-200/60">
                    <span className="text-xs font-bold text-[#2B1810] flex items-center gap-1.5 mb-2">
                      <Clock size={14} className="text-amber-600" /> Select Delivery Time Slot
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {deliverySlots.map((slot) => {
                        const isSel = selectedSlot.id === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setDeliverySlot(slot)}
                            className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition ${
                              isSel
                                ? 'bg-[#5C3D2E] text-white border-[#5C3D2E] shadow-sm'
                                : 'bg-white text-[#2B1810] border-amber-100 hover:border-amber-300'
                            }`}
                          >
                            <div>
                              <p className="font-bold">{slot.label} ({slot.time})</p>
                              <p className={`text-[10px] ${isSel ? 'text-amber-200' : 'text-[#8B6F47]'}`}>{slot.badge}</p>
                            </div>
                            <span className="font-bold">
                              {slot.fee === 0 ? 'FREE' : `+ ₹${slot.fee}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="pt-3 border-t border-amber-200/60">
                    <span className="text-xs font-bold text-[#2B1810] flex items-center gap-1 mb-2">
                      <Tag size={14} className="text-amber-600" /> Apply Coupon Code
                    </span>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs">
                        <div>
                          <p className="font-bold text-emerald-800 flex items-center gap-1">
                            <Check size={14} /> Coupon {appliedPromo.code} Applied
                          </p>
                          <p className="text-[10px] text-emerald-700">{appliedPromo.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={removePromo}
                          className="text-xs font-bold text-rose-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromoSubmit} className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="e.g. ZODIACSOCIETY"
                          className="flex-1 uppercase text-xs px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                        <button type="submit" className="btn-primary text-xs py-2 px-4 shrink-0">
                          Apply
                        </button>
                      </form>
                    )}
                    {promoError && <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Checkout Step Form */
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#2B1810] flex items-center gap-1 mb-1">
                  <User size={13} /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#2B1810] flex items-center gap-1 mb-1">
                  <Phone size={13} /> Phone Number (For Order Updates) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  placeholder="e.g. 98765 43210"
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#2B1810] block mb-1">Order Fulfillment Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, deliveryType: 'delivery' })}
                    className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      customer.deliveryType === 'delivery'
                        ? 'bg-[#5C3D2E] text-white border-[#5C3D2E]'
                        : 'bg-white text-[#8B6F47] border-amber-200'
                    }`}
                  >
                    <Truck size={14} /> Home Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, deliveryType: 'pickup' })}
                    className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      customer.deliveryType === 'pickup'
                        ? 'bg-[#5C3D2E] text-white border-[#5C3D2E]'
                        : 'bg-white text-[#8B6F47] border-amber-200'
                    }`}
                  >
                    <Store size={14} /> Store Pickup
                  </button>
                </div>
              </div>

              {customer.deliveryType === 'delivery' && (
                <div>
                  <label className="font-bold text-[#2B1810] flex items-center gap-1 mb-1">
                    <Home size={13} /> Flat / Tower / House Details *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                    placeholder="e.g. Flat 302, Tower B, Amrapali Zodiac"
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-[#2B1810] flex items-center gap-1 mb-1">
                  <CreditCard size={13} /> Preferred Payment Mode
                </label>
                <select
                  name="paymentMethod"
                  value={customer.paymentMethod}
                  onChange={handleCustomerChange}
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="Pay on Delivery (Cash / UPI QR)">Pay on Delivery (Cash / UPI QR)</option>
                  <option value="Online UPI / NetBanking via WhatsApp Link">Online UPI via WhatsApp Counter</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Footer Pricing Calculation & Checkout CTAs */}
        {items.length > 0 && (
          <div className="border-t border-amber-200/60 bg-white px-6 py-4 space-y-3 shadow-lg">
            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#8B6F47]">
                <span>Items Subtotal ({itemCount} items)</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#8B6F47]">
                <span>Delivery Charge ({selectedLocation.name})</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(deliveryFee)}</span>
              </div>
              {slotFee > 0 && (
                <div className="flex justify-between text-[#8B6F47]">
                  <span>Slot Fee ({selectedSlot.label})</span>
                  <span>{formatPrice(slotFee)}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Discount ({appliedPromo?.code})</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#2B1810] pt-2 border-t border-amber-100">
                <span>Grand Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                disabled={!canProceed}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="space-y-2">
                {/* Primary Direct Order Trigger */}
                <button
                  onClick={handleDirectCheckout}
                  disabled={!canSend}
                  className={`btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm ${
                    !canSend ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <CheckCircle2 size={18} /> Instant Direct Checkout
                </button>

                {/* Fallback WhatsApp trigger */}
                <button
                  onClick={handleWhatsAppCheckout}
                  disabled={!canSend}
                  className={`btn-whatsapp w-full flex items-center justify-center gap-2 py-3 text-xs ${
                    !canSend ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <MessageCircle size={16} /> Send Order via WhatsApp
                </button>

                <button
                  onClick={() => setStep('cart')}
                  className="w-full text-xs text-[#8B6F47] hover:text-[#2B1810] py-1 text-center font-medium"
                >
                  ← Back to Cart Items
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
