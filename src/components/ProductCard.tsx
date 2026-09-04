import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Eye, 
  MessageCircle, 
  Star, 
  Check, 
  Sparkles,
  Layers,
  Plus,
  Minus
} from 'lucide-react';
import { Product, PackagingType, Language } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO } from '../data/mockData';

interface ProductCardProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product, packagingType: PackagingType, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onAddToCart,
  onQuickView,
}) => {
  const [packagingType, setPackagingType] = useState<PackagingType>('single');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const t = translations[language];
  const isArabic = language === 'ar';

  const currentPrice = packagingType === 'single' ? product.singlePrice : product.cartonPrice;
  const currentVolume = packagingType === 'single' ? product.singleVolume : product.cartonLabel;

  const handleAdd = () => {
    onAddToCart(product, packagingType, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  // Pre-fill WhatsApp message for quick single-product ordering
  const getWhatsAppProductLink = () => {
    const itemName = isArabic ? product.nameAr : product.name;
    const pkgName = packagingType === 'single' ? product.singleVolume : product.cartonLabel;
    const totalCost = (currentPrice * quantity).toFixed(3);
    const text = encodeURIComponent(
      `Hello DAS Bahrain, I would like to order:\n• Product: ${itemName}\n• Packaging: ${pkgName}\n• Quantity: ${quantity}\n• Total: ${totalCost} BHD\nPlease confirm availability and delivery time.`
    );
    return `https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${text}`;
  };

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-das-850/80 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-950/40">
      
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-gradient-to-b dark:from-das-800 dark:to-das-900 flex items-center justify-center p-3">
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={isArabic ? product.nameAr : product.name}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.tag && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-emerald-500 text-black shadow-md">
              {isArabic ? product.tagAr || product.tag : product.tag}
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-500/30 backdrop-blur-sm">
              Popular
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-black/70 hover:bg-emerald-500 text-white hover:text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl"
          title={t.quickView}
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
              {isArabic ? product.brandAr : product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-mono text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 min-h-[3rem]">
            {isArabic ? product.nameAr : product.name}
          </h3>

          {/* Packaging Selector Toggle */}
          <div className="mt-3 p-1 rounded-xl bg-slate-100 dark:bg-das-900 border border-slate-200 dark:border-white/10 flex items-center gap-1 text-xs">
            <button
              onClick={() => setPackagingType('single')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-all ${
                packagingType === 'single'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.singleUnit}
            </button>
            <button
              onClick={() => setPackagingType('carton')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                packagingType === 'carton'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{t.cartonPack}</span>
              <span className="text-[9px] bg-black/20 dark:bg-black/30 text-slate-800 dark:text-white px-1 py-0.2 rounded font-mono">
                ×{product.cartonUnits}
              </span>
            </button>
          </div>

          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span className="text-slate-400 dark:text-slate-500">{isArabic ? 'العبوة: ' : 'Package: '}</span>
            <strong className="text-slate-700 dark:text-slate-300">{currentVolume}</strong>
          </div>
        </div>

        {/* Pricing & Cart Action Block */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {currentPrice.toFixed(3)}
              </span>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 ml-1.5">
                {t.fils}
              </span>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center rounded-lg bg-slate-100 dark:bg-das-900 border border-slate-200 dark:border-white/15 px-1.5 py-0.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-mono font-bold text-slate-900 dark:text-white min-w-[1.5rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={handleAdd}
              className={`col-span-4 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                isAdded
                  ? 'bg-emerald-400 text-black'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
              }`}
            >
              {isAdded ? (
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

            {/* Direct WhatsApp Order Icon */}
            <a
              href={getWhatsAppProductLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-das-900 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 hover:border-emerald-500 transition-colors"
              title={t.whatsappQuickOrder}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
