import { createContext, useContext, useReducer, useCallback } from 'react';
import { serviceabilityData, validPromoCodes, deliverySlots } from './data';

const CartContext = createContext(null);

const defaultLocation = serviceabilityData.societies[0]; // Amrapali Zodiac
const defaultSlot = deliverySlots[1]; // Standard Evening

const initialState = {
  items: [],
  addons: [],
  isOpen: false,
  appliedPromo: null, // { code, discountAmount, description }
  promoError: '',
  selectedLocation: defaultLocation,
  selectedSlot: defaultSlot,
  pincodeModalOpen: false,
  productModalData: null, // Product object for Quick View
  orderSuccessData: null, // Completed order receipt object
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, customMessage } = action.payload;
      const key = `${product.id}-${variant.label}-${customMessage || ''}`;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            key,
            productId: product.id,
            name: product.name,
            image: product.image,
            variantLabel: variant.label,
            price: variant.price,
            quantity: 1,
            customMessage: customMessage || '',
            isEggless: product.isEggless,
          },
        ],
      };
    }
    case 'INCREMENT': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    case 'DECREMENT': {
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.key === action.payload ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };
    }
    case 'REMOVE': {
      return {
        ...state,
        items: state.items.filter((i) => i.key !== action.payload),
      };
    }
    case 'TOGGLE_ADDON': {
      const addon = action.payload;
      const exists = state.addons.some((a) => a.id === addon.id);
      if (exists) {
        return {
          ...state,
          addons: state.addons.filter((a) => a.id !== addon.id),
        };
      }
      return {
        ...state,
        addons: [...state.addons, addon],
      };
    }
    case 'APPLY_PROMO': {
      const code = action.payload.trim().toUpperCase();
      const match = validPromoCodes[code];
      if (!match) {
        return { ...state, promoError: 'Invalid promo code. Try ZODIACSOCIETY or FIRSTBAKE.' };
      }
      return {
        ...state,
        appliedPromo: { code, ...match },
        promoError: '',
      };
    }
    case 'REMOVE_PROMO': {
      return { ...state, appliedPromo: null, promoError: '' };
    }
    case 'SET_LOCATION': {
      return { ...state, selectedLocation: action.payload };
    }
    case 'SET_DELIVERY_SLOT': {
      return { ...state, selectedSlot: action.payload };
    }
    case 'CLEAR': {
      return {
        ...state,
        items: [],
        addons: [],
        appliedPromo: null,
        promoError: '',
      };
    }
    case 'TOGGLE_CART': {
      return { ...state, isOpen: !state.isOpen };
    }
    case 'OPEN_CART': {
      return { ...state, isOpen: true };
    }
    case 'CLOSE_CART': {
      return { ...state, isOpen: false };
    }
    case 'OPEN_PINCODE_MODAL': {
      return { ...state, pincodeModalOpen: true };
    }
    case 'CLOSE_PINCODE_MODAL': {
      return { ...state, pincodeModalOpen: false };
    }
    case 'OPEN_PRODUCT_MODAL': {
      return { ...state, productModalData: action.payload };
    }
    case 'CLOSE_PRODUCT_MODAL': {
      return { ...state, productModalData: null };
    }
    case 'SET_ORDER_SUCCESS': {
      return { ...state, orderSuccessData: action.payload, isOpen: false };
    }
    case 'CLOSE_ORDER_SUCCESS': {
      return { ...state, orderSuccessData: null };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((product, variant, customMessage = '') => {
    dispatch({ type: 'ADD_ITEM', payload: { product, variant, customMessage } });
  }, []);

  const increment = useCallback((key) => {
    dispatch({ type: 'INCREMENT', payload: key });
  }, []);

  const decrement = useCallback((key) => {
    dispatch({ type: 'DECREMENT', payload: key });
  }, []);

  const removeItem = useCallback((key) => {
    dispatch({ type: 'REMOVE', payload: key });
  }, []);

  const toggleAddon = useCallback((addon) => {
    dispatch({ type: 'TOGGLE_ADDON', payload: addon });
  }, []);

  const applyPromo = useCallback((code) => {
    dispatch({ type: 'APPLY_PROMO', payload: code });
  }, []);

  const removePromo = useCallback(() => {
    dispatch({ type: 'REMOVE_PROMO' });
  }, []);

  const setLocation = useCallback((loc) => {
    dispatch({ type: 'SET_LOCATION', payload: loc });
  }, []);

  const setDeliverySlot = useCallback((slot) => {
    dispatch({ type: 'SET_DELIVERY_SLOT', payload: slot });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  const openPincodeModal = useCallback(() => {
    dispatch({ type: 'OPEN_PINCODE_MODAL' });
  }, []);

  const closePincodeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_PINCODE_MODAL' });
  }, []);

  const openProductModal = useCallback((product) => {
    dispatch({ type: 'OPEN_PRODUCT_MODAL', payload: product });
  }, []);

  const closeProductModal = useCallback(() => {
    dispatch({ type: 'CLOSE_PRODUCT_MODAL' });
  }, []);

  const setOrderSuccess = useCallback((receipt) => {
    dispatch({ type: 'SET_ORDER_SUCCESS', payload: receipt });
  }, []);

  const closeOrderSuccess = useCallback(() => {
    dispatch({ type: 'CLOSE_ORDER_SUCCESS' });
  }, []);

  // Compute Item Totals
  const itemsSubtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const addonsSubtotal = state.addons.reduce((sum, a) => sum + a.price, 0);
  const rawSubtotal = itemsSubtotal + addonsSubtotal;

  // Delivery & Slot Fee
  const deliveryFee = state.selectedLocation ? state.selectedLocation.deliveryFee : 0;
  const slotFee = state.selectedSlot ? state.selectedSlot.fee : 0;

  // Discount computation
  let discountAmount = 0;
  if (state.appliedPromo && rawSubtotal > 0) {
    const promo = state.appliedPromo;
    if (promo.discountPercent) {
      discountAmount = Math.min(
        (rawSubtotal * promo.discountPercent) / 100,
        promo.maxDiscount || 9999
      );
    } else if (promo.discountAmount) {
      if (!promo.minOrder || rawSubtotal >= promo.minOrder) {
        discountAmount = promo.discountAmount;
      }
    }
  }

  const grandTotal = Math.max(0, rawSubtotal + deliveryFee + slotFee - discountAmount);
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const getItemQuantity = useCallback(
    (productId, variantLabel) => {
      const keyPrefix = `${productId}-${variantLabel}`;
      const item = state.items.find((i) => i.key.startsWith(keyPrefix));
      return item ? item.quantity : 0;
    },
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addons: state.addons,
        isOpen: state.isOpen,
        appliedPromo: state.appliedPromo,
        promoError: state.promoError,
        selectedLocation: state.selectedLocation,
        selectedSlot: state.selectedSlot,
        pincodeModalOpen: state.pincodeModalOpen,
        productModalData: state.productModalData,
        orderSuccessData: state.orderSuccessData,
        itemCount,
        itemsSubtotal,
        addonsSubtotal,
        rawSubtotal,
        deliveryFee,
        slotFee,
        discountAmount,
        grandTotal,
        addItem,
        increment,
        decrement,
        removeItem,
        toggleAddon,
        applyPromo,
        removePromo,
        setLocation,
        setDeliverySlot,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        openPincodeModal,
        closePincodeModal,
        openProductModal,
        closeProductModal,
        setOrderSuccess,
        closeOrderSuccess,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
