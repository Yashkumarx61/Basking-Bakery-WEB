import { STORE_CONFIG } from './data';

/**
 * Get direct WhatsApp link with optional pre-filled message
 */
export function getDirectWhatsAppURL(message = 'Hi Basking Bakery, I want to place an order.') {
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Format cart items, cross-sells, delivery slot & customer info into a structured WhatsApp order message
 */
export function buildOrderWhatsAppURL(cart, addons, customer, location, slot, totals, promo) {
  const lines = [];
  lines.push('🧁 *NEW ORDER — Basking Bakery*');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  // Order Items
  lines.push('📋 *Order Items:*');
  cart.forEach((item, idx) => {
    const subtotal = item.price * item.quantity;
    let msgStr = item.customMessage ? ` [Msg: "${item.customMessage}"]` : '';
    lines.push(
      `${idx + 1}. ${item.name} (${item.variantLabel})${msgStr} × ${item.quantity} = ₹${subtotal}`
    );
  });

  // Cross-sell Addons
  if (addons && addons.length > 0) {
    lines.push('');
    lines.push('✨ *Celebration Add-ons:*');
    addons.forEach((addon) => {
      lines.push(`• ${addon.image} ${addon.name} = ₹${addon.price}`);
    });
  }

  lines.push('');
  lines.push(`💰 *Items Subtotal: ₹${totals.rawSubtotal}*`);

  // Delivery & Slot Info
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('📍 *Delivery Details:*');
  lines.push(`• Customer: ${customer.name}`);
  lines.push(`• Phone: ${customer.phone || 'Not specified'}`);
  lines.push(`• Order Mode: ${customer.deliveryType === 'delivery' ? '🚚 Home Delivery' : '🏪 Store Pickup'}`);
  lines.push(`• Location: ${location.name} (${location.sector})`);
  if (customer.deliveryType === 'delivery' && customer.address) {
    lines.push(`• Address: ${customer.address}`);
  }
  lines.push(`• Slot: ⏰ ${slot.label} (${slot.time})`);
  lines.push(`• Delivery Charge: ${totals.deliveryFee === 0 ? 'FREE ✅' : `₹${totals.deliveryFee}`}`);
  if (totals.slotFee > 0) {
    lines.push(`• Slot Convenience Fee: ₹${totals.slotFee}`);
  }

  // Promo Discount
  if (promo && totals.discountAmount > 0) {
    lines.push(`🏷️ *Promo Applied:* ${promo.code} (-₹${totals.discountAmount})`);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push(`🧾 *Grand Total: ₹${totals.grandTotal}*`);
  if (customer.paymentMethod) {
    lines.push(`💳 *Payment Preference:* ${customer.paymentMethod}`);
  }
  lines.push('');
  lines.push('_Sent via basking-bakery.in_');

  const formattedMessage = lines.join('\n');
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
}

/**
 * Format custom cake inquiry into a WhatsApp message
 */
export function buildCustomCakeWhatsAppURL(inquiry) {
  const lines = [];
  lines.push('🎂 *CUSTOM CAKE INQUIRY — Basking Bakery*');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('📋 *Cake Details:*');
  lines.push(`• Flavour: ${inquiry.flavour}`);
  lines.push(`• Weight / Tier: ${inquiry.weight}`);
  lines.push(`• Cake Style: ${inquiry.cakeType || 'Regular Cream'}`);
  lines.push(`• Occasion: ${inquiry.occasion || 'Not specified'}`);
  if (inquiry.inscription) {
    lines.push(`• Inscription: "${inquiry.inscription}"`);
  }
  lines.push(`• Delivery Date: ${inquiry.deliveryDate || 'Not specified'}`);
  if (inquiry.preferredSlot) {
    lines.push(`• Preferred Slot: ${inquiry.preferredSlot}`);
  }
  if (inquiry.notes) {
    lines.push(`• Additional Notes: ${inquiry.notes}`);
  }
  if (inquiry.hasPhoto) {
    lines.push('📸 *Reference Photo Attached in Chat*');
  }
  lines.push('');
  lines.push('📸 _Please attach your reference design photo to this chat if you have one._');
  lines.push('');
  lines.push('_Sent via basking-bakery.in_');

  const formattedMessage = lines.join('\n');
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
}

/**
 * Format price in INR
 */
export function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}
