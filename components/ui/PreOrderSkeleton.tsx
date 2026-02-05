import React from 'react';
import { Skeleton, SkeletonText, SkeletonButton } from './Skeleton';

export const PreOrderSkeleton: React.FC = () => (
  <div 
    data-component="PreOrderSkeleton"
    className="pre-order-skeleton py-12 lg:py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-24 min-h-[90svh]"
  >
    {/* 3D Canvas placeholder */}
    <div className="relative w-[85%] md:w-[70%] lg:w-1/2 h-[350px] lg:h-[700px] order-1">
      <Skeleton variant="rectangular" className="w-full h-full rounded-2xl" />
    </div>

    {/* Product info skeleton */}
    <div className="w-full lg:w-1/2 order-2 space-y-6 lg:space-y-8">
      {/* Rating */}
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="circular" className="w-4 h-4" />
          ))}
        </div>
        <Skeleton variant="text" className="h-3 w-32" />
      </div>
      
      {/* Title */}
      <div className="space-y-4">
        <Skeleton variant="text" className="h-12 lg:h-16 w-full" />
        <Skeleton variant="text" className="h-8 lg:h-10 w-2/3" />
      </div>
      
      {/* Price */}
      <div className="flex items-baseline space-x-4">
        <Skeleton variant="text" className="h-10 w-24" />
        <Skeleton variant="text" className="h-6 w-16" />
        <Skeleton variant="rectangular" className="h-6 w-24 rounded" />
      </div>
      
      {/* Description */}
      <SkeletonText lines={3} />
      
      {/* Features */}
      <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <Skeleton variant="circular" className="w-5 h-5" />
            <Skeleton variant="text" className="h-3 w-16" />
            <Skeleton variant="text" className="h-3 w-20" />
          </div>
        ))}
      </div>
      
      {/* CTA Button */}
      <SkeletonButton />
      <Skeleton variant="text" className="h-3 w-48 mx-auto" />
    </div>
  </div>
);

export default PreOrderSkeleton;
