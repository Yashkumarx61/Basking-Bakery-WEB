import { MessageCircle } from 'lucide-react';
import { getDirectWhatsAppURL } from '../utils';

export default function FloatingWhatsAppButton() {
  const whatsappUrl = getDirectWhatsAppURL('Hi Basking Bakery, I want to place an order.');

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Direct Chat on WhatsApp"
      title="Chat with Basking Bakery on WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
      {/* Tooltip badge on hover for desktop */}
      <span className="absolute right-16 bg-bakery-darkText text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none hidden md:block">
        Chat with Us 💬
      </span>
    </a>
  );
}
