import React from 'react';
import { Skeleton, SkeletonText, SkeletonImage } from './Skeleton';

export const ProductDetailsSkeleton: React.FC = () => (
  <section 
    data-component="ProductDetailsSkeleton"
    className="product-details-skeleton py-24 bg-white"
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        {/* Content skeleton */}
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Skeleton variant="text" className="h-3 w-24 bg-rose-900/20" />
            <Skeleton variant="text" className="h-12 md:h-16 w-full bg-gray-200" />
          </div>
          
          {/* Description */}
          <SkeletonText lines={3} className="[&_.skeleton]:bg-gray-200" />
          
          {/* Scent notes */}
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-6">
                <Skeleton variant="circular" className="w-12 h-12 bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <Skeleton variant="text" className="h-3 w-20 bg-gray-200" />
                  <Skeleton variant="text" className="h-4 w-48 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Image skeleton */}
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl">
          <Skeleton variant="rectangular" className="w-full h-full bg-gray-200" />
        </div>
      </div>
    </div>
  </section>
);

export default ProductDetailsSkeleton;
