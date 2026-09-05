import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Truck, 
  Store, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Flame, 
  CheckCircle2, 
  Package,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  MessageCircle,
  Eye,
  Check,
  Star,
  MapPin,
  Clock
} from 'lucide-react';
import { Language, Product, PackagingType } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO, PRODUCTS } from '../data/mockData';

interface HeroProps {
  language: Language;
  onExploreProducts: () => void;
  onExploreB2B: () => void;
  onAddToCart?: (product: Product, packagingType: PackagingType, quantity: number) => void;
  onQuickView?: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreProducts,
  onExploreB2B,
  onAddToCart,
  onQuickView
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Background rotating slideshow images (4 authentic distributor template images)
  const heroBackdrops = [
    {
      url: 'https://alsicolabh.tfwgsite.com/assets/gardner-hero-3-CAIUPCbG.jpg',
      alt: 'Dar Al Baba Salam daily neighborhood van sales route across Bahrain'
    },
    {
      url: 'https://alsicolabh.tfwgsite.com/assets/gardner-hero-1-HGdNez6Y.jpg',
      alt: 'Central Logistics Hub in Hidd Bahrain'
    },
    {
      url: 'https://alsicolabh.tfwgsite.com/assets/gardner-hero-2-1DU4nM6X.jpg',
      alt: 'Alsi Cola Bahrain retail display stands and branded drink coolers'
    },
    {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
      alt: 'High-capacity wholesale warehouse pallets and containers'
    }
  ];

  const [bgIndex, setBgIndex] = useState(0);

  // Rotate hero backdrops every 6.5 seconds
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackdrops.length);
    }, 6500);
    return () => clearInterval(bgTimer);
  }, [heroBackdrops.length]);

  // Featured top products for the dynamic interactive slideshow
  const topProducts = PRODUCTS.slice(0, 5);
  const [productSlideIndex, setProductSlideIndex] = useState(0);
  const [packagingType, setPackagingType] = useState<PackagingType>('single');
  const [isPaused, setIsPaused] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Auto-advance top products carousel
  useEffect(() => {
    if (isPaused) return;
    const slideTimer = setInterval(() => {
      setProductSlideIndex((prev) => (prev + 1) % topProducts.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [isPaused, topProducts.length]);

  const currentProduct = topProducts[productSlideIndex];
  const currentPrice = packagingType === 'single' ? currentProduct.singlePrice : currentProduct.cartonPrice;
  const currentVolume = packagingType === 'single' ? currentProduct.singleVolume : currentProduct.cartonLabel;

  const handleNextSlide = () => {
    setProductSlideIndex((prev) => (prev + 1) % topProducts.length);
  };

  const handlePrevSlide = () => {
    setProductSlideIndex((prev) => (prev - 1 + topProducts.length) % topProducts.length);
  };

  const handleQuickAdd = () => {
    if (onAddToCart) {
      onAddToCart(currentProduct, packagingType, 1);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1600);
    }
  };

  const getWhatsAppProductLink = () => {
    const itemName = isRtl ? currentProduct.nameAr : currentProduct.name;
    const pkgName = packagingType === 'single' ? currentProduct.singleVolume : currentProduct.cartonLabel;
    const totalCost = currentPrice.toFixed(3);
    const text = encodeURIComponent(
      `Hello DAS Bahrain, I would like to order directly from the featured showcase:\n• Product: ${itemName}\n• Packaging: ${pkgName}\n• Price: ${totalCost} BHD\nPlease confirm availability and delivery time.`
    );
    return `https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${text}`;
  };

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-24 overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Background Slideshow with Authentic Bahrain Distributor Operations */}
      <div className="absolute inset-0 z-0">
        {heroBackdrops.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover object-center animate-ken-burns scale-105"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Atmospheric Transparent Glass Overlay - keeps authentic background visible while text stays sharp */}
      <div className="absolute inset-0 z-10 bg-white/45 md:bg-white/35 dark:bg-das-950/75 backdrop-blur-[0.5px]" />

      {/* Subtle Botanical Leaf Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[350px] bg-leaf-500/10 blur-[130px] rounded-full pointer-events-none z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column: Headline, Trust Pill & Action Buttons in Transparent Glass Panel */}
          <div className="lg:col-span-7 flex flex-col items-start text-left rtl:text-right p-6 sm:p-8 lg:p-10 rounded-3xl bg-white/40 dark:bg-das-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-soft transition-all">
            
            {/* Natural Leaf Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-leaf-500/15 dark:bg-leaf-950/80 border border-leaf-500/30 dark:border-leaf-700/60 text-leaf-900 dark:text-leaf-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-leaf-500 animate-pulse" />
              <span>{isRtl ? 'مملكة البحرين • الوكيل المعتمد لمشروبات الساي كولا' : 'Kingdom of Bahrain • Licensed Alsi Cola Distributor'}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] mb-5 text-slate-950 dark:text-white">
              <span className="block text-slate-900 dark:text-slate-100 font-extrabold text-2xl sm:text-3xl mb-1.5 drop-shadow-sm">
                {t.heroTitlePrefix}
              </span>
              <span className="bg-gradient-to-r from-slate-950 via-leaf-800 to-leaf-600 dark:from-white dark:via-leaf-200 dark:to-leaf-400 bg-clip-text text-transparent drop-shadow-sm">
                {t.heroTitleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 max-w-2xl leading-relaxed mb-7 font-medium drop-shadow-xs">
              {t.heroSubTitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-7">
              <button
                onClick={onExploreProducts}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-leaf-600 to-leaf-500 hover:from-leaf-500 hover:to-leaf-600 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-leaf transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <span>{t.heroCtaShop}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreB2B}
                className="flex items-center justify-center gap-2.5 bg-white/90 dark:bg-das-850/90 backdrop-blur-md hover:bg-white dark:hover:bg-das-800 border border-slate-300/80 dark:border-white/15 text-slate-900 dark:text-white font-bold px-7 py-3.5 rounded-2xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <Store className="w-4 h-4 text-leaf-600 dark:text-leaf-400" />
                <span>{t.heroCtaB2b}</span>
              </button>
            </div>

            {/* Realistic Trust Checkmarks with Nature Green Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-5 border-t border-slate-300/60 dark:border-white/10 text-xs text-slate-900 dark:text-slate-100 font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-leaf-100 dark:bg-leaf-950 text-leaf-700 dark:text-leaf-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-medium">{language === 'ar' ? 'توصيل لجميع مناطق البحرين' : 'Island-wide Bahrain Delivery'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-leaf-100 dark:bg-leaf-950 text-leaf-700 dark:text-leaf-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-medium">{language === 'ar' ? 'توريد يومي لأسواق وبقالات البحرين' : 'Daily Van Sales for Stores'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-leaf-100 dark:bg-leaf-950 text-leaf-700 dark:text-leaf-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-medium">{language === 'ar' ? 'دفع آمن عبر بنفت بي وواتساب' : 'BenefitPay & WhatsApp Ready'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Top Products Slideshow / Interactive Showcase */}
          <div 
            className="lg:col-span-5 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Showcase Interactive Card - Transparent Glass Panel */}
              <div className="relative rounded-3xl p-6 sm:p-7 bg-white/40 dark:bg-das-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 overflow-hidden shadow-soft transition-all">
                
                {/* Visual Header with Slide Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-leaf-500 animate-ping" />
                    <span className="text-xs font-black text-leaf-700 dark:text-leaf-400 tracking-wider uppercase">
                      {isRtl ? 'أبرز منتجات التوزيع اليومية' : 'Top Featured Lineup'}
                    </span>
                  </div>

                  {/* Prev / Next Slide Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevSlide}
                      className="w-7 h-7 rounded-full bg-white/70 hover:bg-white dark:bg-das-800 dark:hover:bg-das-700 text-slate-700 dark:text-white flex items-center justify-center transition-colors border border-slate-200 dark:border-white/10 shadow-sm"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 px-1">
                      {productSlideIndex + 1}/{topProducts.length}
                    </span>
                    <button
                      onClick={handleNextSlide}
                      className="w-7 h-7 rounded-full bg-white/70 hover:bg-white dark:bg-das-800 dark:hover:bg-das-700 text-slate-700 dark:text-white flex items-center justify-center transition-colors border border-slate-200 dark:border-white/10 shadow-sm"
                      aria-label="Next product"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Image Stage */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-gradient-to-b from-slate-200/50 to-slate-300/40 dark:from-das-800/80 dark:to-das-950/90 border border-white/40 dark:border-white/10 group flex items-center justify-center p-3">
                  <img
                    src={currentProduct.image}
                    alt={isRtl ? currentProduct.nameAr : currentProduct.name}
                    className="h-full w-auto max-h-[90%] object-contain transition-transform duration-700 group-hover:scale-105 filter drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-leaf-500 text-white shadow-md">
                      {isRtl ? currentProduct.tagAr || currentProduct.tag : currentProduct.tag}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-black/70 text-slate-900 dark:text-white backdrop-blur-sm border border-white/20">
                      {isRtl ? currentProduct.brandAr : currentProduct.brand}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white pointer-events-none">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-mono mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{currentProduct.rating}</span>
                      <span className="text-[10px] text-white/70">({currentProduct.reviewsCount} reviews)</span>
                    </div>
                    <h3 className="text-lg font-black leading-tight drop-shadow-md">
                      {isRtl ? currentProduct.nameAr : currentProduct.name}
                    </h3>
                  </div>
                </div>

                {/* Packaging Switcher */}
                <div className="p-1 rounded-xl bg-white/60 dark:bg-das-950/60 backdrop-blur-sm border border-white/40 dark:border-white/10 flex items-center gap-1 text-xs mb-4">
                  <button
                    onClick={() => setPackagingType('single')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-xs transition-all ${
                      packagingType === 'single'
                        ? 'bg-leaf-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t.singleUnit} ({currentProduct.singleVolume})
                  </button>
                  <button
                    onClick={() => setPackagingType('carton')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1 ${
                      packagingType === 'carton'
                        ? 'bg-leaf-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{t.cartonPack}</span>
                    <span className="text-[10px] bg-black/20 text-white px-1.5 py-0.2 rounded font-mono">
                      ×{currentProduct.cartonUnits}
                    </span>
                  </button>
                </div>

                {/* Price and Cart Action Bar */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/40 dark:border-white/10">
                  <div>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 block">
                      {isRtl ? 'السعر الرسمي المعتمد:' : 'Official Price:'}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {currentPrice.toFixed(3)}
                      </span>
                      <span className="text-xs font-bold text-leaf-700 dark:text-leaf-400">
                        {t.fils}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleQuickAdd}
                      className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition-all ${
                        addedAnimation
                          ? 'bg-leaf-700 text-white'
                          : 'bg-leaf-600 hover:bg-leaf-500 text-white shadow-leaf hover:scale-105'
                      }`}
                    >
                      {addedAnimation ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{t.addedToCart}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>{t.addToCart}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getWhatsAppProductLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-das-800 dark:hover:bg-das-700 text-leaf-700 dark:text-leaf-400 border border-slate-200 dark:border-white/10 transition-colors"
                      title={t.whatsappQuickOrder}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Carousel Pagination Dots */}
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  {topProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setProductSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        productSlideIndex === idx
                          ? 'w-6 bg-leaf-600'
                          : 'w-1.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative Nature Glow Behind Card */}
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-leaf-500/20 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Bottom Metrics & Van Sales Live Banner with Transparent Glass Panel */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-das-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-leaf-100 dark:bg-leaf-950 text-leaf-700 dark:text-leaf-400 border border-leaf-300 dark:border-leaf-700/50 flex items-center justify-center shrink-0 shadow-sm">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{t.stat1Val}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.stat1Label}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:border-x border-slate-200 dark:border-white/10 md:px-6">
            <div className="w-12 h-12 rounded-2xl bg-leaf-100 dark:bg-leaf-950 text-leaf-700 dark:text-leaf-400 border border-leaf-300 dark:border-leaf-700/50 flex items-center justify-center shrink-0 shadow-sm">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{t.stat2Val}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.stat2Label}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:pl-2">
            <div className="w-12 h-12 rounded-2xl bg-leaf-100 dark:bg-leaf-950 text-leaf-700 dark:text-leaf-400 border border-leaf-300 dark:border-leaf-700/50 flex items-center justify-center shrink-0 shadow-sm">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{t.stat3Val}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.stat3Label}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

