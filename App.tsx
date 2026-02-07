import React, { useState, useEffect } from 'react';
import { Navbar, Hero, PreOrderSection, ProductDetails, Footer, ComingSoon, CartDrawer } from './components';
import { HeroSkeleton, PreOrderSkeleton, ProductDetailsSkeleton } from './components/ui';
import { useHeroContent, useSiteSettings, useShopifyProduct, useProductFeatures, useScentNotes } from './hooks';
import { CartProvider } from './context/CartContext';
import { DEFAULT_SITE_SETTINGS } from './types/content';

const FEATURED_PRODUCT_HANDLE = import.meta.env.VITE_FEATURED_PRODUCT_HANDLE || 'love-le-nouveau';
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Fetch CMS content from Shopify
  const { heroContent, loading: heroLoading } = useHeroContent();
  const { siteSettings, loading: siteLoading } = useSiteSettings();
  const { product, loading: productLoading } = useShopifyProduct(FEATURED_PRODUCT_HANDLE);
  const { features, loading: featuresLoading } = useProductFeatures();
  const { scentNotes, loading: scentNotesLoading } = useScentNotes();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CartProvider>
      <div 
        data-page="HomePage"
        data-state={heroLoading || productLoading ? 'loading' : 'ready'}
        className="home-page min-h-screen selection:bg-rose-200 selection:text-black"
      >
        <Navbar 
          scrolled={scrolled} 
          siteSettings={siteLoading ? DEFAULT_SITE_SETTINGS : siteSettings}
          loading={siteLoading}
          onCollectionClick={() => setShowComingSoon(true)}
          onExperienceClick={() => {
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Coming Soon Modal */}
        <ComingSoon 
          isOpen={showComingSoon} 
          onClose={() => setShowComingSoon(false)} 
        />
        
        <main data-section="main-content" className="home-page__main">
          {/* Fullscreen Video Hero */}
          {heroLoading ? (
            <HeroSkeleton />
          ) : (
            <Hero 
              content={heroContent}
              loading={heroLoading}
              onSecondaryClick={() => {
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}
          
          {/* The 3D Interactive Pre-Order Centerpiece */}
          <section 
            id="pre-order" 
            data-section="pre-order"
            className="home-page__pre-order-section relative z-10 bg-[#0c0c0c]"
          >
            {productLoading || featuresLoading ? (
              <PreOrderSkeleton />
            ) : (
              <PreOrderSection 
                product={product}
                features={features}
                loading={productLoading}
              />
            )}
          </section>

          {/* Detailed Scent Narrative */}
          {productLoading || scentNotesLoading ? (
            <ProductDetailsSkeleton />
          ) : (
            <ProductDetails 
              product={product}
              scentNotes={scentNotes}
              loading={productLoading}
            />
          )}
        </main>

        <Footer 
          siteSettings={siteLoading ? DEFAULT_SITE_SETTINGS : siteSettings}
          loading={siteLoading}
          shopifyDomain={SHOPIFY_DOMAIN}
        />
        
        {/* Decorative Gradients */}
        <div 
          data-section="decorative-gradients"
          className="home-page__gradients fixed top-0 left-0 w-full h-screen pointer-events-none opacity-20 z-0"
        >
          <div className="home-page__gradient home-page__gradient--rose absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/30 blur-[120px]"></div>
          <div className="home-page__gradient home-page__gradient--orange absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-900/20 blur-[100px]"></div>
        </div>

        {/* Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default App;
