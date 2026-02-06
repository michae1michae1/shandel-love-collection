import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Star, Leaf, Truck, Sparkles } from 'lucide-react';
import { BottleScene } from './three/BottleScene';
import { ProductImageDisplay } from './ProductImageDisplay';
import { PromoBanner } from './PromoBanner';
import { cn } from '../lib/cn';
import type { ProductData, ProductFeature } from '../types/content';

interface PreOrderSectionProps {
  product: ProductData;
  features?: ProductFeature[];
  loading?: boolean;
}

export const PreOrderSection: React.FC<PreOrderSectionProps> = ({ product, features, loading = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const useFeaturedImage = Boolean(product.featuredProductImage);

  return (
    <div 
      data-component="PreOrderSection"
      data-hovered={isHovered || undefined}
      data-loading={loading || undefined}
      data-display-mode={useFeaturedImage ? 'image' : '3d-model'}
      className="pre-order-section py-12 lg:py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-24 min-h-[90svh]"
    >
      <div 
        data-section={useFeaturedImage ? 'product-image' : '3d-canvas'}
        className={cn(
          'pre-order-section__canvas relative w-[85%] md:w-[70%] lg:w-1/2 h-[350px] lg:h-[700px] order-1 lg:order-1 outline-none focus:outline-none',
          useFeaturedImage && 'mb-6 lg:mb-0',
          isHovered && 'pre-order-section__canvas--hovered'
        )}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {useFeaturedImage ? (
          <ProductImageDisplay
            image={product.featuredProductImage!}
            isHovered={isHovered}
          />
        ) : (
          <div className="pre-order-section__canvas-inner absolute inset-0 z-10">
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <pointLight position={[0, 0, 5]} intensity={0.5} color="#FFD700" />
                
                <BottleScene isHovered={isHovered} />
                
                <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                <Environment preset="city" />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Suspense>
            </Canvas>
          </div>
        )}
      </div>

      <div data-section="product-info" className="pre-order-section__info w-full lg:w-1/2 order-2 lg:order-2 space-y-6 lg:space-y-8">
        <PreOrderHeader product={product} />
        <PreOrderDescription product={product} />
        <PreOrderFeatures features={features && features.length > 0 ? features : product.features} />
        {product.promo && <PromoBanner promo={product.promo} />}
        <PreOrderActions product={product} />
      </div>
    </div>
  );
};

interface PreOrderHeaderProps {
  product: ProductData;
}

const PreOrderHeader: React.FC<PreOrderHeaderProps> = ({ product }) => {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  return (
    <div className="pre-order-section__header space-y-3 lg:space-y-4">
      <div className="pre-order-section__rating flex items-center space-x-2">
        <div className="pre-order-section__stars flex text-rose-300">
          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
        </div>
        <span className="pre-order-section__rating-text text-white/40 text-xs font-medium uppercase tracking-widest">
          {product.ratingText || '5-Star User Rating!'}
        </span>
      </div>
      
      <h2 className="pre-order-section__title text-4xl lg:text-6xl font-serif text-white tracking-tight leading-tight italic">
        {product.title} <br />
        <span className="pre-order-section__subtitle not-italic opacity-80 text-3xl lg:text-5xl">
          {product.subtitle || 'Eau De Parfum'}
        </span>{" "}
        <span className="pre-order-section__size text-sm lg:text-lg italic opacity-70 block lg:inline mt-1 lg:mt-0">
          {product.sizeLabel || '50ml'}
        </span>
      </h2>
      
      <div className="pre-order-section__pricing flex items-baseline space-x-3 lg:space-x-4">
        <span className="pre-order-section__price text-3xl lg:text-4xl font-light text-rose-100">
          ${parseFloat(price.amount).toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="pre-order-section__price--original text-white/30 line-through text-base lg:text-lg font-light">
            ${parseFloat(compareAtPrice.amount).toFixed(2)}
          </span>
        )}
        {product.saleBadge && (
          <span className="pre-order-section__badge bg-rose-900/40 text-rose-200 text-[9px] lg:text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            {product.saleBadge}
          </span>
        )}
      </div>
    </div>
  );
};

interface PreOrderDescriptionProps {
  product: ProductData;
}

const PreOrderDescription: React.FC<PreOrderDescriptionProps> = ({ product }) => (
  <div className="pre-order-section__description space-y-4 text-white/70 font-light leading-relaxed text-sm lg:text-base">
    <p className="pre-order-section__description-text">
      {product.shortDescription || product.description}
    </p>
    {product.extendedDescription && (
      <p className="pre-order-section__description-text pre-order-section__description-text--secondary hidden sm:block">
        {product.extendedDescription}
      </p>
    )}
  </div>
);

interface PreOrderFeaturesProps {
  features: ProductFeature[];
}

const PreOrderFeatures: React.FC<PreOrderFeaturesProps> = ({ features }) => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'leaf':
        return <Leaf className="pre-order-section__feature-icon w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />;
      case 'truck':
        return <Truck className="pre-order-section__feature-icon w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />;
      case 'sparkles':
      default:
        return <Sparkles className="pre-order-section__feature-icon w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />;
    }
  };

  return (
    <div className="pre-order-section__features grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-6 py-4 lg:py-6 border-y border-white/10">
      {features.map((feature) => (
        <div key={feature.id} className="pre-order-section__feature flex flex-col items-center sm:items-start space-y-1 sm:space-y-2">
          {getIcon(feature.iconName)}
          <span className="pre-order-section__feature-title text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80 font-bold text-center sm:text-left">
            {feature.title}
          </span>
          <span className="pre-order-section__feature-subtitle text-[10px] text-white/40 text-center sm:text-left">
            {feature.subtitle}
          </span>
        </div>
      ))}
    </div>
  );
};

interface PreOrderActionsProps {
  product: ProductData;
}

const PreOrderActions: React.FC<PreOrderActionsProps> = ({ product }) => {
  const price = product.priceRange.minVariantPrice;
  const variantId = product.variants[0]?.id;

  const handlePreOrder = () => {
    // Shopify cart URL - replace with actual Shopify checkout integration
    const shopifyDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
    if (shopifyDomain && variantId) {
      // Extract numeric ID from Shopify GID
      const numericId = variantId.split('/').pop();
      window.open(`https://${shopifyDomain}/cart/add?id=${numericId}&quantity=1`, '_blank');
    } else {
      console.warn('Shopify not configured or no variant available');
    }
  };

  return (
    <div className="pre-order-section__actions space-y-4">
      <button 
        className="pre-order-section__cta w-full py-4 lg:py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose-100 transition-all rounded-full shadow-2xl shadow-white/5 active:scale-95"
        onClick={handlePreOrder}
      >
        Pre-Order Now — ${parseFloat(price.amount).toFixed(0)}
      </button>
      <p className="pre-order-section__secure-checkout text-center text-[9px] lg:text-[10px] text-white/30 uppercase tracking-[0.2em]">
        Secure checkout powered by <span className="pre-order-section__secure-checkout-highlight text-white/60 font-bold">Shopify</span>
      </p>
    </div>
  );
};

export default PreOrderSection;
