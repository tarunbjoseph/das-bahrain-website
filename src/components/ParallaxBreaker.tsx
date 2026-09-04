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
    <section className="relative w-full overflow-hidden my-4 md:my-6 py-12 md:py-16 bg-slate-900 text-white">
      {/* Background Image with Ambient Parallax Feel */}
      <img
        src="https://alsicolabh.tfwgsite.com/assets/parallax-divider-DCBafX8t.jpg"
        alt="Alsi Cola Bahrain FMCG Distribution Supply"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-105"
        loading="lazy"
      />

      {/* Gentle Botanical Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />

      {/* Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-leaf-300 text-xs font-bold uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isArabic ? 'شبكة التوريد الموثوقة' : 'Dependable Bahrain Supply Chain'}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl mx-auto tracking-tight">
          {isArabic
            ? 'نربط المستهلكين والمتاجر بأفضل المشروبات والمنتجات الاستهلاكية يومياً وبكل دقة'
            : 'Supplying Bahrain with iconic beverages and quality FMCG essentials, door to door.'}
        </h3>

        <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
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
