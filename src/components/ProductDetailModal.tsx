import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Package, 
  Clock, 
  MapPin, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';
import { Product, PackagingType, Language } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: Product, packagingType: PackagingType, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  language,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [packagingType, setPackagingType] = useState<PackagingType>('single');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const t = translations[language];
  const isArabic = language === 'ar';

  const currentPrice = packagingType === 'single' ? product.singlePrice : product.cartonPrice;
  const currentVolume = packagingType === 'single' ? product.singleVolume : product.cartonLabel;

  const handleAdd = () => {
    onAddToCart(product, packagingType, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-das-900 border border-slate-200 dark:border-white/15 rounded-3xl overflow-hidden shadow-2xl animate-scaleUp max-h-[90vh] flex flex-col transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-black/60 dark:hover:bg-white/20 text-slate-700 dark:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            
            {/* Image Column */}
            <div className="sm:col-span-5 aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-das-800 border border-slate-200 dark:border-white/10 relative">
              <img
                src={product.image}
                alt={isArabic ? product.nameAr : product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546173159-315724a31d9b?auto=format&fit=crop&w=600&q=80';
                }}
              />
              {product.tag && (
                <div className="absolute top-3 left-3 bg-leaf-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
                  {isArabic ? product.tagAr || product.tag : product.tag}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="sm:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-leaf-700 dark:text-leaf-400 uppercase tracking-wider">
                  {isArabic ? product.brandAr : product.brand}
                </span>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 mb-2">
                  {isArabic ? product.nameAr : product.name}
                </h2>

                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-mono">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold">{product.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{product.reviewsCount} {t.ratingReviews}</span>
                  <span>•</span>
                  <span className="text-leaf-700 dark:text-leaf-400 font-semibold">{t.inStock}</span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isArabic ? product.descriptionAr : product.description}
                </p>
              </div>

              {/* Packaging Selector */}
              <div className="mt-5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  {isArabic ? 'اختر نوع العبوة' : 'Select Packaging'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPackagingType('single')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-start transition-all ${
                      packagingType === 'single'
                        ? 'border-leaf-500 bg-leaf-50 dark:bg-leaf-950/40 text-leaf-950 dark:text-white shadow-sm'
                        : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-das-800/60 text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <span>{t.singleUnit}</span>
                    <span className="text-[10px] text-leaf-700 dark:text-leaf-400 font-mono mt-0.5">
                      {product.singleVolume}
                    </span>
                  </button>

                  <button
                    onClick={() => setPackagingType('carton')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-start transition-all ${
                      packagingType === 'carton'
                        ? 'border-leaf-500 bg-leaf-50 dark:bg-leaf-950/40 text-leaf-950 dark:text-white shadow-sm'
                        : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-das-800/60 text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <span>{t.cartonPack}</span>
                    <span className="text-[10px] text-leaf-700 dark:text-leaf-400 font-mono mt-0.5">
                      {product.cartonLabel}
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Specifications Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-das-800/60 border border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                  {isArabic ? 'المصدر والتوزيع' : 'Origin & Distribution'}
                </span>
                <span className="text-slate-900 dark:text-white font-medium">{product.specifications.origin}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                  {isArabic ? 'مواصفات التغليف' : 'Packaging Specs'}
                </span>
                <span className="text-slate-900 dark:text-white font-medium">{product.specifications.packaging}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                  {isArabic ? 'فترة الصلاحية' : 'Shelf Life'}
                </span>
                <span className="text-slate-900 dark:text-white font-medium">{product.specifications.shelfLife}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Add to Cart Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">
                {isArabic ? 'السعر الإجمالي:' : 'Price:'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {(currentPrice * quantity).toFixed(3)}
                </span>
                <span className="text-sm font-bold text-leaf-600 dark:text-leaf-400">{t.fils}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Stepper */}
              <div className="flex items-center rounded-xl bg-slate-100 dark:bg-das-800 border border-slate-200 dark:border-white/15 px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-mono font-bold text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all ${
                  added 
                    ? 'bg-leaf-500 text-white' 
                    : 'bg-leaf-600 hover:bg-leaf-500 text-white shadow-md shadow-leaf-600/25'
                }`}
              >
                {added ? (
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

              {/* WhatsApp Quick Link */}
              <a
                href={getWhatsAppProductLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-100 hover:bg-leaf-50 dark:bg-das-800 dark:hover:bg-leaf-950/40 text-leaf-700 dark:text-leaf-400 border border-leaf-300 dark:border-leaf-800 transition-colors"
                title={t.whatsappQuickOrder}
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
