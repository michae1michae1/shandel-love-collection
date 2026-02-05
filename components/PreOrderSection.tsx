import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Star, Leaf, Truck, Sparkles } from 'lucide-react';
import { BottleScene } from './three/BottleScene';
import { cn } from '../lib/cn';

interface PreOrderSectionProps {
  // Extensible for future props
}

export const PreOrderSection: React.FC<PreOrderSectionProps> = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      data-component="PreOrderSection"
      data-hovered={isHovered || undefined}
      className="pre-order-section py-12 lg:py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-24 min-h-[90svh]"
    >
      <div 
        data-section="3d-canvas"
        className={cn(
          'pre-order-section__canvas relative w-[85%] md:w-[70%] lg:w-1/2 h-[350px] lg:h-[700px] order-1 lg:order-1 outline-none focus:outline-none',
          isHovered && 'pre-order-section__canvas--hovered'
        )}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
      </div>

      <div data-section="product-info" className="pre-order-section__info w-full lg:w-1/2 order-2 lg:order-2 space-y-6 lg:space-y-8">
        <PreOrderHeader />
        <PreOrderDescription />
        <PreOrderFeatures />
        <PreOrderActions />
      </div>
    </div>
  );
};

const PreOrderHeader: React.FC = () => (
  <div className="pre-order-section__header space-y-3 lg:space-y-4">
    <div className="pre-order-section__rating flex items-center space-x-2">
      <div className="pre-order-section__stars flex text-rose-300">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
      </div>
      <span className="pre-order-section__rating-text text-white/40 text-xs font-medium uppercase tracking-widest">5-Star User Rating!</span>
    </div>
    
    <h2 className="pre-order-section__title text-4xl lg:text-6xl font-serif text-white tracking-tight leading-tight italic">
      Love "Le Nouveau" <br />
      <span className="pre-order-section__subtitle not-italic opacity-80 text-3xl lg:text-5xl">
        Eau De Parfum
      </span>{" "}
      <span className="pre-order-section__size text-sm lg:text-lg italic opacity-70 block lg:inline mt-1 lg:mt-0">
        50ml 1.7oz
      </span>
    </h2>
    
    <div className="pre-order-section__pricing flex items-baseline space-x-3 lg:space-x-4">
      <span className="pre-order-section__price text-3xl lg:text-4xl font-light text-rose-100">$185.00</span>
      <span className="pre-order-section__price--original text-white/30 line-through text-base lg:text-lg font-light">$220.00</span>
      <span className="pre-order-section__badge bg-rose-900/40 text-rose-200 text-[9px] lg:text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Early Access</span>
    </div>
  </div>
);

const PreOrderDescription: React.FC = () => (
  <div className="pre-order-section__description space-y-4 text-white/70 font-light leading-relaxed text-sm lg:text-base">
    <p className="pre-order-section__description-text">
      Housed in French glass and crowned with carved travertine stone. This fragrance is a natural and organic blend of bright citrus and sun-kissed bergamot melting into a velvety sweetness of maple and vanilla.
    </p>
    <p className="pre-order-section__description-text pre-order-section__description-text--secondary hidden sm:block">
      Soft whispers of lavender and rose drift through each breath, wrapping you in warmth of serenity.
    </p>
  </div>
);

const PreOrderFeatures: React.FC = () => (
  <div className="pre-order-section__features grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-6 py-4 lg:py-6 border-y border-white/10">
    <div className="pre-order-section__feature flex flex-col items-center sm:items-start space-y-1 sm:space-y-2">
      <Leaf className="pre-order-section__feature-icon w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />
      <span className="pre-order-section__feature-title text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80 font-bold text-center sm:text-left">Organic</span>
      <span className="pre-order-section__feature-subtitle text-[10px] text-white/40 text-center sm:text-left">Natural Ingredients</span>
    </div>
    <div className="pre-order-section__feature flex flex-col items-center sm:items-start space-y-1 sm:space-y-2">
      <Truck className="pre-order-section__feature-icon w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />
      <span className="pre-order-section__feature-title text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80 font-bold text-center sm:text-left">Priority</span>
      <span className="pre-order-section__feature-subtitle text-[10px] text-white/40 text-center sm:text-left">Fast Delivery</span>
    </div>
    <div className="pre-order-section__feature flex flex-col items-center sm:items-start space-y-1 sm:space-y-2">
      <Sparkles className="pre-order-section__feature-icon w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />
      <span className="pre-order-section__feature-title text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80 font-bold text-center sm:text-left">EXCLUSIVE</span>
      <span className="pre-order-section__feature-subtitle text-[10px] text-white/40 text-center sm:text-left">Limited pre-orders</span>
    </div>
  </div>
);

const PreOrderActions: React.FC = () => {
  const handlePreOrder = () => {
    window.open('https://your-shopify-store.myshopify.com/cart/add?id=YOUR_VARIANT_ID&quantity=1', '_blank');
  };

  return (
    <div className="pre-order-section__actions space-y-4">
      <button 
        className="pre-order-section__cta w-full py-4 lg:py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose-100 transition-all rounded-full shadow-2xl shadow-white/5 active:scale-95"
        onClick={handlePreOrder}
      >
        Pre-Order Now — $185
      </button>
      <p className="pre-order-section__secure-checkout text-center text-[9px] lg:text-[10px] text-white/30 uppercase tracking-[0.2em]">
        Secure checkout powered by <span className="pre-order-section__secure-checkout-highlight text-white/60 font-bold">Shopify</span>
      </p>
    </div>
  );
};

export default PreOrderSection;
