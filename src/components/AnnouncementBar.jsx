import { Clock, Truck, Phone, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '../CartContext';
import { STORE_CONFIG } from '../data';

export default function AnnouncementBar() {
  const { selectedLocation, openPincodeModal } = useCart();

  return (
    <div className="bg-gradient-to-r from-[#2B1810] via-[#4A2E20] to-[#2B1810] text-white text-xs sm:text-sm py-2.5 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Serviceability & Pincode Selector */}
        <button
          onClick={openPincodeModal}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 transition-all border border-white/15"
          title="Click to change delivery location or check pincode"
        >
          <MapPin size={13} className="text-amber-400 shrink-0" />
          <span className="font-medium text-bakery-cream">
            Delivering to: <strong className="text-amber-300">{selectedLocation.name} ({selectedLocation.sector})</strong>
          </span>
          <ChevronDown size={13} className="text-white/70" />
        </button>

        {/* SLA & Operating Hours */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <Truck size={13} />
            <span>{selectedLocation.sla}</span>
          </div>
          <div className="flex items-center gap-1.5 text-bakery-cream">
            <Clock size={13} className="text-amber-400" />
            <span>Open: <strong>8:00 AM – 10:00 PM</strong></span>
          </div>
        </div>

        {/* Quick Call */}
        <a
          href={`tel:+${STORE_CONFIG.whatsappNumber}`}
          className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-full px-3 py-1 transition-colors text-xs font-semibold"
        >
          <Phone size={12} />
          <span>Quick Call</span>
        </a>
      </div>
    </div>
  );
}
