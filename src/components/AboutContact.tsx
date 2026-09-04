import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  Target, 
  HeartHandshake, 
  Sparkles,
  Truck,
  Layers,
  Store
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO } from '../data/mockData';
import logoImg from '../assets/das-logo.png';

interface AboutContactProps {
  language: Language;
}

export const AboutContact: React.FC<AboutContactProps> = ({ language }) => {
  const t = translations[language];
  const isArabic = language === 'ar';

  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Corporate Profile Card */}
      <div className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isArabic ? 'الملف التعريفي للشركة' : 'Corporate Profile'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {isArabic 
                ? 'دار البابا سلام — الوجهة المتكاملة لتجارة وتوزيع المواد الاستهلاكية في البحرين' 
                : 'Dar Al Baba Salam — A One-Stop FMCG Distribution & Online Destination for Bahrain'}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isArabic
                ? 'تأسست دار البابا سلام (داس البحرين) لتكون إحدى أسرع شركات استيراد وتصدير وتوزيع المواد الغذائية والمشروبات والمستهلكات نمواً في مملكة البحرين. نحن موزع معتمد لمشروبات الساي كولا المتميزة، بالإضافة إلى تشكيلة واسعة من المشروبات الغازية، ومشروبات الطاقة (كود ريد، كود ميكس)، والأغذية الجافة، والمثلجات، والحلويات، ومستلزمات العناية الشخصية.'
                : 'Dar Al Baba Salam (DAS Bahrain) is one of the fastest-growing FMCG distribution and online store enterprises in Bahrain. We import, export, and distribute food & beverages, energy drinks, dry pantry goods, confectionery, chilled dairy, and household consumables. As a licensed regional distributor of Alsi Cola in Bahrain, we bridge premier manufacturers with Bahrain consumers, supermarkets, and neighborhood cold stores.'}
            </p>

            {/* Vision & Mission Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-das-900 border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1.5">
                  <Target className="w-4 h-4" />
                  <span>{isArabic ? 'رؤيتنا' : 'Our Vision'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isArabic
                    ? 'الوصول إلى مجتمع تتوفر فيه أعلى معايير الجودة في الأغذية والمشروبات الأساسية لجميع المستهلكين في جميع مناطق البحرين.'
                    : 'To provide every consumer across Bahrain access to highest quality food & beverage essentials, creating a reliable bridge between principals and consumers.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-das-900 border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1.5">
                  <Award className="w-4 h-4" />
                  <span>{isArabic ? 'رسالتنا' : 'Our Mission'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isArabic
                    ? 'أن نكون الخيار الأول في سوق التجارة والتوزيع في البحرين والمنطقة من خلال آليات التوريد المبتكرة وأسطول الفانات النشط.'
                    : 'To lead the Middle East FMCG trade through innovative procurement, dependable logistics, and reaching every corner of Bahrain via our dedicated Van Sales fleet.'}
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>{isArabic ? 'قيمنا الجوهرية' : 'Core Values & Integrity'}</span>
              </div>
              <p>
                {isArabic
                  ? 'الالتزام بأعلى معايير الأمانة والشفافية وأعلى مقاييس الجودة العالمية، مع فريق عمل مؤهل وبيئة تشغيلية منظمة تحقق أعلى مستويات الرضا لعملائنا وموردينا.'
                  : 'Bound by ethical responsibility, unmatched service standards, and a high-performance logistics environment creating unparalleled experiences for customers and retail suppliers.'}
              </p>
            </div>
          </div>

          {/* Right Visual / Emblem Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b from-das-800 to-das-900 border border-white/10 text-center">
            <div className="relative w-40 h-40 rounded-full bg-black p-2 border-4 border-emerald-500/40 shadow-2xl shadow-emerald-950/60 mb-6 flex items-center justify-center shrink-0">
              <img 
                src={logoImg} 
                alt="DAS Bahrain Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <h3 className="text-2xl font-black text-white">
              DAS BAHRAIN
            </h3>
            <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider mt-1">
              DAR AL BABA SALAM W.L.L.
            </span>
            <span className="text-xs text-slate-400 mt-2">
              {isArabic 
                ? 'سجل تجاري بحريني معتمد • إدارة توزيع المواد الاستهلاكية والمشروبات' 
                : 'Registered Bahrain Commercial Entity • Licensed FMCG & Beverage Distribution'}
            </span>

            <div className="mt-6 pt-6 border-t border-white/10 w-full grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-das-850">
                <span className="text-slate-400 block text-[10px]">{isArabic ? 'المركز الرئيسي' : 'Headquarters'}</span>
                <strong className="text-white">Hidd, Bahrain</strong>
              </div>
              <div className="p-2 rounded-xl bg-das-850">
                <span className="text-slate-400 block text-[10px]">{isArabic ? 'شريك المشروبات' : 'Beverage Partner'}</span>
                <strong className="text-emerald-400">Alsi Cola</strong>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Contact & Distribution Hub Card */}
      <div id="contact" className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-12 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isArabic ? 'مركز التواصل والتوزيع' : 'Contact & Distribution Hub'}</span>
          </div>
          <h3 className="text-3xl font-black text-white">
            {isArabic ? 'تواصل مع فريق داس البحرين' : 'Connect With Dar Al Baba Salam'}
          </h3>
          <p className="text-sm text-slate-300 mt-2">
            {isArabic
              ? 'مستعدون لاستقبال استفسارات المستهلكين وأصحاب المتاجر والطلبات التجارية على مدار الساعة.'
              : 'Our distribution center and client relations desk in Hidd are ready to assist you.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Address */}
          <div className="p-6 rounded-2xl bg-das-850 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                {isArabic ? 'المقر الرئيسي والمستودع' : 'Head Office & Warehouse'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {isArabic ? COMPANY_INFO.hqAddressAr : COMPANY_INFO.hqAddress}
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-4 block">
              Kingdom of Bahrain
            </span>
          </div>

          {/* Primary Phone & WhatsApp */}
          <div className="p-6 rounded-2xl bg-das-850 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                {isArabic ? 'الخط الساخن للمستهلكين' : 'Consumer Helpline'}
              </h4>
              <p className="text-xs text-slate-300 font-mono">
                {COMPANY_INFO.primaryPhone}
              </p>
            </div>
            <a 
              href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold mt-4"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isArabic ? 'محادثة واتساب' : 'Chat on WhatsApp'}</span>
            </a>
          </div>

          {/* Central Sales Division */}
          <div className="p-6 rounded-2xl bg-das-850 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center mb-4 font-bold">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                {isArabic ? 'إدارة المبيعات المركزية (جملة)' : 'Central Sales (Wholesale)'}
              </h4>
              <p className="text-xs text-slate-300 font-mono">
                {COMPANY_INFO.centralSalesDivision}
              </p>
            </div>
            <a 
              href={`https://wa.me/${COMPANY_INFO.centralSalesWhatsApp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold mt-4"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isArabic ? 'واتساب المبيعات المركزية' : 'WhatsApp Central Sales'}</span>
            </a>
          </div>

          {/* Official Email */}
          <div className="p-6 rounded-2xl bg-das-850 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                {isArabic ? 'البريد الإلكتروني الرسمي' : 'Official Inquiries'}
              </h4>
              <p className="text-xs text-slate-300 font-mono break-all">
                {COMPANY_INFO.email}
              </p>
            </div>
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold mt-4"
            >
              <span>{isArabic ? 'إرسال بريد إلكتروني' : 'Send Email'}</span>
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};
