import { useState } from 'react';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useInventory } from '../InventoryContext';
import bakeryLogo from '../assets/basking-bakery-logo.png';

export default function AdminLogin({ onBackToShop }) {
  const { login } = useInventory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid credentials');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1810] via-[#4A2E20] to-[#1F100A] flex flex-col justify-center items-center p-4 relative font-body selection:bg-amber-400 selection:text-bakery-darkText">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back Button Header */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-200/80 hover:text-amber-100 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full border border-white/15 transition-all shadow-sm"
        >
          <ArrowLeft size={14} /> Back to Customer Storefront
        </button>

        <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
          <ShieldCheck size={13} /> Protected Staff Portal
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-amber-100/30 relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg border-2 border-amber-200">
            <img src={bakeryLogo} alt="Basking Bakery" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#2B1810]">
            Staff & Manager Login
          </h2>
          <p className="text-xs text-bakery-warmBrown mt-1">
            Access Basking Bakery Inventory & Menu Control Panel
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 flex items-start gap-2.5 text-xs text-rose-800 bg-rose-50 border border-rose-200 p-3.5 rounded-2xl animate-shake">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1.5">
              Username or Staff Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-700">
                <User size={16} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 bg-bakery-cream/40 border border-amber-200 rounded-xl text-sm font-medium text-[#2B1810] placeholder:text-bakery-warmBrown/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B1810] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-700">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-bakery-cream/40 border border-amber-200 rounded-xl text-sm font-medium text-[#2B1810] placeholder:text-bakery-warmBrown/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-700 hover:text-amber-900"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3.5 px-4 rounded-xl text-sm font-bold shadow-lg mt-2 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-75"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock size={16} /> Sign In to Staff Portal
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-amber-100 text-center">
          <p className="text-[11px] text-bakery-warmBrown/70">
            Basking Bakery Inventory Management System v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
