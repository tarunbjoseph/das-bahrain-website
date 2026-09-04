import React, { useState } from 'react';
import { Product, ProductCategory, PackagingType, Language } from '../types';
import { ProductCard } from './ProductCard';
import { translations } from '../utils/translations';
import { Sparkles, SlidersHorizontal, PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  language: Language;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onAddToCart: (product: Product, packagingType: PackagingType, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  language,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onQuickView,
}) => {
  const t = translations[language];
  const isArabic = language === 'ar';

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: t.allCategories },
    { id: 'alsi-cola', label: t.alsiCategory },
    { id: 'energy-drinks', label: t.energyCategory },
    { id: 'beverages', label: t.beverageCategory },
    { id: 'dry-food', label: t.dryFoodCategory },
    { id: 'confectionery', label: t.confectioneryCategory },
    { id: 'fresh-frozen', label: t.freshFrozenCategory },
    { id: 'non-food', label: t.nonFoodCategory },
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
    <section id="products" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? 'الكتالوج الكامل للمنتجات' : 'FMCG Product Catalogue'}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {t.categoriesTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {isArabic 
              ? 'مشروبات الساي كولا، ومشروبات الطاقة، والمواد الغذائية والاستهلاكية بأسعار الموزع الرسمي.'
              : 'Official licensed Alsi Cola, high-velocity energy drinks, and pantry essentials.'}
          </p>
        </div>

        {/* Product Count Indicator */}
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {isArabic ? 'عرض ' : 'Showing '}
          <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredProducts.length}</strong>
          {isArabic ? ' من أصل ' : ' of '}
          <strong className="text-slate-900 dark:text-white">{products.length}</strong>
          {isArabic ? ' منتج متوفر' : ' active products'}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-slate-200/80 dark:bg-das-850 hover:bg-slate-300 dark:hover:bg-das-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white border border-slate-300/80 dark:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-das-850 border border-slate-200 dark:border-white/10 my-8 shadow-lg shadow-slate-200/40 dark:shadow-none">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-das-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto mb-4">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            {isArabic ? 'لم يتم العثور على منتجات مطابقة' : 'No matching products found'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-6">
            {isArabic 
              ? 'يرجى تجربة البحث باسم آخر أو اختيار فئة مختلفة من القائمة.'
              : 'Try searching with a different term or select another category.'}
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-colors shadow-md"
          >
            {isArabic ? 'عرض كل المنتجات' : 'View All Products'}
          </button>
        </div>
      )}

    </section>
  );
};
