import React from 'react';
import { cn } from '../../lib/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  animate = true,
}) => {
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  return (
    <div
      data-component="Skeleton"
      className={cn(
        'skeleton bg-white/10',
        variantClasses[variant],
        animate && 'animate-pulse',
        className
      )}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

// Pre-built skeleton components for common patterns

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 1, className }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={cn(
          'h-4',
          i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
        )}
      />
    ))}
  </div>
);

export const SkeletonHeading: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton variant="text" className={cn('h-10 w-2/3', className)} />
);

export const SkeletonImage: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton variant="rectangular" className={cn('w-full aspect-[4/5]', className)} />
);

export const SkeletonButton: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton variant="rectangular" className={cn('h-14 w-full rounded-full', className)} />
);

export default Skeleton;
