import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, ArrowLeft, PhoneCall, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface CallToActionBannerProps {
  language: Language;
  onExploreProducts: () => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({ language, onExploreProducts }) => {
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section className="relative w-full overflow-hidden my-20 md:my-28 py-28 md:py-36 bg-slate-950 text-white">
      {/* Background Image */}
      <img
        src="https://alsicolabh.tfwgsite.com/assets/cta-background-DfvjAj8P.jpg"
        alt="DAS Bahrain FMCG Partner Distribution"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.38] contrast-110"
        loading="lazy"
      />

      {/* Subtle Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/90" />

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-leaf-950/70 border border-leaf-500/40 text-leaf-300 text-xs font-bold uppercase tracking-[0.25em]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isArabic ? 'الشريك الرسمي في البحرين' : 'Licensed Bahrain FMCG Distribution'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
          {isArabic 
            ? 'هل ترغب في تزويد متجرك بمنتجات الساي كولا ومشروبات الطاقة؟' 
            : 'Ready to Stock Alsi Cola & High-Demand FMCG Essentials?'}
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
          {isArabic
            ? 'سواء كنت تدير برادة صغيرة أو سلسلة سوبرماركت كبرى، نوفر لك أسعار الموزع المعتمد مع زيارة يومية لأسطول الفان سيلز وتوفير ثلاجات العرض مجاناً.'
            : 'Whether you run a corner cold store or manage a supermarket chain, partner with Dar Al Baba Salam for daily van sales routes, free branded coolers, and direct distributor margins.'}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${COMPANY_INFO.centralSalesWhatsApp}?text=Hello%20DAS%20Bahrain,%20I%20would%20like%20to%20schedule%20a%20van%20sales%20visit%20for%20my%20store.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-leaf-600 hover:bg-leaf-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-leaf-600/30 hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{isArabic ? 'حجز موعد فان سيلز عبر واتساب' : 'Book Van Visit on WhatsApp'}</span>
          </a>

          <button
            onClick={onExploreProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase border border-white/20 backdrop-blur-md transition-all"
          >
            <span>{isArabic ? 'تصفح تشكيلة المنتجات' : 'Browse Product Portfolio'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
