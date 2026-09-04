import React, { useState } from 'react';
import { 
  Building2, 
  Truck, 
  Store, 
  Layers, 
  ShieldCheck, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Send,
  PhoneCall,
  Clock,
  Sparkles
} from 'lucide-react';
import { Language, B2BInquiry } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO, BAHRAIN_GOVERNORATES } from '../data/mockData';

interface B2BWholesaleSectionProps {
  language: Language;
}

export const B2BWholesaleSection: React.FC<B2BWholesaleSectionProps> = ({ language }) => {
  const t = translations[language];
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState<B2BInquiry>({
    businessName: '',
    crNumber: '',
    contactPerson: '',
    phone: '',
    email: '',
    governorate: 'capital',
    storeType: 'Cold Store / Bakala',
    productInterests: ['Alsi Cola Soft Drinks', 'Code Red Energy Drinks'],
    estimatedWeeklyCartons: '10 - 50 Cartons',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const productOptions = [
    { id: 'Alsi Cola Soft Drinks', labelEn: 'Alsi Cola Soft Drinks (Classic/Zero/Citrus)', labelAr: 'مشروبات الساي كولا (كلاسيك/زيرو/ليمون)' },
    { id: 'Code Red Energy Drinks', labelEn: 'Code Red & Code Mix Energy Drinks', labelAr: 'مشروبات الطاقة كود ريد وكود ميكس' },
    { id: 'Dry Food & Pantry', labelEn: 'Specialty Coffee, Honey & Pantry Foods', labelAr: 'القهوة الفاخرة، العسل والمواد التموينية' },
    { id: 'Confectionery & Wafers', labelEn: 'Confectionery, Chocolates & Wafers', labelAr: 'الحلويات والشوكولاتة والبسكويت' },
    { id: 'Dairy & Frozen Food', labelEn: 'Chilled Cheeses & Frozen Portions', labelAr: 'الألبان المبردة والأغذية المجمدة' },
    { id: 'Hygiene & Consumables', labelEn: 'Sanitizers & Non-Food Consumables', labelAr: 'المنظفات والمستهلكات غير الغذائية' },
  ];

  const handleCheckboxToggle = (interestId: string) => {
    setFormData((prev) => {
      const exists = prev.productInterests.includes(interestId);
      if (exists) {
        return {
          ...prev,
          productInterests: prev.productInterests.filter((item) => item !== interestId),
        };
      } else {
        return {
          ...prev,
          productInterests: [...prev.productInterests, interestId],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct rich formatted WhatsApp message for Central Sales Division
    const selectedGov = BAHRAIN_GOVERNORATES.find(g => g.id === formData.governorate);
    const govName = isArabic ? selectedGov?.nameAr : selectedGov?.name;

    const message = encodeURIComponent(
      `*🏛️ NEW B2B / VAN SALES INQUIRY - DAS BAHRAIN*\n` +
      `----------------------------------------\n` +
      `• *Business Name:* ${formData.businessName}\n` +
      `• *CR Number:* ${formData.crNumber || 'Pending / N/A'}\n` +
      `• *Contact Person:* ${formData.contactPerson}\n` +
      `• *Phone / WhatsApp:* ${formData.phone}\n` +
      `• *Governorate / Area:* ${govName}\n` +
      `• *Business Type:* ${formData.storeType}\n` +
      `• *Est. Weekly Volume:* ${formData.estimatedWeeklyCartons}\n` +
      `• *Products Needed:*\n  - ${formData.productInterests.join('\n  - ')}\n` +
      (formData.notes ? `• *Notes / Schedule:* ${formData.notes}\n` : '') +
      `----------------------------------------\n` +
      `Sent via DAS Bahrain B2B Distribution Portal`
    );

    // Open WhatsApp to Central Sales Division
    window.open(`https://wa.me/${COMPANY_INFO.centralSalesWhatsApp}?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="b2b" className="py-20 bg-gradient-to-b from-das-950 via-das-900 to-das-950 relative overflow-hidden border-y border-white/10">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4" />
            <span>{t.b2bBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.b2bTitle}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {t.b2bSubtitle}
          </p>
        </div>

        {/* 3 Pillars of Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Pillar 1: Van Sales */}
          <div className="p-8 rounded-3xl glass-panel border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-400 transition-all shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500 text-black">
                Core Operation
              </span>
              <span className="text-xs text-slate-400 font-mono">Daily Route</span>
            </div>

            <h3 className="text-xl font-black text-white mb-3">
              {t.vanSalesTitle}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {t.vanSalesDesc}
            </p>

            <ul className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isArabic ? 'كميات مرنة وتوريد يومي حسب الحاجة' : 'Small batch daily restocking'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isArabic ? 'توفير ستاندات ومواد دعائية مجانية' : 'Branded floor & counter display stands'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isArabic ? 'فواتير إلكترونية فورية عند التسليم' : 'On-the-spot electronic invoicing'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Supermarkets & Hypermarkets */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Store className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Key Accounts
              </span>
              <span className="text-xs text-slate-400 font-mono">Retail Chains</span>
            </div>

            <h3 className="text-xl font-black text-white mb-3">
              {t.supermarketTitle}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {t.supermarketDesc}
            </p>

            <ul className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isArabic ? 'ميرتشندايزينغ احترافي وإدارة الرفوف' : 'Dedicated visual merchandising team'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isArabic ? 'تنسيق العروض الترويجية الموسمية' : 'Coordinated retail promotions'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isArabic ? 'توريد مجدول ومنتظم للمستودعات' : 'Scheduled multi-branch supply'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Wholesale & Re-export */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Bulk Volume
              </span>
              <span className="text-xs text-slate-400 font-mono">Pallets & Containers</span>
            </div>

            <h3 className="text-xl font-black text-white mb-3">
              {t.wholesaleTitle}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {t.wholesaleDesc}
            </p>

            <ul className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{isArabic ? 'أسعار تفضيلية بالكرتون والطبليات' : 'Volume tiered pricing & pallets'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{isArabic ? 'تسهيلات سداد للشركات المسجلة' : 'Credit terms for verified businesses'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{isArabic ? 'تجهيز طلبيات الفنادق والمطاعم' : 'HORECA & catering contract support'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive B2B Inquiry & Van Sales Booking Form */}
        <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-10 lg:p-12 relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{isArabic ? 'تواصل مباشر مع الإدارة' : 'Direct Central Dispatch'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  {t.b2bFormTitle}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {isArabic
                    ? 'املأ النموذج السريع وسيصل طلبك فوراً إلى هاتف قسم المبيعات المركزي لحجز خط سير الفان أو إرسال قائمة أسعار الجملة المعتمدة.'
                    : 'Submit your store information to schedule a van visit or receive an official wholesale price tier for Alsi Cola and partner FMCG goods.'}
                </p>

                {/* Central Sales Callout Box */}
                <div className="p-5 rounded-2xl bg-das-900 border border-emerald-500/30 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-bold">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">
                        {isArabic ? 'هاتف قسم المبيعات المركزي' : 'Central Sales Division Line'}
                      </span>
                      <strong className="text-base text-white font-mono">
                        {COMPANY_INFO.centralSalesDivision}
                      </strong>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    {isArabic 
                      ? 'متاح للمكالمات والواتساب المباشر لأصحاب المحلات والتجار طوال أيام الأسبوع (ما عدا الجمعة).'
                      : 'Direct line & WhatsApp for store managers and procurement officers.'}
                  </p>
                </div>
              </div>

              {/* Verified Location */}
              <div className="text-xs text-slate-400 pt-4 border-t border-white/10">
                <span className="text-white font-bold block mb-1">
                  {isArabic ? 'مقر المستودع الرئيسي في البحرين:' : 'Main Distribution Warehouse:'}
                </span>
                <span>{isArabic ? COMPANY_INFO.hqAddressAr : COMPANY_INFO.hqAddress}</span>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center py-12 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto mb-4 font-bold shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-black text-white mb-2">
                    {isArabic ? 'تم فتح المحادثة عبر واتساب!' : 'Inquiry Dispatched via WhatsApp!'}
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                    {t.submitB2bSuccess}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-das-800 hover:bg-das-700 text-white text-xs font-bold transition-colors"
                  >
                    {isArabic ? 'إرسال طلب جديد' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Store Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t.businessNameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isArabic ? 'مثال: أسواق الأمل، برادة الزنج' : 'e.g. Al Baraka Cold Store, Al Hidd Mart'}
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full bg-das-900 border border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    {/* CR Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t.crNumberLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={isArabic ? 'رقم السجل التجاري (اختياري)' : 'Commercial Reg. No. (optional)'}
                        value={formData.crNumber}
                        onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                        className="w-full bg-das-900 border border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t.contactPersonLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isArabic ? 'الاسم الكريم' : 'Manager / Buyer Name'}
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-das-900 border border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t.phoneLabel} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+973 3XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-das-900 border border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                      />
                    </div>

                    {/* Governorate */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t.governorateLabel} *
                      </label>
                      <select
                        value={formData.governorate}
                        onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                        className="w-full bg-das-900 border border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                      >
                        {BAHRAIN_GOVERNORATES.map((gov) => (
                          <option key={gov.id} value={gov.id}>
                            {isArabic ? gov.nameAr : gov.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Est Weekly Volume */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {t.weeklyVolumeLabel}
                      </label>
                      <select
                        value={formData.estimatedWeeklyCartons}
                        onChange={(e) => setFormData({ ...formData, estimatedWeeklyCartons: e.target.value })}
                        className="w-full bg-das-900 border border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                      >
                        <option value="5 - 15 Cartons">5 – 15 Cartons (Van Sales Starter)</option>
                        <option value="15 - 50 Cartons">15 – 50 Cartons (Regular Cold Store)</option>
                        <option value="50 - 200 Cartons">50 – 200 Cartons (Supermarket)</option>
                        <option value="200+ Cartons (Pallets)">200+ Cartons (Pallets / Wholesale)</option>
                      </select>
                    </div>

                  </div>

                  {/* Checkbox product interests */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      {t.interestsLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {productOptions.map((opt) => {
                        const checked = formData.productInterests.includes(opt.id);
                        return (
                          <label
                            key={opt.id}
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                              checked
                                ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                                : 'bg-das-900 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleCheckboxToggle(opt.id)}
                              className="accent-emerald-500 rounded"
                            />
                            <span>{isArabic ? opt.labelAr : opt.labelEn}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {t.notesLabel}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={isArabic ? 'أي تفاصيل عن موقع المحل أو التوقيت المناسب للزيارة...' : 'Specific delivery timing, road/block number, or requested display rack...'}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-das-900 border border-white/15 focus:border-emerald-500 rounded-xl py-2 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold py-3.5 px-6 rounded-xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] text-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>{t.submitB2bWhatsApp}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    {isArabic 
                      ? 'يتم تحويل الطلب فوراً إلى إدارة مبيعات الجملة عبر واتساب لخدمتك بدون أي تأخير.'
                      : 'Directly routes your inquiry to Central Sales Division (+973 3826 9395) with instant confirmation.'}
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
