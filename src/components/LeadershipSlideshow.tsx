import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Building2, 
  Truck, 
  MapPin, 
  Sparkles,
  MessageCircle,
  Linkedin,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface LeadershipSlideshowProps {
  language: Language;
}

export const LeadershipSlideshow: React.FC<LeadershipSlideshowProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const leaders = [
    {
      id: 'bejoy-joseph',
      name: 'Bejoy Joseph',
      nameAr: 'بيجوي جوزيف',
      role: 'Managing Director & Founder',
      roleAr: 'المدير العام والمؤسس',
      department: 'Executive Board • Dar Al Baba Salam',
      departmentAr: 'مجلس الإدارة التنفيذي • دار البابا سلام',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      badge: 'Visionary Leadership',
      badgeAr: 'القيادة التنفيذية',
      quote: 'Under the leadership of Bejoy Joseph, Dar Al Baba Salam is building a dependable, long-term FMCG partner for households, retailers, and trade customers across the Kingdom of Bahrain.',
      quoteAr: 'تحت قيادة بيجوي جوزيف، تواصل دار البابا سلام ترسيخ مكانتها كشريك موثوق ومستدام للمستهلكين ومحلات التجزئة وتجار الجملة في جميع أنحاء مملكة البحرين.',
      description: 'With extensive FMCG distribution acumen, Bejoy Joseph has directed the multi-brand expansion of DAS Bahrain, securing strategic distributor rights for Alsi Cola, Code Red, and premier staple foods while building Bahrain’s most active daily Van Sales route network.',
      descriptionAr: 'بخبرة واسعة في إدارة وتوزيع السلع الاستهلاكية، قاد بيجوي جوزيف التوسع الشامل لشركة داس البحرين، وحصل على وكالات توزيع حصرية لمشروبات الساي كولا وكود ريد، وأسس أكبر أسطول فان سيلز يخدم المحلات يومياً.',
      milestones: [
        { label: 'Licensed Alsi Cola Partner', labelAr: 'الموزع المعتمد لمشروبات الساي كولا' },
        { label: 'Island-Wide Van Sales Fleet', labelAr: 'أسطول فان سيلز يغطي كافة المحافظات' },
        { label: '850+ Retail Partner Stores', labelAr: 'أكثر من 850 متجر وبقالة معتمدة' }
      ]
    },
    {
      id: 'operations-director',
      name: 'Head of Operations & Logistics',
      nameAr: 'إدارة العمليات وسلسلة الإمداد والتبريد',
      role: 'Director of Supply Chain & Warehousing',
      roleAr: 'مدير العمليات اللوجستية وسلاسل التوريد',
      department: 'Central Logistics Hub • Hidd, Bahrain',
      departmentAr: 'مركز التوزيع الرئيسي • الحد، البحرين',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      badge: 'Cold Chain & Logistics',
      badgeAr: 'سلسلة التبريد والجودة',
      quote: 'Directing temperature-controlled storage, rapid port clearance, and continuous stock velocity to guarantee Bahrain retailers never face an empty shelf.',
      quoteAr: 'إدارة التخزين المبرد والمكيف، والتخليص الجمركي السريع وحركة المخزون لضمان عدم نفاد المنتجات من رفوف المتاجر الشريكة أبداً.',
      description: 'Supervising our central distribution warehouse in Hidd, our logistics management oversees strict compliance with Bahrain Ministry of Health regulations, automated pallet handling, and same-day dispatches for wholesale consignments.',
      descriptionAr: 'الإشراف على المستودع المركزي في منطقة الحد وفق أعلى معايير وزارة الصحة البحرينية، مع التوزيع الآلي والفرز السريع لطلبات الجملة والتجزئة.',
      milestones: [
        { label: 'High-Capacity Hidd Facility', labelAr: 'مستودعات مركزية حديثة في الحد' },
        { label: 'Strict Quality & Cold-Chain', labelAr: 'رقابة صارمة على الجودة والتبريد' },
        { label: 'Same-Day Pallet Dispatches', labelAr: 'شحن فوري في نفس اليوم للطلبات' }
      ]
    },
    {
      id: 'fleet-director',
      name: 'Van Sales & Commercial Accounts',
      nameAr: 'إدارة أسطول الفان سيلز وتجارة التجزئة',
      role: 'Director of Van Sales & Key Accounts',
      roleAr: 'مدير شبكة التوزيع والمبيعات اليومية',
      department: 'Commercial Van Sales Fleet • 5 Governorates',
      departmentAr: 'أسطول التوريد اليومي • 5 محافظات',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      badge: 'Daily Route Mastery',
      badgeAr: 'شبكة التوريد الميداني',
      quote: 'Bringing official Alsi Cola and partner FMCG goods right to the doorstep of every baqala and supermarket with zero delivery delay.',
      quoteAr: 'إيصال منتجات الساي كولا والأغذية الاستهلاكية مباشرة إلى باب كل برادة وسوبرماركت دون أي تأخير وبكميات مرنة.',
      description: 'Leading a disciplined team of sales van drivers and field merchandisers across Capital, Muharraq, Northern, Southern, and Central routes. Providing instant electronic invoicing, free branded display coolers, and flexible small-batch ordering.',
      descriptionAr: 'قيادة فريق ميداني متخصص من سيارات الفان سيلز ومسؤولي العرض الترويجي، وتوفير الفواتير الإلكترونية الفورية وثلاجات العرض المجانية للمحلات.',
      milestones: [
        { label: 'Zero Minimum Order Policy', labelAr: 'بدون حد أدنى لكميات التوريد اليومي' },
        { label: 'Free Display Racks & Chillers', labelAr: 'توفير ستاندات وثلاجات عرض مجانية' },
        { label: 'Electronic Invoicing on Delivery', labelAr: 'فواتير إلكترونية فورية عند التسليم' }
      ]
    }
  ];

  // Auto-play slideshow
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % leaders.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, leaders.length]);

  const activeLeader = leaders[currentSlide];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden transition-colors duration-300">
      
      {/* Subtle Ambient Background Backdrop with Smooth Blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="https://alsicolabh.tfwgsite.com/__l5e/assets-v1/ea8d157c-4ce3-4dc1-8850-160122a8abe8/about-lifestyle.jpg"
          alt="Alsi Cola Bahrain FMCG Background"
          className="w-full h-full object-cover opacity-15 dark:opacity-10 filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/70 to-slate-50/95 dark:from-das-950/95 dark:via-das-900/80 dark:to-das-950/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Relaxed Breathing Spacing */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-leaf-100/90 dark:bg-leaf-950/70 border border-leaf-300/60 dark:border-leaf-800 text-leaf-800 dark:text-leaf-300 text-xs font-bold uppercase tracking-[0.2em] mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-leaf-600" />
            <span>{isArabic ? 'القيادة التنفيذية والإدارة' : 'Executive Leadership & Governance'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-5">
            {isArabic 
              ? 'الرؤية والقيادة التي تقود توزيع السلع في البحرين' 
              : 'The Leadership Driving Bahrain FMCG Distribution'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isArabic
              ? 'بقيادة تجارية طموحة، نربط كبرى شركات الأغذية والمشروبات العالمية بأسواق التجزئة والمستهلكين في مملكة البحرين بكل موثوقية واحتراف.'
              : 'Combining institutional reliability with field-level agililty. Meet the leaders steering Dar Al Baba Salam and its expanding distributor operations.'}
          </p>
        </div>

        {/* Floating Transparent Slideshow Card Container */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-das-900/80 border border-white/60 dark:border-white/10 shadow-elevated p-6 sm:p-10 lg:p-14 overflow-hidden transition-all duration-500"
        >
          {/* Subtle Ambient Brand Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-leaf-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Transparent Profile Media */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 dark:border-white/10 group">
                <img
                  key={activeLeader.id}
                  src={activeLeader.image}
                  alt={isArabic ? activeLeader.nameAr : activeLeader.name}
                  className="w-full h-full object-cover object-top animate-fadeIn transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Translucent Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-leaf-600/90 text-white backdrop-blur-md mb-2 shadow-sm">
                    {isArabic ? activeLeader.badgeAr : activeLeader.badge}
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {isArabic ? activeLeader.nameAr : activeLeader.name}
                  </h3>
                  <span className="text-xs text-leaf-300 font-medium">
                    {isArabic ? activeLeader.roleAr : activeLeader.role}
                  </span>
                </div>
              </div>

              {/* Slide Selector Indicators */}
              <div className="flex items-center gap-2 mt-6">
                {leaders.map((lead, idx) => (
                  <button
                    key={lead.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentSlide
                        ? 'w-8 h-2 bg-leaf-600 shadow-sm'
                        : 'w-2 h-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Leadership Narrative & Credentials */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Department Chip */}
                <div className="flex items-center gap-2 text-xs font-semibold text-leaf-700 dark:text-leaf-400 uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>{isArabic ? activeLeader.departmentAr : activeLeader.department}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                  {isArabic ? activeLeader.nameAr : activeLeader.name}
                </h3>

                <span className="text-sm font-bold text-slate-600 dark:text-slate-300 block mb-6">
                  {isArabic ? activeLeader.roleAr : activeLeader.role}
                </span>

                {/* Quote Box with Translucent Styling */}
                <div className="relative p-6 rounded-2xl bg-leaf-50/80 dark:bg-das-850/90 border border-leaf-200/80 dark:border-leaf-800/60 mb-6 shadow-sm">
                  <Quote className="w-8 h-8 text-leaf-500/30 absolute top-4 right-4 rtl:right-auto rtl:left-4" />
                  <p className="text-sm sm:text-base italic text-slate-800 dark:text-slate-200 leading-relaxed relative z-10 font-medium">
                    "{isArabic ? activeLeader.quoteAr : activeLeader.quote}"
                  </p>
                </div>

                {/* Long Bio Paragraph */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {isArabic ? activeLeader.descriptionAr : activeLeader.description}
                </p>

                {/* Key Milestones List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {activeLeader.milestones.map((m, i) => (
                    <div 
                      key={i} 
                      className="p-3.5 rounded-xl bg-white/90 dark:bg-das-800/80 border border-slate-200/80 dark:border-white/10 flex items-start gap-2 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                        {isArabic ? m.labelAr : m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls & Contact CTA */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + leaders.length) % leaders.length)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-das-800 dark:hover:bg-das-700 text-slate-700 dark:text-slate-300 transition-colors"
                    aria-label="Previous Leader"
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % leaders.length)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-das-800 dark:hover:bg-das-700 text-slate-700 dark:text-slate-300 transition-colors"
                    aria-label="Next Leader"
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2 rtl:ml-0 rtl:mr-2">
                    0{currentSlide + 1} / 0{leaders.length}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${COMPANY_INFO.centralSalesWhatsApp}?text=Hello%20Dar%20Al%20Baba%20Salam%20Executive%20Office,%20I%20would%20like%20to%20inquire%20about%20commercial%20partnership.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-leaf-600 hover:bg-leaf-500 text-white text-xs font-bold shadow-md shadow-leaf-600/20 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isArabic ? 'تواصل مع مكتب الإدارة التنفيذية' : 'Connect with Executive Office'}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
