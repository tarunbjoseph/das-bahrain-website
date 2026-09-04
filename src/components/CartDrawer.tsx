import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  MessageCircle, 
  CreditCard, 
  Truck, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { CartItem, Language } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: Language;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isFreeDelivery = subtotal >= COMPANY_INFO.freeDeliveryThreshold;
  const deliveryFee = subtotal > 0 ? (isFreeDelivery ? 0 : COMPANY_INFO.standardDeliveryFee) : 0;
  const total = subtotal + deliveryFee;
  const remainingForFree = Math.max(0, COMPANY_INFO.freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / COMPANY_INFO.freeDeliveryThreshold) * 100);

  // Instant WhatsApp Quick Order from Cart
  const handleQuickWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let itemsList = items.map((item, idx) => {
      const name = isArabic ? item.product.nameAr : item.product.name;
      const pkg = item.packagingType === 'single' ? item.product.singleVolume : item.product.cartonLabel;
      const lineCost = (item.unitPrice * item.quantity).toFixed(3);
      return `${idx + 1}. *${name}* (${pkg})\n   Qty: ${item.quantity} | ${lineCost} BHD`;
    }).join('\n');

    const msg = encodeURIComponent(
      `*🛒 NEW ORDER - DAS BAHRAIN ONLINE STORE*\n` +
      `----------------------------------------\n` +
      `${itemsList}\n` +
      `----------------------------------------\n` +
      `• *Subtotal:* ${subtotal.toFixed(3)} BHD\n` +
      `• *Delivery:* ${deliveryFee === 0 ? 'FREE' : `${deliveryFee.toFixed(3)} BHD`}\n` +
      `• *Total Amount:* ${total.toFixed(3)} BHD\n` +
      `----------------------------------------\n` +
      `Please confirm my order. I will provide my delivery address.`
    );

    window.open(`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className={`fixed inset-y-0 ${isArabic ? 'left-0' : 'right-0'} max-w-full flex pl-10`}>
        <div className="w-screen max-w-md bg-das-900 border-l rtl:border-r rtl:border-l-0 border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-black text-white">
                {t.yourCart}
              </h2>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {items.length} {t.items}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          {subtotal > 0 && (
            <div className="bg-das-850 px-5 py-3 border-b border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className={isFreeDelivery ? 'text-emerald-400' : 'text-slate-300'}>
                    {isFreeDelivery ? t.freeDeliveryUnlocked : `${t.freeDeliveryPrompt} ${remainingForFree.toFixed(3)} ${t.fils} ${t.moreForFreeDelivery}`}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  {Math.round(freeDeliveryProgress)}%
                </span>
              </div>
              <div className="w-full h-2 bg-das-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-das-800 flex items-center justify-center text-slate-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  {t.cartEmptyTitle}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  {t.cartEmptyDesc}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors"
                >
                  {t.startShopping}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const currentPrice = item.unitPrice;
                const totalItemCost = (currentPrice * item.quantity).toFixed(3);
                const pkgLabel = item.packagingType === 'single' ? item.product.singleVolume : item.product.cartonLabel;

                return (
                  <div 
                    key={item.id}
                    className="flex gap-3 p-3 rounded-2xl bg-das-850/80 border border-white/5 hover:border-white/10 transition-all"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-das-800 shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={isArabic ? item.product.nameAr : item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {isArabic ? item.product.nameAr : item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-medium block">
                          {pkgLabel}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center rounded-lg bg-das-900 border border-white/10 px-1 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right rtl:text-left">
                          <span className="text-sm font-black text-white font-mono">
                            {totalItemCost}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 ml-1">
                            {t.fils}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Buttons */}
          {items.length > 0 && (
            <div className="p-5 bg-das-850 border-t border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>{t.subtotal}</span>
                  <span className="font-mono text-white font-bold">{subtotal.toFixed(3)} {t.fils}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>{t.deliveryFee}</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {deliveryFee === 0 ? t.freeDelivery : `${deliveryFee.toFixed(3)} ${t.fils}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-base font-black text-white">
                  <span>{t.orderTotal}</span>
                  <span className="font-mono text-emerald-400 text-lg">{total.toFixed(3)} {t.fils}</span>
                </div>
              </div>

              {/* Action 1: Instant WhatsApp Order */}
              <button
                onClick={handleQuickWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>{t.checkoutViaWhatsApp}</span>
              </button>

              {/* Action 2: Online BenefitPay / Card Gateway Checkout */}
              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-das-800 hover:bg-das-700 text-white font-bold text-xs border border-white/10 transition-colors"
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>{t.checkoutViaOnline}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
