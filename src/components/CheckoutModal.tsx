import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  MessageCircle, 
  Truck, 
  MapPin, 
  ShieldCheck,
  Send,
  Building,
  Phone,
  User,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { CartItem, Language, CheckoutDetails } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO, BAHRAIN_GOVERNORATES } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: Language;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  language,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [form, setForm] = useState<CheckoutDetails>({
    customerName: '',
    phoneNumber: '',
    email: '',
    governorate: 'capital',
    block: '',
    road: '',
    building: '',
    notes: '',
    paymentMethod: 'whatsapp',
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isFreeDelivery = subtotal >= COMPANY_INFO.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : COMPANY_INFO.standardDeliveryFee;
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `DAS-BH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    onClearCart();
  };

  const handleSendOrderViaWhatsApp = () => {
    const selectedGov = BAHRAIN_GOVERNORATES.find(g => g.id === form.governorate);
    const govName = isArabic ? selectedGov?.nameAr : selectedGov?.name;

    const itemsSummary = items.map((it, idx) => {
      const name = isArabic ? it.product.nameAr : it.product.name;
      const pkg = it.packagingType === 'single' ? it.product.singleVolume : it.product.cartonLabel;
      return `${idx + 1}. *${name}* (${pkg})\n   Qty: ${it.quantity} | ${(it.unitPrice * it.quantity).toFixed(3)} BHD`;
    }).join('\n');

    const text = encodeURIComponent(
      `*🛒 OFFICIAL ORDER CONFIRMATION - DAS BAHRAIN*\n` +
      `*Order ID:* ${orderId}\n` +
      `----------------------------------------\n` +
      `*Customer:* ${form.customerName}\n` +
      `*Phone:* ${form.phoneNumber}\n` +
      `*Delivery Area:* ${govName}\n` +
      `*Address:* Block ${form.block || 'N/A'}, Road ${form.road || 'N/A'}, Bldg/House ${form.building || 'N/A'}\n` +
      `*Payment Method:* ${form.paymentMethod.toUpperCase()}\n` +
      `----------------------------------------\n` +
      `*ITEMS:*\n${itemsSummary}\n` +
      `----------------------------------------\n` +
      `• *Subtotal:* ${subtotal.toFixed(3)} BHD\n` +
      `• *Delivery:* ${deliveryFee === 0 ? 'FREE' : `${deliveryFee.toFixed(3)} BHD`}\n` +
      `• *Grand Total:* ${total.toFixed(3)} BHD\n` +
      `----------------------------------------\n` +
      `Thank you for shopping with Dar Al Baba Salam!`
    );

    window.open(`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-das-900 border border-slate-200 dark:border-white/15 rounded-3xl overflow-hidden shadow-2xl animate-scaleUp max-h-[92vh] flex flex-col transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {orderComplete ? t.orderSuccessTitle : t.checkoutTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {orderComplete ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                  {orderId}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {t.orderSuccessTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1">
                  {t.orderSuccessDesc}
                </p>
              </div>

              {/* BenefitPay Prompt if selected */}
              {form.paymentMethod === 'benefitpay' && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-das-850 border border-emerald-500/30 max-w-sm mx-auto text-left rtl:text-right">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                      Benefit
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">BenefitPay Instant QR</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.benefitPayQrPrompt}</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl mx-auto w-36 h-36 flex items-center justify-center shadow-md">
                    <QrCode className="w-28 h-28 text-black" />
                  </div>
                  <div className="text-center mt-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    Amount: {total.toFixed(3)} BHD
                  </div>
                </div>
              )}

              {/* Summary details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-das-850 border border-slate-200 dark:border-white/10 max-w-md mx-auto text-xs text-slate-700 dark:text-slate-300 space-y-2 text-left rtl:text-right">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{isArabic ? 'العميل:' : 'Customer:'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{form.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{isArabic ? 'الهاتف:' : 'Phone:'}</span>
                  <span className="font-mono text-slate-900 dark:text-white">{form.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{isArabic ? 'المبلغ الكلي:' : 'Total Amount:'}</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">{total.toFixed(3)} BHD</span>
                </div>
              </div>

              {/* WhatsApp Trigger Button */}
              <div className="space-y-2 max-w-md mx-auto">
                <button
                  onClick={handleSendOrderViaWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm shadow-xl shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>{isArabic ? 'إرسال تفاصيل الطلب لمسؤول التوصيل عبر واتساب' : 'Dispatch Order Summary to WhatsApp'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {t.closeModal}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Delivery Info */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.deliveryInfoTitle}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">{t.fullNameLabel} *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammed Al Khalifa"
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-das-800 border border-slate-300 dark:border-white/10 rounded-xl py-2 px-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">{t.mobileLabel} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+973 3XXXXXXX"
                      value={form.phoneNumber}
                      onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-das-800 border border-slate-300 dark:border-white/10 rounded-xl py-2 px-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">{t.governorateLabel} *</label>
                    <select
                      value={form.governorate}
                      onChange={(e) => setForm({ ...form, governorate: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-das-800 border border-slate-300 dark:border-white/10 rounded-xl py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      {BAHRAIN_GOVERNORATES.map((gov) => (
                        <option key={gov.id} value={gov.id} className="bg-white dark:bg-das-900 text-slate-900 dark:text-white">
                          {isArabic ? gov.nameAr : gov.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">{t.blockLabel}</label>
                    <input
                      type="text"
                      placeholder="e.g. 115"
                      value={form.block}
                      onChange={(e) => setForm({ ...form, block: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-das-800 border border-slate-300 dark:border-white/10 rounded-xl py-2 px-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">{t.roadLabel}</label>
                    <input
                      type="text"
                      placeholder="e.g. Road 1527"
                      value={form.road}
                      onChange={(e) => setForm({ ...form, road: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-das-800 border border-slate-300 dark:border-white/10 rounded-xl py-2 px-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">{t.buildingLabel}</label>
                    <input
                      type="text"
                      placeholder="e.g. Building 2000, Flat 4"
                      value={form.building}
                      onChange={(e) => setForm({ ...form, building: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-das-800 border border-slate-300 dark:border-white/10 rounded-xl py-2 px-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.paymentOptionTitle}</span>
                </h3>

                <div className="space-y-2 text-xs">
                  {/* WhatsApp COD */}
                  <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    form.paymentMethod === 'whatsapp' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-slate-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-das-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'whatsapp'}
                      onChange={() => setForm({ ...form, paymentMethod: 'whatsapp' })}
                      className="accent-emerald-500"
                    />
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div className="flex-1">
                      <strong className="block text-slate-900 dark:text-white">{t.payWhatsAppMethod}</strong>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isArabic ? 'تأكيد فوري عبر واتساب ودفع نقد أو بنفت بي عند وصول المندوب' : 'Instant WhatsApp receipt & pay on delivery'}
                      </span>
                    </div>
                  </label>

                  {/* BenefitPay */}
                  <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    form.paymentMethod === 'benefitpay' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-slate-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-das-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'benefitpay'}
                      onChange={() => setForm({ ...form, paymentMethod: 'benefitpay' })}
                      className="accent-emerald-500"
                    />
                    <QrCode className="w-4 h-4 text-red-500 shrink-0" />
                    <div className="flex-1">
                      <strong className="block text-slate-900 dark:text-white">{t.payBenefitPayMethod}</strong>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isArabic ? 'الدفع المباشر عبر تطبيق بنفت بي الوطني برمز الاستجابة السريعة' : 'Bahrain National Instant Payment QR'}
                      </span>
                    </div>
                  </label>

                  {/* Card */}
                  <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    form.paymentMethod === 'card' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-slate-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-das-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'card'}
                      onChange={() => setForm({ ...form, paymentMethod: 'card' })}
                      className="accent-emerald-500"
                    />
                    <CreditCard className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                    <div className="flex-1">
                      <strong className="block text-slate-900 dark:text-white">{t.payCardMethod}</strong>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isArabic ? 'فيزا، ماستركارد، مدى (بوابة آمنة مشفرة)' : 'Visa / Mastercard / Debit card'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary Line */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-das-850 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">{isArabic ? 'المبلغ المطلوب سداده:' : 'Total Payable:'}</span>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    {total.toFixed(3)} <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{t.fils}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <span>{t.confirmAndPlaceOrder}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
