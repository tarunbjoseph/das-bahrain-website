import React, { useState } from 'react';
import { Product, ProductCategory, PackagingType, Language } from '../types';
import { ProductCard } from './ProductCard';
import { translations } from '../utils/translations';
import { 
  Sparkles, 
  Search, 
  X, 
  PackageOpen, 
  Zap, 
  CupSoda, 
  Flame, 
  Coffee, 
  Cookie, 
  Snowflake, 
  ShieldCheck, 
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  language: Language;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange?: (query: string) => void;
  onAddToCart: (product: Product, packagingType: PackagingType, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  language,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onQuickView,
}) => {
  const t = translations[language];
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const categories: { id: ProductCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: t.allCategories, icon: Layers },
    { id: 'alsi-cola', label: t.alsiCategory, icon: CupSoda },
    { id: 'energy-drinks', label: t.energyCategory, icon: Zap },
    { id: 'beverages', label: t.beverageCategory, icon: Coffee },
    { id: 'dry-food', label: t.dryFoodCategory, icon: Sparkles },
    { id: 'confectionery', label: t.confectioneryCategory, icon: Cookie },
    { id: 'fresh-frozen', label: t.freshFrozenCategory, icon: Snowflake },
    { id: 'non-food', label: t.nonFoodCategory, icon: ShieldCheck },
  ];

  // Visual category highlight cards (styled after the reference official distributor layout)
  const categoryShowcases = [
    {
      id: 'alsi-cola' as ProductCategory,
      titleEn: 'Alsi Cola & Soft Drinks',
      titleAr: 'الساي كولا والمشروبات المنعشة',
      descEn: 'Licensed Bahrain Flagship Line',
      descAr: 'المشروب الرسمي المعتمد في البحرين',
      image: 'https://alsicolabh.tfwgsite.com/assets/category-beverages-CYaprUoq.jpg',
      badgeEn: 'Flagship Portfolio',
      badgeAr: 'التشكيلة الرسمية'
    },
    {
      id: 'energy-drinks' as ProductCategory,
      titleEn: 'Code Red & Energy Drinks',
      titleAr: 'كود ريد ومشروبات الطاقة',
      descEn: 'High-velocity daily van sales demand',
      descAr: 'الأعلى طلباً ومبيعاً في البقالات',
      image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80',
      badgeEn: 'Best Seller',
      badgeAr: 'الأكثر مبيعاً'
    },
    {
      id: 'dry-food' as ProductCategory,
      titleEn: 'Pantry, Coffee & Grocery',
      titleAr: 'المواد التموينية والقهوة الفاخرة',
      descEn: 'Specialty coffee & pantry essentials',
      descAr: 'قهوة ممتازة ومواد استهلاكية للمنازل والمتاجر',
      image: 'https://alsicolabh.tfwgsite.com/assets/category-grocery-CAuwbDYM.jpg',
      badgeEn: 'Wholesale & Retail',
      badgeAr: 'جملة وتجزئة'
    },
    {
      id: 'fresh-frozen' as ProductCategory,
      titleEn: 'Chilled Dairy & Frozen Portions',
      titleAr: 'الألبان المبردة والمجمدات',
      descEn: 'Temperature-controlled supply',
      descAr: 'توريد مبرد ومحفوظ بأعلى معايير الجودة',
      image: 'https://alsicolabh.tfwgsite.com/assets/category-fresh-frozen-DB_UpYPx.jpg',
      badgeEn: 'Chilled Chain',
      badgeAr: 'سلسلة التبريد'
    }
  ];

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName = product.name.toLowerCase().includes(query) || product.nameAr.includes(query);
    const matchesBrand = product.brand.toLowerCase().includes(query) || product.brandAr.includes(query);
    const matchesDesc = product.description.toLowerCase().includes(query) || product.descriptionAr.includes(query);

    return matchesCategory && (matchesName || matchesBrand || matchesDesc);
  });

  return (
    <section id="products" className="relative py-12 md:py-16 overflow-hidden scroll-mt-20">
      {/* Transparent Ambient Retail & Lifestyle Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://alsicolabh.tfwgsite.com/__l5e/assets-v1/ea8d157c-4ce3-4dc1-8850-160122a8abe8/about-lifestyle.jpg"
          alt="DAS Bahrain Retail Store Ambiance"
          className="w-full h-full object-cover opacity-20 dark:opacity-10 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/65 to-slate-50/85 dark:from-das-950/85 dark:via-das-900/75 dark:to-das-950/90 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Visual Category Showcase Cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-leaf-600 dark:text-leaf-400">
                {isArabic ? 'الأقسام الرئيسية المتوفرة' : 'Featured FMCG Departments'}
              </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {isArabic ? 'تصفح حسب فئة المنتجات' : 'Browse by Core Category'}
            </h3>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-bold text-leaf-600 dark:text-leaf-400 hover:underline flex items-center gap-1"
            >
              <span>{isArabic ? 'عرض جميع الفئات' : 'View All Categories'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryShowcases.map((card) => {
            const isSelected = selectedCategory === card.id;
            return (
              <div
                key={card.id}
                onClick={() => onSelectCategory(card.id)}
                className={`group relative h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'ring-2 ring-leaf-500 border-leaf-500 shadow-lg shadow-leaf-600/20 scale-[1.02]'
                    : 'border-slate-200 dark:border-white/10 hover:border-leaf-500/50 hover:shadow-md'
                }`}
              >
                {/* Background Image */}
                <img
                  src={card.image}
                  alt={isArabic ? card.titleAr : card.titleEn}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Dark Gradient Overlay for optimal legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 group-hover:from-black/90 transition-colors" />

                {/* Card Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      {isArabic ? card.badgeAr : card.badgeEn}
                    </span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-leaf-400 shadow-sm shadow-leaf-400 animate-pulse" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white group-hover:text-leaf-300 transition-colors leading-snug">
                      {isArabic ? card.titleAr : card.titleEn}
                    </h4>
                    <p className="text-[11px] text-slate-200 line-clamp-1 mt-0.5">
                      {isArabic ? card.descAr : card.descEn}
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-leaf-300 group-hover:text-white transition-colors">
                      <span>{isArabic ? 'استكشاف التشكيلة' : 'Explore department'}</span>
                      <ArrowIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-leaf-600 dark:text-leaf-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? 'الكتالوج الكامل للمنتجات والأسعار' : 'Full FMCG Product Catalogue'}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {t.categoriesTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {isArabic 
              ? 'مشروبات الساي كولا، ومشروبات الطاقة، والمواد الغذائية والاستهلاكية بأسعار الموزع الرسمي.'
              : 'Direct pricing from official licensed distributor. Available for retail purchase & wholesale van delivery.'}
          </p>
        </div>

        {/* Product Count Indicator */}
        <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {isArabic ? 'عرض ' : 'Showing '}
          <strong className="text-leaf-600 dark:text-leaf-400 font-black text-sm">{filteredProducts.length}</strong>
          {isArabic ? ' من أصل ' : ' of '}
          <strong className="text-slate-900 dark:text-white font-bold">{products.length}</strong>
          {isArabic ? ' منتج متوفر' : ' active products'}
        </div>
      </div>

      {/* In-Catalog Search & Filter Bar (Solves the disjointed UX where search was far away) */}
      <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-white dark:bg-das-900 border border-slate-200/90 dark:border-white/10 shadow-soft">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Direct Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={
                isArabic 
                  ? 'ابحث بالاسم، الماركة أو النكهة (مثل: الساي كولا، كود ريد، قهوة)...' 
                  : 'Search by name, brand, or flavor (e.g. Alsi Cola, Code Red, Coffee)...'
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-das-800/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-leaf-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange?.('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-das-700 transition-colors"
                title={isArabic ? 'مسح البحث' : 'Clear search'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Active Filter Badges */}
          {searchQuery && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                {isArabic ? 'نتائج البحث عن:' : 'Filtered for:'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-leaf-50 dark:bg-leaf-950/60 border border-leaf-200 dark:border-leaf-800 text-leaf-700 dark:text-leaf-300 font-bold">
                "{searchQuery}"
                <button
                  onClick={() => onSearchChange?.('')}
                  className="hover:text-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? 'bg-leaf-600 hover:bg-leaf-500 text-white shadow-md shadow-leaf-600/30 scale-[1.03]'
                  : 'bg-white dark:bg-das-850 hover:bg-slate-100 dark:hover:bg-das-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-leaf-600 dark:text-leaf-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid - 3 items per row with generous spacing */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-das-850 border border-slate-200 dark:border-white/10 my-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-das-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            {isArabic ? 'لم يتم العثور على منتجات مطابقة' : 'No matching products found'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-6">
            {searchQuery 
              ? (isArabic ? `لم نجد منتجات تطابق "${searchQuery}". جرب كلمة أخرى أو اختر فئة مختلفة.` : `No items match "${searchQuery}". Try a different keyword or reset filters.`)
              : (isArabic ? 'لا توجد منتجات ضمن هذه الفئة حالياً.' : 'No products available in this category currently.')
            }
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              onSearchChange?.('');
            }}
            className="px-5 py-2.5 rounded-xl bg-leaf-600 text-white text-xs font-bold hover:bg-leaf-500 transition-colors shadow-md shadow-leaf-600/20"
          >
            {isArabic ? 'عرض كل المنتجات وإعادة التعيين' : 'View All Products & Reset Filters'}
          </button>
        </div>
      )}

      </div>
    </section>
  );
};
