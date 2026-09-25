import { useState, useEffect } from 'react';
import {
  LogOut,
  Search,
  Package,
  CheckCircle2,
  XCircle,
  Edit2,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Upload,
  X,
  Tag,
  Eye,
  Check,
  PlusCircle,
  Trash2,
  AlertTriangle,
  Leaf,
  Info,
} from 'lucide-react';
import { useInventory } from '../InventoryContext';
import { categories } from '../data';
import { formatPrice, validateImageFile, validateImageUrl } from '../utils';
import ImageWithFallback from './ImageWithFallback';
import bakeryLogo from '../assets/basking-bakery-logo.png';

export default function AdminDashboard({ onBackToShop }) {
  const {
    products,
    adminUser,
    logout,
    toggleAvailability,
    updateProductPrice,
    updateProductImage,
    updateProductDetails,
    addProduct,
    deleteProduct,
    resetInventory,
    toast,
  } = useInventory();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    category: 'signature-cakes',
    price: '',
    description: '',
    dietaryTag: 'eggless', // 'eggless' | 'contains-egg'
    glutenFree: false,
    sugarFree: false,
    isAvailable: true,
    image: '',
    imagePreview: '',
  });

  // Delete Safeguard Modal State
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);

  // Quick inline price editing states
  const [inlinePriceId, setInlinePriceId] = useState(null);
  const [inlinePriceValue, setInlinePriceValue] = useState('');

  // Filtering products
  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Calculate statistics
  const totalCount = products.length;
  const availableCount = products.filter((p) => p.isAvailable).length;
  const outOfStockCount = totalCount - availableCount;

  // Open edit modal
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      isAvailable: product.isAvailable,
      image: product.image,
      description: product.description,
      variants: JSON.parse(JSON.stringify(product.variants)),
    });
    setImagePreview(product.image);
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
    setEditForm(null);
    setImagePreview('');
  };

  // Local Image Upload to Base64 for Edit Modal with validation
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        showToast(validation.error, 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        setImagePreview(base64Url);
        setEditForm((prev) => ({ ...prev, image: base64Url }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Local Image Upload to Base64 for Add Modal with validation
  const handleAddFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        showToast(validation.error, 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        setAddForm((prev) => ({
          ...prev,
          image: base64Url,
          imagePreview: base64Url,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Edit Modal Form
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingProduct || !editForm) return;

    updateProductDetails(editingProduct.id, {
      name: editForm.name,
      category: editForm.category,
      isAvailable: editForm.isAvailable,
      image: editForm.image,
      description: editForm.description,
      variants: editForm.variants,
    });

    handleCloseEditModal();
  };

  // Handle Create New Product
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.category || !addForm.price || Number(addForm.price) <= 0 || !addForm.image.trim()) {
      return;
    }

    setIsSubmittingAdd(true);
    setTimeout(() => {
      addProduct({
        name: addForm.name.trim(),
        category: addForm.category,
        price: Number(addForm.price),
        description: addForm.description.trim(),
        isEggless: addForm.dietaryTag === 'eggless',
        glutenFree: addForm.glutenFree,
        sugarFree: addForm.sugarFree,
        isAvailable: addForm.isAvailable,
        image: addForm.image.trim(),
      });

      setIsSubmittingAdd(false);
      setIsAddModalOpen(false);
      // Reset Form
      setAddForm({
        name: '',
        category: 'signature-cakes',
        price: '',
        description: '',
        dietaryTag: 'eggless',
        glutenFree: false,
        sugarFree: false,
        isAvailable: true,
        image: '',
        imagePreview: '',
      });
    }, 350);
  };

  // Handle Permanent Delete Product
  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    setIsSubmittingDelete(true);

    setTimeout(() => {
      deleteProduct(deletingProduct.id);
      setIsSubmittingDelete(false);
      setDeletingProduct(null);
    }, 300);
  };

  // Handle inline price save
  const handleSaveInlinePrice = (product) => {
    const num = parseFloat(inlinePriceValue);
    if (!isNaN(num) && num > 0) {
      updateProductPrice(product.id, num, 0);
    }
    setInlinePriceId(null);
  };

  const isAddFormValid = Boolean(
    addForm.name.trim() &&
    addForm.category &&
    addForm.price &&
    Number(addForm.price) > 0 &&
    addForm.image.trim()
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-body selection:bg-amber-300 text-[#2B1810]">
      {/* Toast Feedback Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce-subtle">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-bold text-white ${
            toast.type === 'error'
              ? 'bg-rose-600 border-rose-400'
              : toast.type === 'info'
              ? 'bg-blue-700 border-blue-400'
              : 'bg-emerald-700 border-emerald-400'
          }`}>
            <Sparkles size={18} className="text-amber-300 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-[#2B1810] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo & Portal Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-amber-400/40">
                <img src={bakeryLogo} alt="Basking Bakery" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-xl font-bold text-amber-100">
                    Basking Bakery Inventory
                  </h1>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-amber-500/30">
                    Admin Portal
                  </span>
                </div>
                <p className="text-xs text-bakery-rose/70">
                  Manager: <strong className="text-amber-200">{adminUser?.username || 'Store Manager'}</strong>
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              {/* + Add New Product Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#2B1810] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <PlusCircle size={16} /> + Add New Product
              </button>

              <button
                onClick={onBackToShop}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-amber-100 text-xs font-semibold px-3.5 py-2 rounded-full border border-white/15 transition-all"
              >
                <Eye size={14} /> Customer Menu
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-all shadow-sm"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center shrink-0 font-bold">
              <Package size={22} />
            </div>
            <div>
              <span className="text-xs text-bakery-warmBrown font-medium block">Total Bakery Items</span>
              <span className="text-2xl font-bold text-[#2B1810]">{totalCount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center shrink-0 font-bold">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <span className="text-xs text-emerald-800 font-medium block">Available Now</span>
              <span className="text-2xl font-bold text-emerald-900">{availableCount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-800 rounded-2xl flex items-center justify-center shrink-0 font-bold">
              <XCircle size={22} />
            </div>
            <div>
              <span className="text-xs text-rose-800 font-medium block">Out of Stock</span>
              <span className="text-2xl font-bold text-rose-900">{outOfStockCount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center shrink-0 font-bold">
              <Tag size={22} />
            </div>
            <div>
              <span className="text-xs text-bakery-warmBrown font-medium block">Categories</span>
              <span className="text-2xl font-bold text-[#2B1810]">{categories.length - 1}</span>
            </div>
          </div>
        </div>

        {/* Controls: Search, Filter, Add & Reset */}
        <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bakery-warmBrown/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items by name..."
                className="w-full pl-10 pr-4 py-2.5 bg-bakery-cream/50 border border-amber-200 rounded-full text-xs sm:text-sm text-[#2B1810] placeholder:text-bakery-warmBrown/50 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-bakery-warmBrown hover:text-[#2B1810]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Reset Catalog Button */}
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all prices and stock statuses to defaults?')) {
                    resetInventory();
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 font-semibold bg-amber-50 hover:bg-amber-100 px-4 py-2.5 rounded-full border border-amber-200 transition"
                title="Reset inventory to original default state"
              >
                <RotateCcw size={14} /> Reset Catalog Defaults
              </button>
            </div>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide pt-2 border-t border-amber-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#5C3D2E] text-white shadow-sm'
                    : 'bg-bakery-cream/40 text-bakery-warmBrown border border-amber-100 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Inventory Table */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-amber-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-[#2B1810]">
                Product Catalog ({filteredProducts.length} Items)
              </h2>
              <p className="text-xs text-bakery-warmBrown/70">
                Manage item availability, edit prices, update photos, or permanently remove products
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#5C3D2E] hover:bg-[#8B6F47] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition"
            >
              <PlusCircle size={14} /> Add Product
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-amber-50/50 text-[11px] uppercase tracking-wider text-amber-900 border-b border-amber-100 font-bold">
                    <th className="py-3.5 px-6">Product Item</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Current Price</th>
                    <th className="py-3.5 px-4">Stock Availability</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100/60 text-xs sm:text-sm">
                  {filteredProducts.map((product) => {
                    const isAvailable = product.isAvailable !== false;
                    const primaryPrice = product.variants?.[0]?.price || 0;

                    return (
                      <tr
                        key={product.id}
                        className={`hover:bg-amber-50/30 transition-colors ${
                          !isAvailable ? 'bg-slate-50/70' : ''
                        }`}
                      >
                        {/* Image Thumbnail & Product Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-amber-100">
                              <img
                                src={product.image}
                                alt={product.name}
                                className={`w-full h-full object-cover ${
                                  !isAvailable ? 'opacity-60 grayscale' : ''
                                }`}
                              />
                              {!isAvailable && (
                                <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[9px] font-bold text-white text-center p-0.5 uppercase">
                                  Sold Out
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-[#2B1810] text-sm leading-tight flex flex-wrap items-center gap-1.5">
                                {product.name}
                                {product.isEggless ? (
                                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                    Eggless
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                                    Contains Egg
                                  </span>
                                )}
                                {product.glutenFree && (
                                  <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                                    GF
                                  </span>
                                )}
                                {product.sugarFree && (
                                  <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">
                                    Sugar-Free
                                  </span>
                                )}
                              </h3>
                              <p className="text-xs text-bakery-warmBrown/70 line-clamp-1 max-w-xs mt-0.5">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 font-medium text-bakery-warmBrown capitalize">
                          <span className="bg-amber-100/50 text-amber-900 text-xs px-2.5 py-1 rounded-full border border-amber-200/50">
                            {product.category.replace('-', ' ')}
                          </span>
                        </td>

                        {/* Price & Quick Edit */}
                        <td className="py-4 px-4 font-bold text-[#2B1810]">
                          {inlinePriceId === product.id ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium text-amber-800">₹</span>
                              <input
                                type="number"
                                value={inlinePriceValue}
                                onChange={(e) => setInlinePriceValue(e.target.value)}
                                className="w-20 px-2 py-1 bg-white border border-amber-400 rounded text-xs font-bold focus:outline-none"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveInlinePrice(product)}
                                className="p-1 text-emerald-700 hover:bg-emerald-100 rounded"
                                title="Save price"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => setInlinePriceId(null)}
                                className="p-1 text-rose-700 hover:bg-rose-100 rounded"
                                title="Cancel"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>
                                {formatPrice(primaryPrice)}
                                {product.variants.length > 1 && (
                                  <span className="text-[10px] font-normal text-bakery-warmBrown/60 block">
                                    ({product.variants.length} variants)
                                  </span>
                                )}
                              </span>
                              <button
                                onClick={() => {
                                  setInlinePriceId(product.id);
                                  setInlinePriceValue(primaryPrice.toString());
                                }}
                                className="p-1 text-amber-700 hover:bg-amber-100 rounded-full transition"
                                title="Quick edit primary price"
                              >
                                <Edit2 size={13} />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Availability Toggle Switch */}
                        <td className="py-4 px-4">
                          <button
                            onClick={() => toggleAvailability(product.id)}
                            className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
                              isAvailable
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                            }`}
                          >
                            <span
                              className={`w-3 h-3 rounded-full transition-all ${
                                isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                              }`}
                            />
                            <span>{isAvailable ? 'Available' : 'Sold Out / Disabled'}</span>
                          </button>
                        </td>

                        {/* Actions (Edit & Delete) */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(product)}
                              className="inline-flex items-center gap-1.5 bg-[#5C3D2E] hover:bg-[#8B6F47] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all shadow-sm"
                              title="Edit item details"
                            >
                              <Edit2 size={13} /> Edit
                            </button>

                            <button
                              onClick={() => setDeletingProduct(product)}
                              className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                              title="Permanently delete product"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-bakery-warmBrown">
              <Package size={40} className="mx-auto text-amber-300 mb-2" />
              <p className="font-bold text-lg text-[#2B1810]">No products found</p>
              <p className="text-xs text-bakery-warmBrown/70 mt-1">
                Try searching for another keyword or add a new product to this category.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* FEATURE 1: Add New Bakery Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-100 p-6 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-bakery-warmBrown hover:text-[#2B1810] bg-bakery-cream hover:bg-amber-100 rounded-full transition"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-100">
              <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold shadow-md">
                <PlusCircle size={22} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#2B1810]">
                  Add New Bakery Product
                </h3>
                <p className="text-xs text-bakery-warmBrown">
                  Publish a new fresh bake directly to customer catalog
                </p>
              </div>
            </div>

            {/* Add Form */}
            <form onSubmit={handleCreateProduct} className="space-y-5">
              {/* Item Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                    Item Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    placeholder="e.g. Belgian Dark Truffle Cake"
                    className="w-full px-3.5 py-2.5 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={addForm.category}
                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500/40 focus:outline-none"
                  >
                    {categories.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Initial Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                    Price (₹ INR) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-amber-900 text-xs">₹</span>
                    <input
                      type="number"
                      min="1"
                      required
                      value={addForm.price}
                      onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                      placeholder="450"
                      className="w-full pl-8 pr-3 py-2.5 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-amber-500/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                    Initial Stock Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setAddForm({ ...addForm, isAvailable: !addForm.isAvailable })}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-between border transition ${
                      addForm.isAvailable
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-rose-50 text-rose-900 border-rose-300'
                    }`}
                  >
                    <span>{addForm.isAvailable ? 'Available Immediately' : 'Mark as Sold Out'}</span>
                    <span className={`w-3 h-3 rounded-full ${addForm.isAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  </button>
                </div>
              </div>

              {/* Dietary Tags (Radio & Checkboxes) */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70 space-y-3">
                <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider">
                  Dietary Classification <span className="text-rose-500">*</span>
                </label>
                
                <div className="flex items-center gap-6 text-xs font-semibold text-[#2B1810]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dietaryTag"
                      value="eggless"
                      checked={addForm.dietaryTag === 'eggless'}
                      onChange={() => setAddForm({ ...addForm, dietaryTag: 'eggless' })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="flex items-center gap-1 text-emerald-800">
                      <Leaf size={14} className="text-emerald-600" /> 100% Eggless / Pure Veg
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dietaryTag"
                      value="contains-egg"
                      checked={addForm.dietaryTag === 'contains-egg'}
                      onChange={() => setAddForm({ ...addForm, dietaryTag: 'contains-egg' })}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Contains Egg</span>
                  </label>
                </div>

                <div className="pt-2 border-t border-amber-200/50 flex flex-wrap items-center gap-4 text-xs font-medium">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addForm.glutenFree}
                      onChange={(e) => setAddForm({ ...addForm, glutenFree: e.target.checked })}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>Gluten-Free Option</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addForm.sugarFree}
                      onChange={(e) => setAddForm({ ...addForm, sugarFree: e.target.checked })}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>Sugar-Free Option</span>
                  </label>
                </div>
              </div>

              {/* Product Image (URL or File Upload) */}
              <div>
                <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                  Product Image <span className="text-rose-500">*</span>
                </label>

                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-amber-200 shrink-0 bg-slate-100 shadow-sm relative">
                    {addForm.imagePreview ? (
                      <img src={addForm.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-bakery-warmBrown/50 text-[11px] font-semibold text-center p-1">
                        Square Preview
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      value={addForm.image}
                      onChange={(e) => setAddForm({
                        ...addForm,
                        image: e.target.value,
                        imagePreview: e.target.value,
                      })}
                      placeholder="Paste Image Web URL..."
                      className="w-full px-3 py-2 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />

                    <label className="inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition">
                      <Upload size={14} /> Upload Image File (JPG, PNG, WebP)
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAddFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                  Description / Ingredients Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  placeholder="e.g. Handcrafted dark chocolate sponge with 55% cocoa ganache..."
                  className="w-full px-3.5 py-2.5 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/40 focus:outline-none"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-bakery-warmBrown hover:bg-amber-100 rounded-full transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!isAddFormValid || isSubmittingAdd}
                  className="btn-primary py-2.5 px-6 text-xs font-bold shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingAdd ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <PlusCircle size={16} /> Add Product to Catalog
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FEATURE 2: Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-100 p-6 relative">
            <button
              onClick={() => setDeletingProduct(null)}
              className="absolute top-5 right-5 p-2 text-bakery-warmBrown hover:text-[#2B1810] bg-bakery-cream hover:bg-amber-100 rounded-full transition"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-rose-950">
                  Delete Product
                </h3>
                <p className="text-xs text-rose-800/80 font-medium">
                  Permanent Removal Warning
                </p>
              </div>
            </div>

            {/* Warning Message */}
            <p className="text-xs text-[#2B1810]/80 leading-relaxed mb-4">
              Are you sure you want to permanently delete <strong className="text-rose-900">{deletingProduct.name}</strong>? This action cannot be undone and removes it from the customer menu immediately.
            </p>

            {/* Visual Item Preview Box */}
            <div className="bg-rose-50/70 rounded-2xl p-3.5 border border-rose-200/80 mb-6 flex items-center gap-3">
              <img
                src={deletingProduct.image}
                alt={deletingProduct.name}
                className="w-14 h-14 rounded-xl object-cover border border-rose-200 shrink-0"
              />
              <div>
                <h4 className="font-bold text-xs text-rose-950 line-clamp-1">{deletingProduct.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px]">
                  <span className="bg-rose-200/60 text-rose-900 px-2 py-0.5 rounded uppercase font-bold text-[9px]">
                    {deletingProduct.category.replace('-', ' ')}
                  </span>
                  <span className="font-extrabold text-rose-950">
                    {formatPrice(deletingProduct.variants?.[0]?.price || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-amber-100">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2.5 text-xs font-bold text-bakery-warmBrown hover:bg-amber-100 rounded-full transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isSubmittingDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-lg transition flex items-center gap-2 disabled:opacity-75"
              >
                {isSubmittingDelete ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 size={15} /> Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingProduct && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-100 p-6 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseEditModal}
              className="absolute top-5 right-5 p-2 text-bakery-warmBrown hover:text-[#2B1810] bg-bakery-cream hover:bg-amber-100 rounded-full transition"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-100">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800 font-bold">
                <Edit2 size={18} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#2B1810]">
                  Edit Bakery Item
                </h3>
                <p className="text-xs text-bakery-warmBrown">
                  Update photo, pricing, description and availability for customer menu
                </p>
              </div>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSaveModal} className="space-y-5">
              {/* Product Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500/40 focus:outline-none"
                  >
                    {categories.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL & Local Upload Preview */}
              <div>
                <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                  Product Image (Photo URL or Local File Upload)
                </label>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-amber-200 shrink-0 bg-slate-100 shadow-sm relative">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-bakery-warmBrown">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      value={editForm.image}
                      onChange={(e) => {
                        setEditForm({ ...editForm, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      placeholder="Paste Image URL..."
                      className="w-full px-3 py-2 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />

                    <label className="inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition">
                      <Upload size={14} /> Upload Local Image File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Price & Variants Editing */}
              <div>
                <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                  Variants & Pricing (₹)
                </label>
                <div className="space-y-2 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60">
                  {editForm.variants.map((v, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={v.label}
                        onChange={(e) => {
                          const updated = [...editForm.variants];
                          updated[idx].label = e.target.value;
                          setEditForm({ ...editForm, variants: updated });
                        }}
                        placeholder="Variant Label (e.g. 0.5 kg)"
                        className="flex-1 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-xs font-medium"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-amber-900">₹</span>
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => {
                            const updated = [...editForm.variants];
                            updated[idx].price = Number(e.target.value);
                            setEditForm({ ...editForm, variants: updated });
                          }}
                          placeholder="Price"
                          className="w-24 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-bakery-cream/30 border border-amber-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/40 focus:outline-none"
                />
              </div>

              {/* Stock Status Switch */}
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <div>
                  <h4 className="font-bold text-xs text-[#2B1810] uppercase tracking-wider">
                    Stock Availability Status
                  </h4>
                  <p className="text-[11px] text-bakery-warmBrown/80">
                    When marked unavailable, card will show Sold Out badge to customers
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditForm({ ...editForm, isAvailable: !editForm.isAvailable })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all shadow-sm ${
                    editForm.isAvailable
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {editForm.isAvailable ? 'Available' : 'Out of Stock'}
                </button>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-amber-100">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-5 py-2.5 text-xs font-bold text-bakery-warmBrown hover:bg-amber-100 rounded-full transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2.5 px-6 text-xs font-bold shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
