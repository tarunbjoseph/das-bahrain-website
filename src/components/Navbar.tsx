import React, { useState, useRef, useEffect } from 'react';
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
  Moon,
  Eye,
  Plus,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Language, Theme, Product, PackagingType } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO, PRODUCTS } from '../data/mockData';
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
  products?: Product[];
  onAddToCart?: (product: Product, packagingType: PackagingType, quantity: number) => void;
  onQuickView?: (product: Product) => void;
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
  products = PRODUCTS,
  onAddToCart,
  onQuickView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const t = translations[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter products for instant dropdown
  const matchedProducts = searchQuery.trim()
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.brandAr.includes(q) ||
          p.categoryName.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
    setIsSearchDropdownOpen(false);
  };

  const handleSelectProduct = (product: Product) => {
    if (onQuickView) {
      onQuickView(product);
    } else {
      handleNavClick('products');
    }
    setIsSearchDropdownOpen(false);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleNavClick('products');
    setIsSearchDropdownOpen(false);
  };

  const marqueeItems = isRtl ? [
    'الساي كولا البحرين • الوكيل والموزع المعتمد',
    'دار البابا سلام • توريد وتوزيع المواد الغذائية والاستهلاكية في البحرين',
    'فان سيلز يومي نشط لتزويد البقالات والسوبرماركت والبرادات',
    'توصيل سريع لجميع المحافظات • مجاني للطلبات فوق 7.000 د.ب',
    'مشروبات الطاقة كود ريد وكود ميكس متوفرة بالكرتون والطبليات',
    'دفع إلكتروني آمن ومباشر عبر بنفت بي وواتساب'
  ] : [
    'Alsi Cola Bahrain • Licensed Distributor Powered by Dar Al Baba Salam',
    'Island-Wide Delivery Across Bahrain • Free Delivery over 7.000 BHD',
    'Daily Van Sales Routes for Cold Stores & Supermarkets',
    'Wholesale & Bulk FMCG Dispatches Island-Wide',
    'High-Velocity Code Red & Code Mix Energy Drinks in Stock',
    'Instant BenefitPay QR & WhatsApp Ordering Ready'
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar - Continuous Smooth Marquee Ticker */}
      <div className="bg-gradient-to-r from-slate-900 via-das-900 to-das-950 text-slate-200 border-b border-white/10 py-1.5 px-4 text-xs relative overflow-hidden flex items-center marquee-container shadow-sm">
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <div className="inline-flex animate-marquee items-center">
            <div className="inline-flex shrink-0 items-center">
              {marqueeItems.map((item, idx) => (
                <span key={idx} className="inline-flex items-center mx-6 text-[11px] font-semibold tracking-wider text-leaf-300 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2.5 ml-2.5 inline-block shrink-0 shadow-sm" />
                  {item}
                </span>
              ))}
            </div>
            <div className="inline-flex shrink-0 items-center" aria-hidden="true">
              {marqueeItems.map((item, idx) => (
                <span key={`dup-${idx}`} className="inline-flex items-center mx-6 text-[11px] font-semibold tracking-wider text-leaf-300 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2.5 ml-2.5 inline-block shrink-0 shadow-sm" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Quick Contact Helpline */}
        <div className="hidden xl:flex items-center gap-4 text-slate-300 shrink-0 pl-4 rtl:pr-4 rtl:pl-0 border-l rtl:border-r rtl:border-l-0 border-white/15 text-[11px]">
          <a 
            href={`tel:${COMPANY_INFO.primaryPhone}`} 
            className="flex items-center gap-1.5 hover:text-leaf-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-leaf-400" />
            <span>{t.callUs} <strong className="text-white font-mono">{COMPANY_INFO.primaryPhone}</strong></span>
          </a>
          <span className="text-white/20">|</span>
          <a 
            href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=Hello%20DAS%20Bahrain`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-leaf-400 hover:text-leaf-300 transition-colors font-semibold"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="glass-panel border-b border-slate-200/80 dark:border-white/10 px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-black p-0.5 border-2 border-leaf-500/80 shadow-md flex items-center justify-center shrink-0">
              <img 
                src={logoImg} 
                alt="DAS Bahrain Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-leaf-600 transition-colors whitespace-nowrap">
                  DAS <span className="text-leaf-600 dark:text-leaf-400">BAHRAIN</span>
                </span>
                <span className="text-[10px] bg-leaf-100 dark:bg-leaf-950 text-leaf-800 dark:text-leaf-300 border border-leaf-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider hidden md:inline-block">
                  Licensed
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate hidden sm:block">
                {language === 'ar' ? 'دار البابا سلام • موزع الساي كولا المعتمد' : 'Dar Al Baba Salam • Featuring Alsi Cola'}
              </span>
            </div>
          </div>

          {/* Desktop Search Bar with Live Results Dropdown */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onFocus={() => setIsSearchDropdownOpen(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(e);
                  } else if (e.key === 'Escape') {
                    setIsSearchDropdownOpen(false);
                  }
                }}
                className="w-full bg-slate-100 dark:bg-das-900/80 border border-slate-300 dark:border-white/15 focus:border-leaf-600 dark:focus:border-leaf-500 rounded-full py-2 px-10 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-leaf-500/30 transition-all shadow-sm"
              />
              <Search className={`absolute top-2.5 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    setIsSearchDropdownOpen(false);
                  }}
                  className={`absolute top-2.5 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white ${isRtl ? 'left-3.5' : 'right-3.5'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Instant Search Popup Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-das-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-white/15 overflow-hidden z-50 animate-fade-in">
                <div className="p-3 bg-slate-50 dark:bg-das-850 border-b border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {isRtl ? `نتائج البحث عن "${searchQuery}"` : `Matches for "${searchQuery}"`}
                  </span>
                  <span className="font-bold text-leaf-700 dark:text-leaf-400">
                    {matchedProducts.length} {isRtl ? 'منتج' : 'items'}
                  </span>
                </div>

                {matchedProducts.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5">
                    {matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className="p-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-das-850/80 cursor-pointer transition-colors group"
                      >
                        <img
                          src={p.image}
                          alt={isRtl ? p.nameAr : p.name}
                          className="w-12 h-12 rounded-xl object-contain p-1 bg-slate-100 dark:bg-das-800 shrink-0 border border-slate-200 dark:border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://alsicola.com/wp-content/uploads/2023/12/alsi-cola-soft-drink.png';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-leaf-600 dark:text-leaf-400 uppercase tracking-wider">
                              {isRtl ? p.brandAr : p.brand}
                            </span>
                            {p.tag && (
                              <span className="text-[9px] bg-leaf-100 dark:bg-leaf-950 text-leaf-800 dark:text-leaf-300 px-1.5 py-0.2 rounded font-semibold">
                                {isRtl ? p.tagAr || p.tag : p.tag}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-leaf-600 dark:group-hover:text-leaf-400 transition-colors">
                            {isRtl ? p.nameAr : p.name}
                          </h4>
                          <div className="flex items-baseline gap-2 mt-0.5 text-xs font-mono">
                            <span className="font-black text-slate-900 dark:text-white">
                              {p.singlePrice.toFixed(3)} BHD
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              ({p.singleVolume})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onAddToCart) onAddToCart(p, 'single', 1);
                            }}
                            className="p-1.5 rounded-lg bg-leaf-50 hover:bg-leaf-100 dark:bg-leaf-950/60 dark:hover:bg-leaf-900 text-leaf-700 dark:text-leaf-400 border border-leaf-300 dark:border-leaf-700/60 transition-colors"
                            title="Quick Add to Cart"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onQuickView) onQuickView(p);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-das-800 dark:hover:bg-das-700 text-slate-600 dark:text-slate-300 transition-colors"
                            title="Quick View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isRtl ? 'لا توجد نتائج مطابقة' : 'No matching products'}
                    </p>
                    <p className="text-[11px]">
                      {isRtl ? 'جرب البحث عن "كولا" أو "طاقة" أو استعرض الكتالوج بالأسفل.' : 'Try searching "cola", "energy", or explore the catalog below.'}
                    </p>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="p-2.5 bg-slate-50 dark:bg-das-850 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-leaf-700 dark:text-leaf-400 hover:text-leaf-800 dark:hover:text-leaf-300 flex items-center gap-1 transition-colors"
                  >
                    <span>{isRtl ? 'عرض كل النتائج في الكتالوج' : 'View all results in catalog'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchDropdownOpen(false)}
                    className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {t.closeModal}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
            <button 
              onClick={() => handleNavClick('products')}
              className="hover:text-leaf-600 dark:hover:text-leaf-400 transition-colors py-1"
            >
              {t.shop}
            </button>
            <button 
              onClick={() => handleNavClick('b2b')}
              className="flex items-center gap-1.5 hover:text-leaf-600 dark:hover:text-leaf-400 transition-colors py-1 group"
            >
              <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-leaf-600 dark:group-hover:text-leaf-400 transition-colors" />
              <span>{t.b2bWholesale}</span>
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="hover:text-leaf-600 dark:hover:text-leaf-400 transition-colors py-1"
            >
              {t.aboutUs}
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="hover:text-leaf-600 dark:hover:text-leaf-400 transition-colors py-1"
            >
              {t.contact}
            </button>
          </div>

          {/* Action Controls: Theme Toggle, Language Toggle, Cart Button & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Search Trigger for Mobile */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/5 shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Theme Toggle Button - hidden on mobile screens (< 640px) and present in mobile menu */}
            <button
              onClick={onToggleTheme}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 transition-colors shrink-0"
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
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-xs font-semibold text-slate-800 dark:text-white transition-colors shrink-0"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span>{t.languageToggle}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-leaf-600 to-leaf-500 hover:from-leaf-500 hover:to-leaf-600 text-white font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-leaf transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <ShoppingCart className="w-4 h-4 text-white shrink-0" />
              <span className="hidden sm:inline text-xs font-extrabold">{t.cart}</span>
              {cartCount > 0 && (
                <span className="bg-white text-leaf-800 text-[10px] sm:text-xs font-black px-1.5 py-0.2 rounded-full min-w-[1.1rem] text-center border border-leaf-400/40">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden md:inline text-xs border-l border-white/20 pl-2 font-mono">
                  {cartTotal.toFixed(3)} {t.fils}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle - ALWAYS VISIBLE with shrink-0 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 shrink-0"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-leaf-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown with Instant Results */}
        {searchOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-white/10 animate-fadeIn">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                    setSearchOpen(false);
                  }
                }}
                className="w-full bg-slate-100 dark:bg-das-900 border border-slate-300 dark:border-white/20 focus:border-leaf-600 rounded-xl py-2 px-10 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
              <Search className={`absolute top-2.5 w-4 h-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            </div>

            {searchQuery.trim().length > 0 && matchedProducts.length > 0 && (
              <div className="mt-2 bg-white dark:bg-das-900 rounded-xl border border-slate-200 dark:border-white/15 p-2 space-y-1.5 max-h-60 overflow-y-auto">
                {matchedProducts.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      handleSelectProduct(p);
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-das-800 cursor-pointer text-xs"
                  >
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-9 h-9 rounded-lg object-contain p-0.5 bg-slate-100 dark:bg-das-800 shrink-0 border border-slate-200 dark:border-white/10" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://alsicola.com/wp-content/uploads/2023/12/alsi-cola-soft-drink.png';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-slate-900 dark:text-white truncate">{isRtl ? p.nameAr : p.name}</h5>
                      <span className="text-[10px] text-leaf-600 font-mono font-bold">{p.singlePrice.toFixed(3)} BHD</span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    handleNavClick('products');
                    setSearchOpen(false);
                  }}
                  className="w-full text-center py-1.5 text-xs font-bold text-leaf-600 hover:text-leaf-700"
                >
                  {isRtl ? 'عرض النتائج في الكتالوج' : 'View all results in catalog'} →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 dark:border-white/10 space-y-2 pb-2 animate-fadeIn w-full max-w-full overflow-hidden">
            <button 
              onClick={() => handleNavClick('products')}
              className="w-full text-left rtl:text-right px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              {t.shop}
            </button>
            <button 
              onClick={() => handleNavClick('b2b')}
              className="w-full text-left rtl:text-right px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-leaf-600 shrink-0" />
                <span>{t.b2bWholesale}</span>
              </span>
              <span className="text-[10px] bg-leaf-100 text-leaf-800 dark:bg-leaf-950 dark:text-leaf-300 px-2 py-0.5 rounded font-semibold border border-leaf-500/20 shrink-0">Van Sales</span>
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
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between px-3 py-1 text-xs">
              <span className="text-slate-600 dark:text-slate-400 font-medium">{isRtl ? 'المظهر والوضع' : 'Theme Mode'}</span>
              <button
                onClick={onToggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white text-xs font-semibold"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isRtl ? 'الوضع النهاري' : 'Light Mode'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>{isRtl ? 'الوضع الليلي' : 'Dark Mode'}</span>
                  </>
                )}
              </button>
            </div>
            <div className="pt-1 flex flex-col gap-2 w-full max-w-full">
              <a 
                href={`https://wa.me/${COMPANY_INFO.centralSalesWhatsApp}?text=Hello%20Central%20Sales%20DAS%20Bahrain`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-leaf-500/10 border border-leaf-500/30 text-leaf-700 dark:text-leaf-400 text-xs font-bold w-full max-w-full"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span className="truncate text-[11px] sm:text-xs">
                  {isRtl ? 'واتساب المبيعات المركزية' : 'Central Sales WhatsApp'}: <span className="font-mono">{COMPANY_INFO.centralSalesDivision}</span>
                </span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
