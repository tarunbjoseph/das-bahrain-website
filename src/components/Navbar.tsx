import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Globe, 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Building2, 
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO } from '../data/mockData';
import logoImg from '../assets/das-logo.png';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = translations[language];
  const isRtl = language === 'ar';

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-das-900 to-das-950 border-b border-white/5 py-1.5 px-4 text-xs text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-300">{t.topBarAnnouncement}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <a 
              href={`tel:${COMPANY_INFO.primaryPhone}`} 
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.callUs} <strong className="text-white font-mono">{COMPANY_INFO.primaryPhone}</strong></span>
            </a>
            <span className="text-white/20">|</span>
            <a 
              href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=Hello%20DAS%20Bahrain`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="glass-panel border-b border-slate-200/80 dark:border-white/10 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-black p-0.5 border-2 border-emerald-500/60 shadow-lg shadow-emerald-900/30 group-hover:border-emerald-400 transition-all flex items-center justify-center shrink-0">
              <img 
                src={logoImg} 
                alt="DAS Bahrain Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  DAS <span className="text-emerald-600 dark:text-emerald-400">BAHRAIN</span>
                </span>
                <span className="text-[10px] bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider hidden sm:inline-block">
                  Licensed
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {language === 'ar' ? 'دار البابا سلام • موزع الساي كولا المعتمد' : 'Dar Al Baba Salam • Featuring Alsi Cola'}
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-100 dark:bg-das-900/80 border border-slate-300 dark:border-white/15 focus:border-emerald-500 rounded-full py-2 px-10 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <Search className={`absolute top-2.5 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className={`absolute top-2.5 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white ${isRtl ? 'left-3.5' : 'right-3.5'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
            <button 
              onClick={() => handleNavClick('products')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1"
            >
              {t.shop}
            </button>
            <button 
              onClick={() => handleNavClick('b2b')}
              className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-semibold py-1 px-2.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/50 border border-emerald-500/30"
            >
              <Building2 className="w-4 h-4 text-emerald-500" />
              <span>{t.b2bWholesale}</span>
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1"
            >
              {t.aboutUs}
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1"
            >
              {t.contact}
            </button>
          </div>

          {/* Action Controls: Theme Toggle, Language Toggle & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger for Mobile */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/5"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-xs font-semibold text-slate-800 dark:text-white transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>{t.languageToggle}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold px-3.5 sm:px-4 py-2 rounded-full shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 text-black" />
              <span className="hidden sm:inline text-xs font-extrabold">{t.cart}</span>
              {cartCount > 0 && (
                <span className="bg-black text-emerald-400 text-xs font-black px-1.5 py-0.2 rounded-full min-w-[1.25rem] text-center border border-emerald-400/40">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden md:inline text-xs border-l border-black/20 pl-2 font-mono">
                  {cartTotal.toFixed(3)} {t.fils}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/5"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-white/10 animate-fadeIn">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-100 dark:bg-das-900 border border-slate-300 dark:border-white/20 focus:border-emerald-500 rounded-xl py-2 px-10 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
              <Search className={`absolute top-2.5 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            </div>
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 dark:border-white/10 space-y-2 pb-2 animate-fadeIn">
            <button 
              onClick={() => handleNavClick('products')}
              className="w-full text-left rtl:text-right px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              {t.shop}
            </button>
            <button 
              onClick={() => handleNavClick('b2b')}
              className="w-full text-left rtl:text-right px-3 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 rounded-lg flex items-center justify-between"
            >
              <span>{t.b2bWholesale}</span>
              <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded font-black">Daily Van Sales</span>
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="w-full text-left rtl:text-right px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              {t.aboutUs}
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="w-full text-left rtl:text-right px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              {t.contact}
            </button>
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <a 
                href={`https://wa.me/${COMPANY_INFO.centralSalesWhatsApp}?text=Hello%20Central%20Sales%20DAS%20Bahrain`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Central Sales WhatsApp: {COMPANY_INFO.centralSalesDivision}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
