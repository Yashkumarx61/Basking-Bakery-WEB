import { useState } from 'react';
import { MessageCircle, Camera, CalendarDays, Sparkles, Check, Upload, Clock, Heart, Trash2 } from 'lucide-react';
import { customCakeFlavours, customCakeTypes, cakeWeights, deliverySlots } from '../data';
import { buildCustomCakeWhatsAppURL } from '../utils';

const initialForm = {
  flavour: customCakeFlavours[0].name,
  weight: '1.5 kg',
  cakeType: customCakeTypes[0].name,
  occasion: '',
  inscription: 'Happy Birthday Priya!',
  deliveryDate: '',
  preferredSlot: 'Standard Evening Slot (4:00 PM – 8:00 PM)',
  notes: '',
  photoUrl: null,
  photoName: '',
};

export default function CustomCakeSection() {
  const [form, setForm] = useState(initialForm);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setForm({ ...form, photoUrl: fakeUrl, photoName: file.name });
    }
  };

  const removePhoto = () => {
    setForm({ ...form, photoUrl: null, photoName: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.flavour || !form.weight) return;
    const url = buildCustomCakeWhatsAppURL({
      ...form,
      hasPhoto: Boolean(form.photoUrl),
    });
    window.open(url, '_blank');
  };

  return (
    <section
      id="custom-cakes"
      className="py-16 md:py-24 bg-gradient-to-br from-rose-50/50 via-[#FAF7F2] to-amber-50/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100/80 rounded-full px-4 py-1 mb-3">
            <Sparkles size={14} className="text-amber-700" />
            <span className="text-xs font-semibold text-amber-900 uppercase tracking-widest">
              Bespoke Celebration Studio
            </span>
          </div>
          <h2 className="section-title">Design Your Custom Cake</h2>
          <p className="text-bakery-warmBrown/80 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            From theme fondant cakes to photo prints — configure your dream cake step-by-step and get an instant quote on WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left Form Flow */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-3xl card-shadow p-6 sm:p-8 space-y-7 border border-amber-100/60"
          >
            {/* Step 1: Flavour Selector Tiles */}
            <div>
              <label className="flex items-center justify-between text-xs font-bold text-bakery-brown uppercase tracking-wider mb-3">
                <span>1. Select Flavour *</span>
                <span className="text-amber-700 font-normal">Step 1 of 5</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {customCakeFlavours.map((flv) => {
                  const isSelected = form.flavour === flv.name;
                  return (
                    <button
                      key={flv.id}
                      type="button"
                      onClick={() => setForm({ ...form, flavour: flv.name })}
                      className={`text-left p-3 rounded-2xl border transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#5C3D2E] text-white border-[#5C3D2E] shadow-md scale-[1.02]'
                          : 'bg-bakery-cream/30 border-amber-200/60 text-bakery-darkText hover:border-[#5C3D2E]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{flv.name}</span>
                        {isSelected && <Check size={14} className="text-amber-300" />}
                      </div>
                      <p className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-amber-200' : 'text-bakery-warmBrown'}`}>
                        {flv.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Weight Selection */}
            <div>
              <label className="flex items-center justify-between text-xs font-bold text-bakery-brown uppercase tracking-wider mb-3">
                <span>2. Select Weight / Size *</span>
                <span className="text-amber-700 font-normal">Step 2 of 5</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {cakeWeights.map((w) => (
                  <button
                    type="button"
                    key={w}
                    onClick={() => setForm({ ...form, weight: w })}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all ${
                      form.weight === w
                        ? 'bg-[#5C3D2E] text-white border-[#5C3D2E] shadow-md scale-105'
                        : 'bg-bakery-cream/40 text-bakery-warmBrown border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Cake Style / Photo Upload */}
            <div>
              <label className="flex items-center justify-between text-xs font-bold text-bakery-brown uppercase tracking-wider mb-3">
                <span>3. Cake Style & Reference Photo</span>
                <span className="text-amber-700 font-normal">Step 3 of 5</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                {customCakeTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setForm({ ...form, cakeType: type.name })}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      form.cakeType === type.name
                        ? 'bg-[#5C3D2E] text-white border-[#5C3D2E] shadow-md'
                        : 'bg-bakery-cream/30 border-amber-200 text-bakery-warmBrown hover:border-amber-400'
                    }`}
                  >
                    <p className="font-bold">{type.name}</p>
                    <p className={`text-[10px] mt-0.5 ${form.cakeType === type.name ? 'text-amber-200' : 'text-bakery-warmBrown'}`}>
                      {type.badge}
                    </p>
                  </button>
                ))}
              </div>

              {/* Photo Upload Simulation Box */}
              <div className="border-2 border-dashed border-amber-200 rounded-2xl p-4 text-center bg-amber-50/30 hover:bg-amber-50/60 transition">
                {form.photoUrl ? (
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-amber-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <img src={form.photoUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-bakery-brown truncate max-w-[180px]">{form.photoName}</p>
                        <p className="text-[10px] text-emerald-700 font-medium">✓ Reference Photo Attached</p>
                      </div>
                    </div>
                    <button type="button" onClick={removePhoto} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-1.5">
                    <Upload size={22} className="text-amber-600 mb-0.5" />
                    <span className="text-xs font-semibold text-bakery-brown">
                      Upload Reference Design Photo (Optional)
                    </span>
                    <span className="text-[11px] text-bakery-warmBrown">
                      Click to choose PNG, JPG or attach directly in WhatsApp
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
            </div>

            {/* Step 4: Personalization (Inscription) */}
            <div>
              <label className="flex items-center justify-between text-xs font-bold text-bakery-brown uppercase tracking-wider mb-2">
                <span>4. Inscription (Message on Cake)</span>
                <span className="text-amber-700 font-normal">Step 4 of 5</span>
              </label>
              <input
                type="text"
                name="inscription"
                maxLength={40}
                value={form.inscription}
                onChange={(e) => setForm({ ...form, inscription: e.target.value })}
                placeholder='e.g., "Happy Birthday Priya!"'
                className="w-full px-4 py-3 bg-bakery-cream/50 border border-amber-200 rounded-xl text-bakery-darkText text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            {/* Step 5: Delivery Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-bakery-brown uppercase tracking-wider block mb-1.5">
                  Delivery Date
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={form.deliveryDate}
                  onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                  className="w-full px-4 py-3 bg-bakery-cream/50 border border-amber-200 rounded-xl text-xs font-medium text-bakery-darkText focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-bakery-brown uppercase tracking-wider block mb-1.5">
                  Preferred Delivery Slot
                </label>
                <select
                  name="preferredSlot"
                  value={form.preferredSlot}
                  onChange={(e) => setForm({ ...form, preferredSlot: e.target.value })}
                  className="w-full px-4 py-3 bg-bakery-cream/50 border border-amber-200 rounded-xl text-xs font-medium text-bakery-darkText focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  {deliverySlots.map((slot) => (
                    <option key={slot.id} value={`${slot.label} (${slot.time})`}>
                      {slot.label} ({slot.time}) {slot.fee > 0 ? `+ ₹${slot.fee}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="btn-whatsapp w-full flex items-center justify-center gap-2 py-4 text-base shadow-xl"
            >
              <MessageCircle size={20} />
              Request Custom Quote via WhatsApp
            </button>
          </form>

          {/* Right Live Preview & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Cake Inscription Visual Preview */}
            <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 rounded-3xl p-6 text-white text-center shadow-xl border border-amber-500/20 relative overflow-hidden">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-2">
                ✨ Live Personalization Preview
              </span>

              {/* Simulated Cake Graphic */}
              <div className="relative w-44 h-44 mx-auto bg-gradient-to-tr from-amber-700 via-amber-800 to-amber-600 rounded-full flex items-center justify-center border-4 border-amber-400/40 shadow-2xl my-3 p-4 text-center">
                <div className="absolute inset-2 border-2 border-dashed border-amber-300/30 rounded-full pointer-events-none" />
                <p className="font-display text-sm font-bold text-amber-100 drop-shadow-md leading-snug tracking-wide italic">
                  {form.inscription ? `"${form.inscription}"` : '"Your Custom Message Here"'}
                </p>
              </div>

              <div className="text-xs text-amber-200/90 space-y-1">
                <p className="font-semibold text-white">{form.flavour} ({form.weight})</p>
                <p className="text-[11px] text-amber-300">{form.cakeType}</p>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-bakery-brown flex items-center gap-2">
                <Sparkles size={18} className="text-amber-600" /> Why Order Custom From Us?
              </h3>
              <ul className="space-y-3 text-xs text-bakery-warmBrown">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <span><strong>100% Eggless Option:</strong> Baked in dedicated eggless oven racks upon request.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <span><strong>Custom Reference Photo Match:</strong> Send any Pinterest or Instagram cake design photo!</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <span><strong>Free Direct Local Delivery:</strong> Free within Zodiac, Capetown, & Sector 120.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
