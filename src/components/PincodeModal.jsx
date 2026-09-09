import { useState } from 'react';
import { MapPin, X, CheckCircle2, ShieldAlert, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../CartContext';
import { serviceabilityData } from '../data';

export default function PincodeModal() {
  const {
    pincodeModalOpen,
    closePincodeModal,
    selectedLocation,
    setLocation,
  } = useCart();

  const [inputPincode, setInputPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null); // null | 'success' | 'error'

  if (!pincodeModalOpen) return null;

  const handlePincodeSearch = (e) => {
    e.preventDefault();
    const cleanPin = inputPincode.trim();
    if (serviceabilityData.validPincodes.includes(cleanPin)) {
      setPincodeStatus('success');
      // Match or set location to Sector 120
      const matched = serviceabilityData.societies.find(
        (s) => s.pincode === cleanPin
      ) || serviceabilityData.societies[0];
      setLocation(matched);
    } else {
      setPincodeStatus('error');
    }
  };

  const handleSelectSociety = (soc) => {
    setLocation(soc);
    setPincodeStatus('success');
    setTimeout(() => {
      closePincodeModal();
    }, 600);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 overlay backdrop-blur-sm"
        onClick={closePincodeModal}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[480px] bg-white rounded-3xl z-50 shadow-2xl p-6 sm:p-8 animate-fade-in border border-amber-100">
        {/* Close Button */}
        <button
          onClick={closePincodeModal}
          className="absolute top-5 right-5 p-2 text-bakery-warmBrown hover:text-bakery-brown rounded-full hover:bg-bakery-cream transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700">
            <MapPin size={24} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-bakery-brown">
              Check Serviceability
            </h3>
            <p className="text-xs text-bakery-warmBrown">
              Deliveries across Sector 120 Noida & nearby societies
            </p>
          </div>
        </div>

        {/* Form Pincode Validator */}
        <form onSubmit={handlePincodeSearch} className="space-y-3 mb-6">
          <label className="text-xs font-semibold text-bakery-brown uppercase tracking-wider block">
            Enter 6-Digit Delivery Pincode
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={inputPincode}
              onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 201301"
              className="flex-1 px-4 py-3 bg-bakery-cream/50 border border-bakery-lightGold rounded-xl text-bakery-darkText font-medium placeholder:text-bakery-warmBrown/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <button
              type="submit"
              disabled={inputPincode.length < 6}
              className="btn-primary py-3 px-5 text-sm shrink-0 disabled:opacity-50"
            >
              Verify
            </button>
          </div>

          {pincodeStatus === 'success' && (
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              <CheckCircle2 size={16} />
              <span>Great news! Express Delivery is active for {selectedLocation.name}.</span>
            </div>
          )}

          {pincodeStatus === 'error' && (
            <div className="flex items-center gap-2 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl">
              <ShieldAlert size={16} />
              <span>We currently deliver within Pincodes 201301, 201304, & 201307.</span>
            </div>
          )}
        </form>

        {/* Quick Society Selector */}
        <div>
          <span className="text-xs font-semibold text-bakery-warmBrown uppercase tracking-wider block mb-3">
            Select Your Society / Sector
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto cart-scroll pr-1">
            {serviceabilityData.societies.map((soc) => {
              const isSelected = selectedLocation.name === soc.name;
              return (
                <button
                  key={soc.name}
                  type="button"
                  onClick={() => handleSelectSociety(soc)}
                  className={`text-left p-3 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-bakery-brown text-white border-bakery-brown shadow-md scale-[1.02]'
                      : 'bg-bakery-cream/40 border-bakery-lightGold/70 text-bakery-darkText hover:border-bakery-gold hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{soc.name}</p>
                    {soc.isFree && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-amber-400 text-bakery-darkText' : 'bg-emerald-100 text-emerald-800'}`}>
                        FREE
                      </span>
                    )}
                  </div>
                  <p className={`text-[11px] mt-1 flex items-center gap-1 ${isSelected ? 'text-amber-200' : 'text-bakery-warmBrown'}`}>
                    <Truck size={11} /> {soc.sla}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
