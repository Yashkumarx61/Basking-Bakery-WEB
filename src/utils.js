import { STORE_CONFIG } from './data';

/**
 * Sanitize string input to prevent XSS and script injection attacks
 */
export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script tags
    .replace(/[<>&"'`]/g, (match) => {
      const map = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
      };
      return map[match] || match;
    });
}

/**
 * Validate image URL scheme for security
 */
export function validateImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim().toLowerCase();
  
  // Reject javascript: pseudo-protocol or HTML data URIs
  if (clean.startsWith('javascript:') || clean.startsWith('data:text/html')) {
    return false;
  }

  // Allow standard http/https or safe image data URIs
  const isHttpScheme = clean.startsWith('http://') || clean.startsWith('https://');
  const isImageDataUri = /^data:image\/(jpeg|jpg|png|webp|gif);base64,/i.test(clean);

  return isHttpScheme || isImageDataUri;
}

/**
 * Validate file upload type and max size (<= 2MB)
 */
export function validateImageFile(file) {
  if (!file) return { valid: false, error: 'No file selected.' };
  
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
    return { valid: false, error: 'Invalid file format. Please upload JPG, PNG, or WebP images.' };
  }

  const maxSizeBytes = 2 * 1024 * 1024; // 2 MB limit
  if (file.size > maxSizeBytes) {
    return { valid: false, error: 'File size exceeds 2MB limit. Please upload a smaller image.' };
  }

  return { valid: true };
}

/**
 * Format price safely in INR
 */
export function formatPrice(price) {
  const num = Number(price);
  if (isNaN(num) || !isFinite(num) || num < 0) {
    return '₹0';
  }
  return `₹${num.toLocaleString('en-IN')}`;
}

/**
 * Get direct WhatsApp link with optional pre-filled message
 */
export function getDirectWhatsAppURL(message = 'Hi Basking Bakery, I want to place an order.') {
  const cleanMsg = sanitizeInput(message);
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(cleanMsg)}`;
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
    let msgStr = item.customMessage ? ` [Msg: "${sanitizeInput(item.customMessage)}"]` : '';
    lines.push(
      `${idx + 1}. ${sanitizeInput(item.name)} (${sanitizeInput(item.variantLabel)})${msgStr} × ${item.quantity} = ₹${subtotal}`
    );
  });

  // Cross-sell Addons
  if (addons && addons.length > 0) {
    lines.push('');
    lines.push('✨ *Celebration Add-ons:*');
    addons.forEach((addon) => {
      lines.push(`• ${addon.image} ${sanitizeInput(addon.name)} = ₹${addon.price}`);
    });
  }

  lines.push('');
  lines.push(`💰 *Items Subtotal: ₹${totals.rawSubtotal}*`);

  // Delivery & Slot Info
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('📍 *Delivery Details:*');
  lines.push(`• Customer: ${sanitizeInput(customer.name)}`);
  lines.push(`• Phone: ${sanitizeInput(customer.phone) || 'Not specified'}`);
  lines.push(`• Order Mode: ${customer.deliveryType === 'delivery' ? '🚚 Home Delivery' : '🏪 Store Pickup'}`);
  lines.push(`• Location: ${sanitizeInput(location.name)} (${sanitizeInput(location.sector)})`);
  if (customer.deliveryType === 'delivery' && customer.address) {
    lines.push(`• Address: ${sanitizeInput(customer.address)}`);
  }
  lines.push(`• Slot: ⏰ ${sanitizeInput(slot.label)} (${sanitizeInput(slot.time)})`);
  lines.push(`• Delivery Charge: ${totals.deliveryFee === 0 ? 'FREE ✅' : `₹${totals.deliveryFee}`}`);
  if (totals.slotFee > 0) {
    lines.push(`• Slot Convenience Fee: ₹${totals.slotFee}`);
  }

  // Promo Discount
  if (promo && totals.discountAmount > 0) {
    lines.push(`🏷️ *Promo Applied:* ${sanitizeInput(promo.code)} (-₹${totals.discountAmount})`);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push(`🧾 *Grand Total: ₹${totals.grandTotal}*`);
  if (customer.paymentMethod) {
    lines.push(`💳 *Payment Preference:* ${sanitizeInput(customer.paymentMethod)}`);
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
  lines.push(`• Flavour: ${sanitizeInput(inquiry.flavour)}`);
  lines.push(`• Weight / Tier: ${sanitizeInput(inquiry.weight)}`);
  lines.push(`• Cake Style: ${sanitizeInput(inquiry.cakeType) || 'Regular Cream'}`);
  lines.push(`• Occasion: ${sanitizeInput(inquiry.occasion) || 'Not specified'}`);
  if (inquiry.inscription) {
    lines.push(`• Inscription: "${sanitizeInput(inquiry.inscription)}"`);
  }
  lines.push(`• Delivery Date: ${sanitizeInput(inquiry.deliveryDate) || 'Not specified'}`);
  if (inquiry.preferredSlot) {
    lines.push(`• Preferred Slot: ${sanitizeInput(inquiry.preferredSlot)}`);
  }
  if (inquiry.notes) {
    lines.push(`• Additional Notes: ${sanitizeInput(inquiry.notes)}`);
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
