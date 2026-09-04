import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  ArrowUp,
  Instagram,
  Store
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO } from '../data/mockData';
import logoImg from '../assets/das-logo.png';

interface FooterProps {
  language: Language;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigateSection }) => {
  const t = translations[language];
  const isArabic = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 dark:bg-das-950 border-t border-white/10 text-slate-400 text-xs">
      
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white dark:bg-black p-1 border-2 border-leaf-500/50 shadow-lg flex items-center justify-center shrink-0">
                <img 
                  src={logoImg} 
                  alt="DAS Bahrain Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight block">
                  DAS <span className="text-leaf-400">BAHRAIN</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {COMPANY_INFO.name}
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed pr-4 text-xs">
              {t.footerDesc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/alsi_cola_bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-das-850 hover:bg-leaf-500/20 text-slate-300 hover:text-leaf-400 border border-white/10 flex items-center justify-center transition-colors"
                title="Alsi Cola Bahrain Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a 
                href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-das-850 hover:bg-leaf-500/20 text-slate-300 hover:text-leaf-400 border border-white/10 flex items-center justify-center transition-colors"
                title="DAS Bahrain WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              <strong className="text-leaf-400">{t.workingHours}</strong>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-wider mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => onNavigateSection('products')} 
                  className="hover:text-leaf-400 transition-colors"
                >
                  {t.shop}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('b2b')} 
                  className="hover:text-leaf-400 transition-colors text-leaf-400 font-bold"
                >
                  {t.b2bWholesale}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('about')} 
                  className="hover:text-leaf-400 transition-colors"
                >
                  {t.aboutUs}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('contact')} 
                  className="hover:text-leaf-400 transition-colors"
                >
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-wider mb-4">
              {isArabic ? 'أقسام المنتجات' : 'FMCG Categories'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => onNavigateSection('products')} 
                  className="hover:text-leaf-400 transition-colors"
                >
                  {isArabic ? 'الساي كولا والمشروبات' : 'Alsi Cola Beverages'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('products')} 
                  className="hover:text-leaf-400 transition-colors"
                >
                  {isArabic ? 'مشروبات الطاقة (كود ريد)' : 'Energy Drinks (Code Red)'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('products')} 
                  className="hover:text-leaf-400 transition-colors"
                >
                  {isArabic ? 'الأغذية الجافة والتموين' : 'Dry Food & Pantry'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('products')} 
                  className="hover:text-leaf-400 transition-colors"
                >
                  {isArabic ? 'الحلويات والشوكولاتة' : 'Confectionery & Sweets'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('products')} 
                  className="hover:text-leaf-400 transition-colors"
                >
                  {isArabic ? 'المنظفات والمستهلكات' : 'Non-Food & Hygiene'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Head Office & Distribution */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-wider mb-4">
              {t.contactInfo}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-leaf-400 shrink-0 mt-0.5" />
                <span>{isArabic ? COMPANY_INFO.hqAddressAr : COMPANY_INFO.hqAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-leaf-400 shrink-0" />
                <span className="font-mono">{COMPANY_INFO.primaryPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-leaf-400 shrink-0" />
                <span className="font-mono">Central: {COMPANY_INFO.centralSalesDivision}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-leaf-400 shrink-0" />
                <span className="font-mono break-all">{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Regulatory & Intellectual Property Disclaimer */}
      <div className="bg-das-900 border-t border-white/5 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="leading-relaxed text-center sm:text-left rtl:sm:text-right max-w-3xl">
            {t.licensedNotice}
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold text-slate-300">
              BenefitPay
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold text-slate-300">
              Visa / MC
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold text-slate-300">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back to Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-t border-white/5 text-[11px]">
        <div>
          © {new Date().getFullYear()} {COMPANY_INFO.name}. {t.allRightsReserved}
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-slate-400 hover:text-leaf-400 transition-colors font-bold"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

    </footer>
  );
};
