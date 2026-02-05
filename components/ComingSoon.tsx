import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { cn } from '../lib/cn';

interface ComingSoonProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-component="ComingSoon"
      className={cn(
        'coming-soon fixed inset-0 z-[100] flex items-center justify-center',
        'bg-[#0c0c0c]/95 backdrop-blur-xl',
        'animate-in fade-in duration-300'
      )}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="coming-soon__close absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {/* Content */}
      <div
        className="coming-soon__content text-center px-8 max-w-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="coming-soon__icon mb-8 flex justify-center">
          <div className="p-6 rounded-full bg-rose-900/20 border border-rose-500/20">
            <Sparkles className="w-12 h-12 text-rose-300" strokeWidth={1} />
          </div>
        </div>

        {/* Badge */}
        <div className="coming-soon__badge mb-6 inline-block px-4 py-1 border border-white/20 rounded-full bg-white/5">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-rose-200">
            Full Collection
          </span>
        </div>

        {/* Title */}
        <h2 className="coming-soon__title text-5xl md:text-7xl font-serif text-white mb-6 leading-tight tracking-tight italic">
          Coming Soon
        </h2>

        {/* Description */}
        <p className="coming-soon__description text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-md mx-auto">
          Our full collection is being crafted with care. Sign up for early access and be the first to explore.
        </p>

        {/* CTA */}
        <div className="coming-soon__actions flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pre-order"
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose-100 transition-all rounded-full"
          >
            Pre-Order Now
          </a>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
          >
            Back to Site
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="coming-soon__decorations fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-900/15 blur-[120px]" />
      </div>
    </div>
  );
};

export default ComingSoon;
