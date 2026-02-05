import React from 'react';
import { Skeleton, SkeletonText } from './Skeleton';

export const HeroSkeleton: React.FC = () => (
  <section 
    data-component="HeroSkeleton"
    className="hero-skeleton relative h-screen w-full flex items-center justify-center overflow-hidden bg-black/60"
  >
    <div className="hero-skeleton__content relative z-20 text-center px-4 max-w-4xl mx-auto">
      {/* Badge skeleton */}
      <div className="mb-6 flex justify-center">
        <Skeleton variant="rectangular" className="h-8 w-48 rounded-full" />
      </div>
      
      {/* Title skeleton */}
      <div className="mb-8 space-y-4">
        <Skeleton variant="text" className="h-16 md:h-24 w-full mx-auto" />
        <Skeleton variant="text" className="h-16 md:h-24 w-3/4 mx-auto" />
      </div>
      
      {/* CTA buttons skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Skeleton variant="rectangular" className="h-14 w-48 rounded-full" />
        <Skeleton variant="text" className="h-4 w-32" />
      </div>
    </div>
  </section>
);

export default HeroSkeleton;
