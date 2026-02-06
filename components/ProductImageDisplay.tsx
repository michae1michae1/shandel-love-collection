import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import type { ProductImage } from '../types/content';

interface ProductImageDisplayProps {
  image: ProductImage;
  isHovered: boolean;
}

export const ProductImageDisplay: React.FC<ProductImageDisplayProps> = ({ image, isHovered }) => {
  return (
    <div
      data-component="ProductImageDisplay"
      data-hovered={isHovered || undefined}
      className="product-image-display relative flex items-center justify-center w-full h-full"
    >
      {/* Ambient glow layers */}
      <ProductImageGlow isHovered={isHovered} />

      {/* Floating image container */}
      <motion.div
        className="product-image-display__frame relative z-10"
        animate={{
          y: isHovered ? -8 : -12,
          scale: isHovered ? 1.04 : 1,
          rotateY: isHovered ? 3 : 0,
        }}
        initial={{ y: 0 }}
        transition={
          isHovered
            ? { type: 'spring', stiffness: 200, damping: 20 }
            : { 
                y: { duration: 2.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 },
              }
        }
      >
        <ProductImageFrame image={image} isHovered={isHovered} />
      </motion.div>

      {/* Reflection / surface effect */}
      <ProductImageReflection isHovered={isHovered} />
    </div>
  );
};

interface ProductImageGlowProps {
  isHovered: boolean;
}

const ProductImageGlow: React.FC<ProductImageGlowProps> = ({ isHovered }) => (
  <>
    {/* Primary warm glow */}
    <motion.div
      className="product-image-display__glow absolute inset-0 z-0"
      animate={{
        opacity: isHovered ? 0.6 : 0.35,
        scale: isHovered ? 1.15 : 1,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(190, 130, 100, 0.25) 0%, rgba(120, 60, 70, 0.08) 50%, transparent 80%)',
      }}
    />
    {/* Secondary rose accent glow */}
    <motion.div
      className="product-image-display__glow--accent absolute inset-0 z-0"
      animate={{
        opacity: isHovered ? 0.5 : 0.2,
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        background: 'radial-gradient(ellipse 40% 35% at 50% 55%, rgba(225, 160, 140, 0.15) 0%, transparent 70%)',
      }}
    />
  </>
);

interface ProductImageFrameProps {
  image: ProductImage;
  isHovered: boolean;
}

const ProductImageFrame: React.FC<ProductImageFrameProps> = ({ image, isHovered }) => (
  <div
    className={cn(
      'product-image-display__image-wrapper relative rounded-2xl overflow-hidden',
      'max-w-[320px] sm:max-w-[380px] lg:max-w-[440px]',
      'shadow-2xl'
    )}
  >
    {/* Decorative border frame */}
    <motion.div
      className="product-image-display__border absolute inset-0 z-20 rounded-2xl pointer-events-none"
      animate={{
        opacity: isHovered ? 0.6 : 0.25,
      }}
      transition={{ duration: 0.4 }}
      style={{
        border: '1px solid rgba(225, 180, 160, 0.2)',
        boxShadow: isHovered
          ? '0 0 40px rgba(190, 130, 100, 0.15), inset 0 0 40px rgba(190, 130, 100, 0.05)'
          : '0 0 20px rgba(190, 130, 100, 0.08), inset 0 0 20px rgba(190, 130, 100, 0.03)',
      }}
    />

    {/* The product image with blend mode for white-background handling */}
    <img
      src={image.url}
      alt={image.altText || 'Featured product'}
      width={image.width}
      height={image.height}
      className={cn(
        'product-image-display__image w-full h-auto object-contain',
        'mix-blend-lighten'
      )}
      loading="eager"
    />

    {/* Vignette overlay for seamless black-background blending */}
    <div
      className="product-image-display__vignette absolute inset-0 z-10 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(12, 12, 12, 0.7) 100%)',
      }}
    />
  </div>
);

interface ProductImageReflectionProps {
  isHovered: boolean;
}

const ProductImageReflection: React.FC<ProductImageReflectionProps> = ({ isHovered }) => (
  <motion.div
    className="product-image-display__reflection absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
    animate={{
      opacity: isHovered ? 0.25 : 0.12,
      scaleX: isHovered ? 1.2 : 1,
    }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    style={{
      width: '70%',
      height: '20px',
      background: 'radial-gradient(ellipse at 50% 50%, rgba(190, 130, 100, 0.3) 0%, transparent 70%)',
      filter: 'blur(8px)',
    }}
  />
);

export default ProductImageDisplay;
