import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { cn } from '../lib/cn';
import { useCart } from '../hooks/useCart';
import { getVariantAvailability } from '../lib/shopify/cart';
import type { PromoData } from '../types/content';

interface PromoBannerProps {
  promo: PromoData;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ promo }) => {
  return (
    <div
      data-component="PromoBanner"
      className="promo-banner relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(120, 60, 70, 0.15) 0%, rgba(30, 20, 22, 0.6) 50%, rgba(120, 60, 70, 0.1) 100%)',
        border: '1px solid rgba(225, 180, 160, 0.12)',
        boxShadow: '0 0 30px rgba(190, 130, 100, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      }}
    >
      {/* Badge */}
      {promo.badgeText && <PromoBadge text={promo.badgeText} />}

      <div className="promo-banner__content flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5">
        {/* Travel bottle image */}
        <PromoImage image={promo.image} />

        {/* Text + CTA */}
        <PromoDetails promo={promo} />
      </div>
    </div>
  );
};

interface PromoBadgeProps {
  text: string;
}

const PromoBadge: React.FC<PromoBadgeProps> = ({ text }) => (
  <div className="promo-banner__badge absolute top-0 right-0 z-10">
    <div
      className={cn(
        'promo-banner__badge-pill',
        'px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em]',
        'bg-rose-800/60 text-rose-100 rounded-bl-lg rounded-tr-2xl'
      )}
    >
      {text}
    </div>
  </div>
);

interface PromoImageProps {
  image: PromoData['image'];
}

const PromoImage: React.FC<PromoImageProps> = ({ image }) => (
  <div className="promo-banner__image-frame relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
    {/* Glow behind the image */}
    <div
      className="promo-banner__image-glow absolute inset-0 rounded-xl"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(190, 130, 100, 0.2) 0%, transparent 70%)',
      }}
    />
    <img
      src={image.url}
      alt={image.altText || 'Travel companion bottle'}
      width={image.width}
      height={image.height}
      className="promo-banner__image relative z-10 w-full h-full object-contain mix-blend-lighten rounded-xl"
      loading="lazy"
    />
  </div>
);

interface PromoDetailsProps {
  promo: PromoData;
}

const PromoDetails: React.FC<PromoDetailsProps> = ({ promo }) => {
  const { addItem, openCart, isAdding } = useCart();
  const [isAvailable, setIsAvailable] = useState(true);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(true);

  // Fetch bundle variant availability on mount
  useEffect(() => {
    // DEBUG: Log the variant ID from the metafield
    console.log('[PromoBanner] Bundle variant ID from metafield:', promo.bundleVariantId);
    
    if (!promo.bundleVariantId) {
      console.warn('[PromoBanner] No bundle variant ID configured');
      setIsAvailable(false);
      setIsCheckingAvailability(false);
      return;
    }

    let cancelled = false;

    async function checkAvailability() {
      try {
        const availability = await getVariantAvailability(promo.bundleVariantId);
        // DEBUG: Log the full availability response
        console.log('[PromoBanner] Availability check result:', {
          inputId: promo.bundleVariantId,
          response: availability,
        });
        
        if (!cancelled) {
          setIsAvailable(availability?.availableForSale ?? false);
        }
      } catch (error) {
        console.error('[PromoBanner] Failed to check bundle variant availability:', error);
        if (!cancelled) {
          // Default to available if check fails (let the cart API handle errors)
          setIsAvailable(true);
        }
      } finally {
        if (!cancelled) {
          setIsCheckingAvailability(false);
        }
      }
    }

    checkAvailability();
    return () => { cancelled = true; };
  }, [promo.bundleVariantId]);

  const handleBundleCta = async () => {
    if (!promo.bundleVariantId || !isAvailable) return;
    
    await addItem(promo.bundleVariantId);
    openCart();
  };

  const getButtonLabel = () => {
    if (isCheckingAvailability) return 'Loading...';
    if (!isAvailable) return 'Out of Stock';
    if (isAdding) return 'Adding...';
    return promo.ctaText;
  };

  const canClick = isAvailable && !isAdding && !isCheckingAvailability && !!promo.bundleVariantId;

  return (
    <div className="promo-banner__details flex-1 text-center sm:text-left space-y-2">
      {/* Headline */}
      <div className="promo-banner__headline-row flex items-center justify-center sm:justify-start gap-2">
        <Gift className="promo-banner__icon w-3.5 h-3.5 text-rose-300 flex-shrink-0" />
        <h3 className="promo-banner__headline text-xs sm:text-sm font-bold text-white tracking-wide">
          {promo.headline}
        </h3>
      </div>

      {/* Description */}
      {promo.description && (
        <p className="promo-banner__description text-[11px] sm:text-xs text-white/50 font-light leading-relaxed">
          {promo.description}
        </p>
      )}

      {/* CTA */}
      <button
        className={cn(
          'promo-banner__cta',
          'inline-flex items-center gap-2 px-5 py-2 mt-1',
          'text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]',
          'rounded-full transition-all',
          isAvailable && !isCheckingAvailability
            ? 'border border-white/20 text-white hover:bg-white/10 hover:border-rose-300/30 active:scale-95'
            : 'border border-white/10 text-white/30 cursor-not-allowed',
          'disabled:opacity-60 disabled:cursor-not-allowed'
        )}
        onClick={handleBundleCta}
        disabled={!canClick}
      >
        {getButtonLabel()}
        {isAvailable && !isAdding && !isCheckingAvailability && promo.bundlePrice && (
          <span className="promo-banner__cta-price text-rose-200/70 font-light">
            — ${parseFloat(promo.bundlePrice).toFixed(0)}
          </span>
        )}
      </button>
    </div>
  );
};

export default PromoBanner;
