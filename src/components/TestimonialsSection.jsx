import { Star, CheckCircle2, Quote, MessageCircle } from 'lucide-react';
import { testimonials, GOOGLE_REVIEWS_URL } from '../data';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1 text-amber-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star size={16} className="text-amber-300 fill-amber-100" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={16} className="fill-amber-400 text-amber-400" />
          </div>
        </div>
      )}
      <span className="ml-1 text-xs font-bold text-amber-900">{rating}</span>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-100/80 rounded-full px-4 py-1.5 mb-3 border border-amber-200">
            <Quote size={14} className="text-amber-700" />
            <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">
              Real Neighborhood Feedback
            </span>
          </div>
          <h2 className="section-title text-3xl sm:text-4xl font-display font-bold text-[#2B1810]">
            Loved by Noida Sector 120 Residents
          </h2>
          <p className="text-bakery-warmBrown/80 mt-3 text-sm sm:text-base leading-relaxed">
            Here is what our neighbors have to say about our eggless bakes, custom cakes, and daily fresh oven delights.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-8 card-shadow hover:shadow-xl transition-all duration-300 border border-amber-100 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Background Decorative Quote */}
              <Quote
                size={80}
                className="absolute -top-4 -right-4 text-amber-100/50 group-hover:text-amber-200/50 transition-colors pointer-events-none"
              />

              <div>
                {/* Rating & Timestamp */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <StarRating rating={review.rating} />
                  <span className="text-xs font-medium text-bakery-warmBrown/60 bg-bakery-cream px-3 py-1 rounded-full">
                    {review.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-[#2B1810]/90 text-sm sm:text-base italic leading-relaxed mb-6 font-normal">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-amber-100/80 mt-2">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C3D2E] to-[#8B6F47] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {review.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#2B1810] leading-tight flex items-center gap-1.5">
                      {review.name}
                      {review.verified && (
                        <CheckCircle2 size={14} className="text-emerald-600 inline shrink-0" title="Verified Customer" />
                      )}
                    </h4>
                    <span className="text-xs text-bakery-warmBrown/70">
                      {review.location}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                  Google Verified Review
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-[#2B1810] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display text-xl font-bold text-amber-200">
              Had a sweet experience with Basking Bakery?
            </h3>
            <p className="text-xs sm:text-sm text-bakery-rose/80">
              Share your review on Google to help fellow Noida foodies discover our bakes!
            </p>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold py-3 px-6 text-xs sm:text-sm font-bold tracking-wide shrink-0 shadow-lg hover:scale-105 transition-transform"
          >
            Write a Google Review ↗
          </a>
        </div>
      </div>
    </section>
  );
}
