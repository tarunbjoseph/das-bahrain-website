import React from 'react';
import { 
  Sparkles, 
  Truck, 
  Store, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Flame, 
  CheckCircle2,
  Package
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO } from '../data/mockData';

interface HeroProps {
  language: Language;
  onExploreProducts: () => void;
  onExploreB2B: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreProducts,
  onExploreB2B
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-6">
              <span className="block text-slate-700 dark:text-slate-300 font-extrabold text-2xl sm:text-3xl mb-1">
                {t.heroTitlePrefix}
              </span>
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-600 dark:from-white dark:via-slate-100 dark:to-emerald-400 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
              {t.heroSubTitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreProducts}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold px-7 py-3.5 rounded-xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.heroCtaShop}</span>
                <ArrowIcon className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onExploreB2B}
                className="flex items-center justify-center gap-2.5 bg-white dark:bg-das-800/80 hover:bg-slate-100 dark:hover:bg-das-700/80 border border-slate-300 dark:border-emerald-500/30 hover:border-emerald-400/60 text-slate-900 dark:text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.heroCtaB2b}</span>
              </button>
            </div>

            {/* Trust Highlights Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-6 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'ar' ? 'توصيل لجميع مناطق البحرين' : 'Island-wide Bahrain Delivery'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'ar' ? 'توريد يومي لأسواق وبقالات البحرين' : 'Daily Van Sales for Stores'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'ar' ? 'دفع آمن عبر بنفت بي وواتساب' : 'BenefitPay & WhatsApp Ready'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Feature Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Featured Showcase Card */}
              <div className="relative rounded-3xl p-6 bg-white dark:bg-das-850/90 border border-slate-200 dark:border-white/15 overflow-hidden shadow-2xl shadow-slate-200/60 dark:shadow-none">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
                      {language === 'ar' ? 'تشكيلة المشروبات الحصرية' : 'Featured Lineup'}
                    </span>
                  </div>
                  <span className="text-[11px] bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white font-medium px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-white/10">
                    Bahrain 2026
                  </span>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5 bg-gradient-to-b from-slate-900 to-black group">
                  <img
                    src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80"
                    alt="Alsi Cola and Refreshing Drinks in Bahrain"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      Alsi Cola Bahrain
                    </span>
                    <h3 className="text-xl font-black">
                      {language === 'ar' ? 'انتعاش الكولا الكلاسيكية الأصيلة' : 'Crisp Refreshment, Pure Taste'}
                    </h3>
                  </div>
                </div>

                {/* Floating Micro Feature 1: Van Sales Badge */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-das-900/90 border border-slate-200 dark:border-white/10 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {language === 'ar' ? 'فان سيلز يومي للبقالات' : 'Active Van Sales Routes'}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'تغطية مستمرة لكل أحياء وقرى البحرين' : 'Direct cold store restocking & stands'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-2 py-1 rounded-lg">
                    Daily
                  </span>
                </div>

                {/* Floating Micro Feature 2: High Velocity Energy Drinks */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-das-900/90 border border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {language === 'ar' ? 'مشروبات كود ريد وكود ميكس' : 'Code Red & Code Mix Energy'}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'الأعلى طلباً ومبيعاً بالكرتون' : 'Top velocity energy drink lineup'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 border border-amber-500/30 px-2 py-1 rounded-lg">
                    Hot Pick
                  </span>
                </div>

              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Bottom Metrics Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-white dark:bg-das-850/80 border border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-none">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white">{t.stat1Val}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.stat1Label}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:border-x border-slate-200 dark:border-white/10 md:px-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white">{t.stat2Val}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.stat2Label}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:pl-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white">{t.stat3Val}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.stat3Label}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
