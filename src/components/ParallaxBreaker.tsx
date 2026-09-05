import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface ParallaxBreakerProps {
  language: Language;
  onExploreProducts: () => void;
}

export const ParallaxBreaker: React.FC<ParallaxBreakerProps> = ({ language, onExploreProducts }) => {
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 bg-slate-50 dark:bg-[#070a0e] text-white transition-colors duration-300">
      {/* Background Image with Alsi Cola Can - Bright & Vividly Visible */}
      <img
        src="https://alsicolabh.tfwgsite.com/assets/parallax-divider-DCBafX8t.jpg"
        alt="Alsi Cola Bahrain FMCG Distribution Supply"
        className="absolute inset-0 w-full h-full object-cover object-left md:object-center filter brightness-[1.02] contrast-[1.1] saturate-[1.15]"
        loading="lazy"
      />

      {/* Subtle Transparent Overlay - Keeps Center Text Legible While Cans Stay Bright */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/45 to-black/60 rtl:from-black/60 rtl:via-black/45 rtl:to-black/40" />

      {/* Top Seamless Blending Gradient - smooth melt with the section above */}
      <div className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-slate-50 via-slate-50/70 to-transparent dark:from-[#070a0e] dark:via-[#070a0e]/70 dark:to-transparent z-10 pointer-events-none" />

      {/* Bottom Seamless Blending Gradient - smooth melt with ProductGrid below */}
      <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent dark:from-[#070a0e] dark:via-[#070a0e]/70 dark:to-transparent z-10 pointer-events-none" />

      {/* Content Container - Direct on image with high legibility */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-leaf-300 text-xs font-bold uppercase tracking-[0.25em] shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isArabic ? 'شبكة التوريد الموثوقة' : 'Dependable Bahrain Supply Chain'}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl mx-auto tracking-tight drop-shadow-md">
          {isArabic
            ? 'نربط المستهلكين والمتاجر بأفضل المشروبات والمنتجات الاستهلاكية يومياً وبكل دقة'
            : 'Supplying Bahrain with iconic beverages and quality FMCG essentials, door to door.'}
        </h3>

        <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
          {isArabic
            ? 'من المستودعات المركزية في الحد وحتى أحدث أسطول فانات التوزيع، دار البابا سلام تضمن توافر المنتجات طازجة في كافة برادات ومتاجر المملكة.'
            : 'From central cold storage to our active daily van sales fleet, Dar Al Baba Salam ensures fresh, uninterrupted product flow for cold stores, supermarkets, and homes.'}
        </p>

        <div className="pt-4">
          <button
            onClick={onExploreProducts}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-leaf-600 hover:bg-leaf-500 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-leaf-600/30 hover:scale-105"
          >
            <span>{isArabic ? 'استكشف كتالوج المنتجات' : 'Explore Full Catalogue'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
