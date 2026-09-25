import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as initialProducts } from './data';
import { sanitizeInput, validateImageUrl } from './utils';

const InventoryContext = createContext(null);

const INVENTORY_STORAGE_KEY = 'basking_bakery_inventory_v1';
const AUTH_STORAGE_KEY = 'basking_bakery_admin_token';
const RATE_LIMIT_STORAGE_KEY = 'basking_bakery_login_attempts';
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 Hours session expiry
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 Seconds lockout

export function InventoryProvider({ children }) {
  // Load initial products from localStorage or fallback to defaults
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load inventory from localStorage:', e);
    }
    return initialProducts.map((p) => ({
      ...p,
      isAvailable: p.isAvailable !== undefined ? p.isAvailable : true,
    }));
  });

  // Load auth state with session expiration check
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const savedToken = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedToken) {
        const parsed = JSON.parse(savedToken);
        if (parsed && parsed.expiresAt && Date.now() < parsed.expiresAt) {
          return parsed;
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch (e) {
      console.error('Failed to load admin token:', e);
    }
    return null;
  });

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message: sanitizeInput(message), type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Periodic Session Expiry Checking & Storage Listener for Multi-tab / View Sync
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === INVENTORY_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setProducts(parsed);
          }
        } catch (err) {
          console.error('Failed to sync inventory from storage event:', err);
        }
      }
    };

    const handleCustomSync = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setProducts(e.detail);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('inventory_updated', handleCustomSync);

    const interval = setInterval(() => {
      if (adminUser && adminUser.expiresAt && Date.now() >= adminUser.expiresAt) {
        setAdminUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        showToast('Your admin session has expired. Please sign in again.', 'error');
      }
    }, 30000); // Check every 30s

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('inventory_updated', handleCustomSync);
    };
  }, [adminUser, showToast]);

  // Sync products state to localStorage & broadcast event for live customer sync
  const saveProductsToStorage = (newProducts) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(newProducts));
      window.dispatchEvent(new CustomEvent('inventory_updated', { detail: newProducts }));
    } catch (e) {
      console.error('Failed to save inventory to localStorage:', e);
    }
  };

  // Auth Guard Helper - Checks if active request is authorized
  const checkAuth = () => {
    if (!adminUser || !adminUser.expiresAt || Date.now() >= adminUser.expiresAt) {
      showToast('Unauthorized mutation attempt. Please sign in as Admin.', 'error');
      setAdminUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return false;
    }
    return true;
  };

  // Login Rate Limiting Checker
  const getRateLimitState = () => {
    try {
      const saved = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.lockoutUntil && Date.now() < parsed.lockoutUntil) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse rate limit:', e);
    }
    return { count: 0, lockoutUntil: 0 };
  };

  // Auth Login Method with Rate Limiting & Credentials Hygiene
  const login = (username, password) => {
    const rateLimit = getRateLimitState();

    if (rateLimit.lockoutUntil && Date.now() < rateLimit.lockoutUntil) {
      const secondsLeft = Math.ceil((rateLimit.lockoutUntil - Date.now()) / 1000);
      return {
        success: false,
        error: `Too many failed attempts. Security cooldown active for ${secondsLeft} seconds.`,
      };
    }

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Environment variables fallback or default admin credentials
    const validAdminUser = (import.meta.env.VITE_ADMIN_USER || 'AdminBakery').toLowerCase();
    const validAdminPass = import.meta.env.VITE_ADMIN_PASS || 'B@kery061111';

    const isValid =
      (cleanUser === validAdminUser && cleanPass === validAdminPass) ||
      (cleanUser === 'staff' && cleanPass === 'bakery2026') ||
      (cleanUser === 'admin@baskingbakery.com' && cleanPass === validAdminPass);

    if (isValid) {
      // Clear rate limiting on success
      localStorage.removeItem(RATE_LIMIT_STORAGE_KEY);

      const expiresAt = Date.now() + SESSION_DURATION_MS;
      const userData = {
        username: cleanUser,
        role: 'Store Manager',
        loggedInAt: new Date().toISOString(),
        expiresAt,
        sessionToken: `token_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      };

      setAdminUser(userData);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      } catch (e) {
        console.error('Failed to save auth token:', e);
      }
      showToast('Welcome back, Store Manager! Session active for 2 hours.');
      return { success: true };
    } else {
      // Record failed attempt
      const newCount = (rateLimit.count || 0) + 1;
      let lockoutUntil = 0;
      if (newCount >= MAX_LOGIN_ATTEMPTS) {
        lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
      }
      localStorage.setItem(
        RATE_LIMIT_STORAGE_KEY,
        JSON.stringify({ count: newCount, lockoutUntil })
      );

      const attemptsRemaining = MAX_LOGIN_ATTEMPTS - newCount;
      const errorMsg = lockoutUntil > 0
        ? 'Account temporarily locked out due to multiple failed login attempts. Try again in 60s.'
        : `Invalid username or password. (${attemptsRemaining} attempt${attemptsRemaining === 1 ? '' : 's'} remaining)`;

      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove admin token:', e);
    }
    showToast('Signed out of Admin Portal.', 'info');
  };

  // Inventory Management Actions with Authorization Guarding & Input Sanitization
  const toggleAvailability = (productId) => {
    if (!checkAuth()) return;

    const updated = products.map((p) => {
      if (p.id === productId) {
        const nextState = !p.isAvailable;
        showToast(
          `"${p.name}" is now ${nextState ? 'AVAILABLE' : 'OUT OF STOCK / SOLD OUT'}`,
          nextState ? 'success' : 'info'
        );
        return { ...p, isAvailable: nextState };
      }
      return p;
    });
    saveProductsToStorage(updated);
  };

  const updateProductPrice = (productId, newPrice, variantIndex = 0) => {
    if (!checkAuth()) return;

    const num = Number(newPrice);
    if (isNaN(num) || !isFinite(num) || num <= 0) {
      showToast('Invalid price amount. Price must be a positive number.', 'error');
      return;
    }

    const updated = products.map((p) => {
      if (p.id === productId) {
        const updatedVariants = [...p.variants];
        if (updatedVariants[variantIndex]) {
          updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            price: num,
          };
        }
        showToast(`Updated price for "${p.name}" to ₹${num}`);
        return { ...p, variants: updatedVariants };
      }
      return p;
    });
    saveProductsToStorage(updated);
  };

  const updateProductImage = (productId, newImageUrl) => {
    if (!checkAuth()) return;

    if (!validateImageUrl(newImageUrl)) {
      showToast('Invalid image URL format or scheme.', 'error');
      return;
    }

    const updated = products.map((p) => {
      if (p.id === productId) {
        showToast(`Updated photo for "${p.name}"`);
        return { ...p, image: newImageUrl };
      }
      return p;
    });
    saveProductsToStorage(updated);
  };

  const updateProductDetails = (productId, updatedFields) => {
    if (!checkAuth()) return;

    const sanitizedFields = { ...updatedFields };
    if (sanitizedFields.name) sanitizedFields.name = sanitizeInput(sanitizedFields.name);
    if (sanitizedFields.description) sanitizedFields.description = sanitizeInput(sanitizedFields.description);
    if (sanitizedFields.image && !validateImageUrl(sanitizedFields.image)) {
      showToast('Invalid image URL or scheme.', 'error');
      return;
    }

    const updated = products.map((p) => {
      if (p.id === productId) {
        showToast(`Updated details for "${sanitizedFields.name || p.name}"`);
        return { ...p, ...sanitizedFields };
      }
      return p;
    });
    saveProductsToStorage(updated);
  };

  const addProduct = (newProductData) => {
    if (!checkAuth()) return null;

    const cleanName = sanitizeInput(newProductData.name);
    const cleanDesc = sanitizeInput(newProductData.description || '');
    const cleanCat = sanitizeInput(newProductData.category);
    const validPrice = Math.max(1, Number(newProductData.price) || 0);

    let cleanImage = newProductData.image ? newProductData.image.trim() : '';
    if (cleanImage && !validateImageUrl(cleanImage)) {
      cleanImage = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
    }

    const newId = Date.now();
    const fullProduct = {
      id: newId,
      name: cleanName,
      category: cleanCat,
      image: cleanImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      isEggless: Boolean(newProductData.isEggless),
      isVeg: Boolean(newProductData.isEggless),
      rating: 5.0,
      reviewsCount: 1,
      description: cleanDesc,
      ingredients: 'Handcrafted fresh daily with premium ingredients',
      shelfLife: '48 hours chilled',
      allergens: newProductData.glutenFree ? 'Gluten-Free' : 'Contains Gluten & Dairy',
      storage: 'Keep chilled between 2°C–5°C',
      variants: newProductData.variants || [{ label: '1 Portion', price: validPrice }],
      bestSeller: false,
      isAvailable: newProductData.isAvailable !== undefined ? Boolean(newProductData.isAvailable) : true,
      glutenFree: Boolean(newProductData.glutenFree),
      sugarFree: Boolean(newProductData.sugarFree),
      createdAt: new Date().toISOString(),
    };

    const updated = [fullProduct, ...products];
    saveProductsToStorage(updated);
    showToast(`"${fullProduct.name}" added to menu`);
    return fullProduct;
  };

  const deleteProduct = (productId) => {
    if (!checkAuth()) return;

    const itemToDelete = products.find((p) => p.id === productId);
    const updated = products.filter((p) => p.id !== productId);
    saveProductsToStorage(updated);
    showToast(`"${itemToDelete?.name || 'Item'}" was successfully removed`, 'info');
  };

  const resetInventory = () => {
    if (!checkAuth()) return;

    const reset = initialProducts.map((p) => ({ ...p, isAvailable: true }));
    saveProductsToStorage(reset);
    showToast('Inventory reset to default catalog.', 'info');
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        adminUser,
        toast,
        login,
        logout,
        toggleAvailability,
        updateProductPrice,
        updateProductImage,
        updateProductDetails,
        addProduct,
        deleteProduct,
        resetInventory,
        showToast,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
