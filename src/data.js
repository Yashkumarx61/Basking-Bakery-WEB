// Configurable Store Metadata & Social Links
export const STORE_CONFIG = {
  name: 'Basking Bakery',
  tagline: 'Artisan Bakes & Custom Event Cakes',
  whatsappNumber: '919311267246',
  phoneDisplay: '+91 93112 67246',
  address: 'Shop 14, Amrapali Zodiac Market, Sector 120, Noida, UP 201301',
  hours: '8:00 AM – 10:00 PM (Every day)',
  fssaiLic: '22722120000123',
  instagramUrl: 'https://www.instagram.com/basking_bakery8285?stkn=NW9nc3R0ZnpxeWl4',
  googleReviewsUrl: 'https://www.google.com/search?q=Basking+Bakery+Amrapali+Zodiac+Sector+120+Noida#mpd=~reviews',
};

// Legacy exports for backwards compatibility
export const WHATSAPP_NUMBER = STORE_CONFIG.whatsappNumber;
export const INSTAGRAM_URL = STORE_CONFIG.instagramUrl;
export const GOOGLE_REVIEWS_URL = STORE_CONFIG.googleReviewsUrl;

// Pincode & Society Serviceability Database
export const serviceabilityData = {
  societies: [
    { name: 'Amrapali Zodiac', sector: 'Sector 120', pincode: '201301', sla: '⚡ 45–60 Min Express Delivery', deliveryFee: 0, isFree: true },
    { name: 'Supertech Capetown', sector: 'Sector 74', pincode: '201301', sla: '⚡ 45–60 Min Express Delivery', deliveryFee: 0, isFree: true },
    { name: 'Prateek Laurel', sector: 'Sector 120', pincode: '201301', sla: '⚡ 60–90 Min Delivery', deliveryFee: 0, isFree: true },
    { name: 'RG Residency', sector: 'Sector 120', pincode: '201301', sla: '⚡ 60–90 Min Delivery', deliveryFee: 0, isFree: true },
    { name: 'Sector 119', sector: 'Sector 119', pincode: '201301', sla: '⚡ 60–90 Min Delivery', deliveryFee: 29, isFree: false },
    { name: 'Sector 120', sector: 'Sector 120', pincode: '201301', sla: '⚡ 45–60 Min Delivery', deliveryFee: 0, isFree: true },
    { name: 'Sector 122', sector: 'Sector 122', pincode: '201301', sla: '🚚 90–120 Min Delivery', deliveryFee: 39, isFree: false },
    { name: 'Sector 76 / 77', sector: 'Sector 76', pincode: '201304', sla: '🚚 90–120 Min Delivery', deliveryFee: 49, isFree: false },
    { name: 'Store Pickup', sector: 'Sector 120 Market', pincode: '201301', sla: 'READY IN 30 MINS', deliveryFee: 0, isFree: true },
  ],
  validPincodes: ['201301', '201304', '201307'],
};

// Categories
export const categories = [
  { id: 'all', label: 'All Items' },
  { id: 'signature-cakes', label: 'Signature Cakes' },
  { id: 'pastries-tarts', label: 'Pastries & Tarts' },
  { id: 'dry-cakes-breads', label: 'Dry Cakes & Breads' },
  { id: 'savouries', label: 'Savouries' },
  { id: 'custom-orders', label: 'Custom Cakes' },
];

// Rich Product Catalog with Ingredients & Allergens
export const products = [
  {
    id: 1,
    name: 'Belgian Dark Truffle Cake',
    category: 'signature-cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Decadent dark chocolate layers enveloped in 55% Belgian cocoa ganache and glossy glaze.',
    ingredients: 'Dark Belgian Chocolate, Pure Butter, Cream, Wheat Flour, Cocoa Powder, Vanilla Extract',
    shelfLife: '48 hours when refrigerated at 4°C',
    allergens: 'Contains Gluten & Milk Products',
    storage: 'Keep chilled. Serve slightly at room temperature for maximum flavor.',
    variants: [
      { label: '0.5 kg', price: 499 },
      { label: '1.0 kg', price: 929 },
      { label: '2.0 kg', price: 1799 },
    ],
    bestSeller: true,
  },
  {
    id: 2,
    name: 'Butterscotch Caramel Crunch',
    category: 'signature-cakes',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.8,
    reviewsCount: 98,
    description: 'Golden buttery sponge layers with homemade caramel drizzle and crunchy almond praline.',
    ingredients: 'Butterscotch Custard, Roasted Almond Praline, Caramel Sauce, Whipped Cream, Wheat Flour',
    shelfLife: '48 hours under refrigeration',
    allergens: 'Contains Gluten, Dairy & Tree Nuts (Almonds)',
    storage: 'Store chilled between 2°C–5°C.',
    variants: [
      { label: '0.5 kg', price: 469 },
      { label: '1.0 kg', price: 879 },
      { label: '2.0 kg', price: 1649 },
    ],
    bestSeller: true,
  },
  {
    id: 3,
    name: 'Velvet Cream Cheese Cake',
    category: 'signature-cakes',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.9,
    reviewsCount: 116,
    description: 'Silk crimson sponge layers infused with cocoa, paired with smooth whipped cream cheese frost.',
    ingredients: 'Cream Cheese, Cocoa, Natural Red Beet Extract, Wheat Flour, Butter, Vanilla Pods',
    shelfLife: '36 hours under refrigeration',
    allergens: 'Contains Milk Solids & Wheat Gluten',
    storage: 'Refrigerate immediately upon delivery.',
    variants: [
      { label: '0.5 kg', price: 549 },
      { label: '1.0 kg', price: 999 },
      { label: '2.0 kg', price: 1899 },
    ],
    bestSeller: true,
  },
  {
    id: 4,
    name: 'Fresh Pineapple Whipped Cake',
    category: 'signature-cakes',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.7,
    reviewsCount: 84,
    description: 'Light vanilla cloud sponge layered with hand-chopped fresh pineapple chunks & cherries.',
    ingredients: 'Fresh Pineapple Compote, Light Vanilla Cream, Vanilla Sponge, Maraschino Cherries',
    shelfLife: '24 hours under refrigeration',
    allergens: 'Contains Milk & Gluten',
    storage: 'Keep refrigerated; consume fresh.',
    variants: [
      { label: '0.5 kg', price: 439 },
      { label: '1.0 kg', price: 819 },
      { label: '2.0 kg', price: 1549 },
    ],
    bestSeller: false,
  },
  {
    id: 5,
    name: 'Nutella Ferrero Rocher Pastry',
    category: 'pastries-tarts',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.9,
    reviewsCount: 76,
    description: 'Rich hazelnut Nutella mousse layered with crushed Ferrero Rocher & dark chocolate ganache.',
    ingredients: 'Nutella Spread, Roasted Hazelnuts, Cocoa Mousse, Wafer Crust',
    shelfLife: '48 hours chilled',
    allergens: 'Contains Hazelnuts, Soy & Dairy',
    storage: 'Store chilled in original container.',
    variants: [
      { label: '1 Slice', price: 119 },
      { label: 'Pack of 2', price: 219 },
    ],
    bestSeller: true,
  },
  {
    id: 6,
    name: 'New York Blueberry Cheesecake Slice',
    category: 'pastries-tarts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    isEggless: false,
    isVeg: true,
    rating: 4.8,
    reviewsCount: 62,
    description: 'Slow-baked dense cream cheese on a graham cracker crust topped with wild blueberry glaze.',
    ingredients: 'Philadelphia Cream Cheese, Wild Blueberry Compote, Digestives Crust, Sour Cream',
    shelfLife: '72 hours chilled',
    allergens: 'Contains Milk, Wheat & Eggs',
    storage: 'Keep cold at 2°C–4°C.',
    variants: [
      { label: '1 Slice', price: 149 },
      { label: 'Pack of 2', price: 279 },
    ],
    bestSeller: false,
  },
  {
    id: 7,
    name: 'Gourmet Vanilla Bean Cupcakes',
    category: 'pastries-tarts',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.7,
    reviewsCount: 51,
    description: 'Moist Madagascar vanilla cupcakes with fluffy buttercream swirls and rainbow sugar pearls.',
    ingredients: 'Madagascar Vanilla Pods, Farm Butter, Cake Flour, Sugar Sprinkles',
    shelfLife: '48 hours at cool room temperature',
    allergens: 'Contains Dairy & Wheat Gluten',
    storage: 'Keep in an airtight container.',
    variants: [
      { label: 'Box of 6', price: 369 },
      { label: 'Box of 12', price: 699 },
    ],
    bestSeller: false,
  },
  {
    id: 8,
    name: 'Artisan Whole Wheat Multigrain Loaf',
    category: 'dry-cakes-breads',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.9,
    reviewsCount: 104,
    description: 'Slow-fermented 100% whole wheat bread loaded with flaxseeds, sunflower seeds & oats.',
    ingredients: 'Stone-ground Whole Wheat, Flaxseeds, Chia Seeds, Sunflower Seeds, Rolled Oats, Honey',
    shelfLife: '4 days at room temperature',
    allergens: 'Contains Seeds & Wheat Gluten',
    storage: 'Store in a cool dry place away from sunlight.',
    variants: [
      { label: '400g Loaf', price: 89 },
    ],
    bestSeller: true,
  },
  {
    id: 9,
    name: 'Gur & Dry Fruit Cake (Sugar-Free)',
    category: 'dry-cakes-breads',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.8,
    reviewsCount: 43,
    description: 'Wholesome organic jaggery cake loaded with cashews, raisins, and aromatic green cardamom.',
    ingredients: 'Organic Organic Jaggery (Gur), Whole Wheat Flour, Cow Ghee, Cashews, Almonds, Cardamom',
    shelfLife: '10 days room temp',
    allergens: 'Contains Tree Nuts & Dairy Ghee',
    storage: 'Store in an airtight jar.',
    variants: [
      { label: '350g Slice Box', price: 249 },
      { label: '700g Family Pack', price: 469 },
    ],
    bestSeller: false,
  },
  {
    id: 10,
    name: 'Flaky Paneer Tikka Puff',
    category: 'savouries',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.9,
    reviewsCount: 158,
    description: 'Multilayer golden puff pastry stuffed with tandoori spiced cottage cheese & capsicum.',
    ingredients: 'Fresh Paneer (Cottage Cheese), Tandoori Spices, Butter Pastry Dough, Bell Peppers',
    shelfLife: 'Consume same day',
    allergens: 'Contains Dairy & Wheat',
    storage: 'Reheat in oven/air-fryer for 2 mins for maximum crispiness.',
    variants: [
      { label: '1 pc', price: 45 },
      { label: 'Pack of 4', price: 160 },
    ],
    bestSeller: true,
  },
  {
    id: 11,
    name: 'Grilled Cheese & Corn Sandwich',
    category: 'savouries',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.6,
    reviewsCount: 39,
    description: 'Herb-butter grilled sourdough stuffed with sweet corn, mozzarella & sharp cheddar cheese.',
    ingredients: 'Sourdough Bread, Mozzarella Cheese, Sweet Corn, Oregano Butter, Bell Peppers',
    shelfLife: 'Best eaten warm',
    allergens: 'Contains Dairy & Wheat Gluten',
    storage: 'Consume immediately.',
    variants: [
      { label: '1 Sandwich', price: 95 },
    ],
    bestSeller: false,
  },
  {
    id: 12,
    name: 'Herb Garlic Butter Sticks',
    category: 'savouries',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80',
    isEggless: true,
    isVeg: true,
    rating: 4.7,
    reviewsCount: 71,
    description: 'Crispy twice-baked bread sticks glazed with roasted garlic butter and Italian herbs.',
    ingredients: 'Refined Flour, Garlic Powder, Parsley, Pure Butter, Sea Salt',
    shelfLife: '14 days in dry jar',
    allergens: 'Contains Dairy & Wheat',
    storage: 'Keep container tightly sealed.',
    variants: [
      { label: 'Pack of 6', price: 109 },
    ],
    bestSeller: false,
  },
];

// Smart Cross-Sell Celebration Add-ons
export const crossSellAddons = [
  { id: 'c1', name: 'Sparkling Candle Pack', price: 49, image: '🎆', desc: 'Adds magical sparkle to your cake cutting' },
  { id: 'c2', name: 'Wooden Cutlery & Plate Set', price: 29, image: '🍴', desc: 'Eco-friendly biodegradable set for 5' },
  { id: 'c3', name: 'Golden Happy Birthday Topper', price: 79, image: '👑', desc: 'Acrylic metallic golden crown topper' },
  { id: 'c4', name: 'Handwritten Greeting Card', price: 59, image: '💌', desc: 'Custom message handwritten inside a designer card' },
  { id: 'c5', name: 'Celebration Metallic Balloons (10 pcs)', price: 99, image: '🎈', desc: 'Assorted helium-grade metallic balloons' },
];

// Custom Cake Flavour Tiles with Icons
export const customCakeFlavours = [
  { id: 'f1', name: 'Belgian Dark Truffle', desc: 'Rich 55% cocoa dark chocolate ganache', color: 'from-amber-900 to-amber-950', tag: 'Most Popular' },
  { id: 'f2', name: 'Butterscotch Crunch', desc: 'Caramel sponge with almond praline', color: 'from-amber-600 to-yellow-700', tag: 'Classic' },
  { id: 'f3', name: 'Crimson Red Velvet', desc: 'Silky red sponge with cream cheese', color: 'from-rose-800 to-red-900', tag: 'Trending' },
  { id: 'f4', name: 'Fresh Exotic Fruit', desc: 'Whipped vanilla cream with kiwi & berries', color: 'from-emerald-700 to-green-800', tag: 'Light & Fresh' },
  { id: 'f5', name: 'Black Forest Royale', desc: 'Dark chocolate with sour cherry compote', color: 'from-neutral-800 to-red-950', tag: 'Classic' },
  { id: 'f6', name: 'Alphonso Mango Mousse', desc: 'Seasonal fresh mango pulp mousse', color: 'from-amber-500 to-orange-600', tag: 'Seasonal' },
];

export const customCakeTypes = [
  { id: 't1', name: 'Regular Cream Design', badge: 'Standard Pricing', priceMultiplier: 1.0 },
  { id: 't2', name: 'Photo Print Cake', badge: '+ ₹200 for Edible Sheet', priceMultiplier: 1.15 },
  { id: 't3', name: '3D Theme Fondant Cake', badge: '+ ₹400 for Sculpted Fondant', priceMultiplier: 1.35 },
];

// Delivery Slots
export const deliverySlots = [
  { id: 'slot-morning', label: 'Morning Slot', time: '9:00 AM – 1:00 PM', fee: 0, badge: 'Free Delivery' },
  { id: 'slot-evening', label: 'Standard Evening Slot', time: '4:00 PM – 8:00 PM', fee: 0, badge: 'Free Delivery' },
  { id: 'slot-midnight', label: 'Midnight Surprise', time: '11:00 PM – 12:00 AM', fee: 150, badge: 'Special Slot' },
];

// Promo Codes
export const validPromoCodes = {
  'ZODIACSOCIETY': { discountPercent: 10, maxDiscount: 150, description: '10% OFF for Zodiac & Capetown Residents' },
  'FIRSTBAKE': { discountAmount: 50, minOrder: 300, description: 'Flat ₹50 OFF on orders above ₹300' },
  'WELCOME10': { discountPercent: 10, maxDiscount: 100, description: '10% Welcome Discount on your first bake' },
};

export const cakeWeights = ['1.0 kg', '1.5 kg', '2.0 kg', '3.0 kg', '5.0+ kg'];
export const cakeFlavors = customCakeFlavours.map((f) => f.name);
