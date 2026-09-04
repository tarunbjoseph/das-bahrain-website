import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { B2BWholesaleSection } from './components/B2BWholesaleSection';
import { AboutContact } from './components/AboutContact';
import { AIAssistant } from './components/AIAssistant';
import { Footer } from './components/Footer';
import { Product, ProductCategory, PackagingType, CartItem, Language, Theme } from './types';
import { PRODUCTS } from './data/mockData';

export const App: React.FC = () => {
  // Language State
  const [language, setLanguage] = useState<Language>('en');

  // Theme State (Default light, toggles to dark)
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('das_theme') as Theme;
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Search & Category Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('das_bahrain_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('das_bahrain_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  // Sync Theme with root HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    try {
      localStorage.setItem('das_theme', theme);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  }, [theme]);

  // Set RTL / LTR on body
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cart Actions
  const handleAddToCart = (product: Product, packagingType: PackagingType, quantity: number) => {
    setCartItems((prevItems) => {
      const cartItemId = `${product.id}_${packagingType}`;
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
      const unitPrice = packagingType === 'single' ? product.singlePrice : product.cartonPrice;

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            product,
            packagingType,
            quantity,
            unitPrice,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // Smooth scroll handler
  const handleNavigateSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#070a0e] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
      
      {/* Sticky Top Navigation */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={handleNavigateSection}
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Backdrop Slideshow and Top Products Carousel */}
        <Hero
          language={language}
          onExploreProducts={() => handleNavigateSection('products')}
          onExploreB2B={() => handleNavigateSection('b2b')}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* Product Catalogue Section with in-page Search & Category Showcase */}
        <ProductGrid
          products={PRODUCTS}
          language={language}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* Dedicated B2B & Van Sales Section */}
        <B2BWholesaleSection language={language} />

        {/* About DAS Bahrain & Contact Hub */}
        <AboutContact language={language} />
      </main>

      {/* Corporate Footer */}
      <Footer
        language={language}
        onNavigateSection={handleNavigateSection}
      />

      {/* Quick View Product Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        language={language}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout & BenefitPay Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        language={language}
        onClearCart={handleClearCart}
      />

      {/* Floating AI Shopping Assistant */}
      <AIAssistant language={language} />

    </div>
  );
};
