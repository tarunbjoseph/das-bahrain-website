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

  // Van Sales fleet & logistics gallery images (authentic FMCG media from reference site)
  const fleetGallery = [
    {
      id: 'van-routes',
      image: 'https://alsicolabh.tfwgsite.com/assets/gardner-hero-3-CAIUPCbG.jpg',
      titleEn: 'Daily Neighborhood Van Sales',
      titleAr: 'فان سيلز يومي نشط للمحلات',
      descEn: 'Equipped delivery vans providing small-batch, daily replenishment directly to cold store doorsteps.',
      descAr: 'فانات يومية تجوب كافة الأحياء لتزويد البرادات والبقالات بكميات مرنة حسب الطلب.',
      badgeEn: 'DSD Route Vans',
      badgeAr: 'أسطول الفان'
    },
    {
      id: 'central-warehouse',
      image: 'https://alsicolabh.tfwgsite.com/assets/gardner-hero-1-HGdNez6Y.jpg',
      titleEn: 'Central Logistics Hub (Hidd)',
      titleAr: 'مستودع التوزيع المركزي (الحد)',
      descEn: 'Modern temperature-controlled warehouse ensuring rapid pallet dispatches and stock freshness.',
      descAr: 'مستودعات مكيفة ومبردة بأحدث التقنيات لضمان وفرة المخزون وسرعة الشحن للمتاجر.',
      badgeEn: 'Central Hub',
      badgeAr: 'المركز الرئيسي'
    },
    {
      id: 'retail-coolers',
      image: 'https://alsicolabh.tfwgsite.com/assets/gardner-hero-2-1DU4nM6X.jpg',
      titleEn: 'Branded Displays & Coolers',
      titleAr: 'ثلاجات وستاندات عرض مجانية',
      descEn: 'Free Alsi Cola floor display stands and branded drink coolers supplied to partner stores.',
      descAr: 'نوفر للمحلات والبرادات الشريكة ثلاجات وستاندات عرض مجانية لزيادة مبيعات المشروبات.',
      badgeEn: 'Store Displays',
      badgeAr: 'تجهيزات مجانية'
    },
    {
      id: 'rapid-transport',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
      titleEn: 'Bulk Pallet & Container Supply',
      titleAr: 'شحن الحاويات والطبليات',
      descEn: 'High-volume logistics supply for hypermarkets, catering companies, and wholesale contracts.',
      descAr: 'توريد أحجام تجارية كبيرة بالطبليات لسلاسل الهايبرماركت والفنادق وشركات التموين.',
      badgeEn: 'Wholesale Fleet',
      badgeAr: 'نقل الجملة'
    }
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
    <section id="b2b" className="py-12 md:py-16 bg-slate-100/80 dark:bg-gradient-to-b dark:from-das-950 dark:via-das-900 dark:to-das-950 relative overflow-hidden border-y border-slate-200 dark:border-white/10 transition-colors duration-300">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-leaf-100 dark:bg-leaf-950/70 border border-leaf-300/60 dark:border-leaf-800 text-leaf-800 dark:text-leaf-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4" />
            <span>{t.b2bBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            {t.b2bTitle}
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.b2bSubtitle}
          </p>
        </div>

        {/* 3 Pillars of Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12">
          
          {/* Pillar 1: Van Sales */}
          <div className="p-8 rounded-3xl bg-white dark:bg-das-850/80 border border-leaf-500/30 relative overflow-hidden group hover:border-leaf-500 dark:hover:border-leaf-400 transition-all shadow-soft dark:shadow-none">
            <div className="w-14 h-14 rounded-2xl bg-leaf-500/15 text-leaf-700 dark:text-leaf-400 border border-leaf-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-leaf-600 text-white">
                Core Operation
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Daily Route</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
              {t.vanSalesTitle}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {t.vanSalesDesc}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0" />
                <span>{isArabic ? 'كميات مرنة وتوريد يومي حسب الحاجة' : 'Small batch daily restocking'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0" />
                <span>{isArabic ? 'توفير ستاندات ومواد دعائية مجانية' : 'Branded floor & counter display stands'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0" />
                <span>{isArabic ? 'فواتير إلكترونية فورية عند التسليم' : 'On-the-spot electronic invoicing'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Supermarkets & Hypermarkets */}
          <div className="p-8 rounded-3xl bg-white dark:bg-das-850/80 border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-amber-400 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Store className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-500/30">
                Key Accounts
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Retail Chains</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
              {t.supermarketTitle}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {t.supermarketDesc}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{isArabic ? 'ميرتشندايزينغ احترافي وإدارة الرفوف' : 'Dedicated visual merchandising team'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{isArabic ? 'تنسيق العروض الترويجية الموسمية' : 'Coordinated retail promotions'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{isArabic ? 'توريد مجدول ومنتظم للمستودعات' : 'Scheduled multi-branch supply'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Wholesale & Re-export */}
          <div className="p-8 rounded-3xl bg-white dark:bg-das-850/80 border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-blue-400 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-300/60 dark:border-blue-500/30">
                Bulk Volume
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Pallets & Containers</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
              {t.wholesaleTitle}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {t.wholesaleDesc}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{isArabic ? 'أسعار تفضيلية بالكرتون والطبليات' : 'Volume tiered pricing & pallets'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{isArabic ? 'تسهيلات سداد للشركات المسجلة' : 'Credit terms for verified businesses'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{isArabic ? 'تجهيز طلبيات الفنادق والمطاعم' : 'HORECA & catering contract support'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Active Van Sales Fleet & Operations Gallery (Visual Fleet Showcase) */}
        <div className="mb-12 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-leaf-600 dark:text-leaf-400 mb-2">
                <Truck className="w-4 h-4" />
                <span>{isArabic ? 'عمليات الأسطول والتوزيع الميداني' : 'Active Fleet & Direct Logistics in Action'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {isArabic ? 'أسطول فان سيلز يغطي كافة مناطق البحرين يومياً' : 'Bahrain Van Sales Fleet & Fast Replenishment'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {isArabic
                  ? 'أسطول سيارات فان مجهزة ومبردة تزور مئات البرادات والبقالات ومحلات السوبرماركت كل صباح لتأمين احتياجات السوق وتجديد الرفوف فوراً.'
                  : 'Commercial distribution vans servicing neighborhood cold stores, hypermarkets, and institutional accounts across Bahrain every morning.'}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-das-850 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 shadow-sm shrink-0">
              <span className="w-2 h-2 rounded-full bg-leaf-500 animate-pulse" />
              <span>{isArabic ? 'تغطية شاملة للمحافظات الـ 5' : 'All 5 Governorates Covered'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleetGallery.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-das-850/80 border border-slate-200/90 dark:border-white/10 hover:border-leaf-500/50 shadow-soft hover:shadow-leaf transition-all duration-300 flex flex-col"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-das-800">
                  <img
                    src={item.image}
                    alt={isArabic ? item.titleAr : item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://alsicolabh.tfwgsite.com/assets/gardner-hero-3-CAIUPCbG.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {isArabic ? item.badgeAr : item.badgeEn}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-leaf-600 dark:group-hover:text-leaf-400 transition-colors mb-1.5">
                      {isArabic ? item.titleAr : item.titleEn}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isArabic ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive B2B Inquiry & Van Sales Booking Form */}
        <div className="rounded-3xl bg-white dark:bg-das-850/90 border border-slate-200 dark:border-white/15 p-6 sm:p-10 lg:p-14 relative shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-leaf-700 dark:text-leaf-400 uppercase tracking-wider mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{isArabic ? 'تواصل مباشر مع الإدارة' : 'Direct Central Dispatch'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4">
                  {t.b2bFormTitle}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {isArabic
                    ? 'املأ النموذج السريع وسيصل طلبك فوراً إلى هاتف قسم المبيعات المركزي لحجز خط سير الفان أو إرسال قائمة أسعار الجملة المعتمدة.'
                    : 'Submit your store information to schedule a van visit or receive an official wholesale price tier for Alsi Cola and partner FMCG goods.'}
                </p>

                {/* Central Sales Callout Box */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-das-900 border border-leaf-500/30 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-leaf-600 text-white flex items-center justify-center font-bold shadow-sm">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">
                        {isArabic ? 'هاتف قسم المبيعات المركزي' : 'Central Sales Division Line'}
                      </span>
                      <strong className="text-base text-slate-900 dark:text-white font-mono">
                        {COMPANY_INFO.centralSalesDivision}
                      </strong>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {isArabic 
                      ? 'متاح للمكالمات والواتساب المباشر لأصحاب المحلات والتجار طوال أيام الأسبوع (ما عدا الجمعة).'
                      : 'Direct line & WhatsApp for store managers and procurement officers.'}
                  </p>
                </div>
              </div>

              {/* Verified Location */}
              <div className="text-xs text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-white/10">
                <span className="text-slate-900 dark:text-white font-bold block mb-1">
                  {isArabic ? 'مقر المستودع الرئيسي في البحرين:' : 'Main Distribution Warehouse:'}
                </span>
                <span>{isArabic ? COMPANY_INFO.hqAddressAr : COMPANY_INFO.hqAddress}</span>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-leaf-50 dark:bg-leaf-950/40 border border-leaf-500/40 text-center py-12 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-leaf-600 text-white flex items-center justify-center mx-auto mb-4 font-bold shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    {isArabic ? 'تم فتح المحادثة عبر واتساب!' : 'Inquiry Dispatched via WhatsApp!'}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                    {t.submitB2bSuccess}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-das-800 dark:hover:bg-das-700 text-slate-900 dark:text-white text-xs font-bold transition-colors"
                  >
                    {isArabic ? 'إرسال طلب جديد' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Store Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.businessNameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isArabic ? 'مثال: أسواق الأمل، برادة الزنج' : 'e.g. Al Baraka Cold Store, Al Hidd Mart'}
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-das-900 border border-slate-300 dark:border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>

                    {/* CR Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.crNumberLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={isArabic ? 'رقم السجل التجاري (اختياري)' : 'Commercial Reg. No. (optional)'}
                        value={formData.crNumber}
                        onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-das-900 border border-slate-300 dark:border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono transition-colors"
                      />
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contactPersonLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isArabic ? 'الاسم الكريم' : 'Manager / Buyer Name'}
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-das-900 border border-slate-300 dark:border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.phoneLabel} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+973 3XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-das-900 border border-slate-300 dark:border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono transition-colors"
                      />
                    </div>

                    {/* Governorate */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.governorateLabel} *
                      </label>
                      <select
                        value={formData.governorate}
                        onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-das-900 border border-slate-300 dark:border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 dark:text-white focus:outline-none transition-colors"
                      >
                        {BAHRAIN_GOVERNORATES.map((gov) => (
                          <option key={gov.id} value={gov.id} className="bg-white dark:bg-das-900 text-slate-900 dark:text-white">
                            {isArabic ? gov.nameAr : gov.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Est Weekly Volume */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.weeklyVolumeLabel}
                      </label>
                      <select
                        value={formData.estimatedWeeklyCartons}
                        onChange={(e) => setFormData({ ...formData, estimatedWeeklyCartons: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-das-900 border border-slate-300 dark:border-white/15 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 dark:text-white focus:outline-none transition-colors"
                      >
                        <option value="5 - 15 Cartons" className="bg-white dark:bg-das-900 text-slate-900 dark:text-white">5 – 15 Cartons (Van Sales Starter)</option>
                        <option value="15 - 50 Cartons" className="bg-white dark:bg-das-900 text-slate-900 dark:text-white">15 – 50 Cartons (Regular Cold Store)</option>
                        <option value="50 - 200 Cartons" className="bg-white dark:bg-das-900 text-slate-900 dark:text-white">50 – 200 Cartons (Supermarket)</option>
                        <option value="200+ Cartons (Pallets)" className="bg-white dark:bg-das-900 text-slate-900 dark:text-white">200+ Cartons (Pallets / Wholesale)</option>
                      </select>
                    </div>

                  </div>

                  {/* Checkbox product interests */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
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
                                ? 'bg-leaf-50 dark:bg-leaf-950/40 border-leaf-500 text-leaf-900 dark:text-leaf-100 font-semibold'
                                : 'bg-slate-50 dark:bg-das-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleCheckboxToggle(opt.id)}
                              className="accent-leaf-600 rounded"
                            />
                            <span>{isArabic ? opt.labelAr : opt.labelEn}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.notesLabel}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={isArabic ? 'أي تفاصيل عن موقع المحل أو التوقيت المناسب للزيارة...' : 'Specific delivery timing, road/block number, or requested display rack...'}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-das-900 border border-slate-300 dark:border-white/15 focus:border-leaf-500 focus:ring-1 focus:ring-leaf-500 rounded-xl py-2 px-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 bg-leaf-600 hover:bg-leaf-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-leaf-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] text-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{t.submitB2bWhatsApp}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
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
