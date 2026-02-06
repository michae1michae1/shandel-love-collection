import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { HeroContent } from '../types/content';

interface HeroProps {
  content: HeroContent;
  loading?: boolean;
  onSecondaryClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, loading = false, onSecondaryClick }) => {
  return (
    <section 
      data-component="Hero"
      data-loading={loading || undefined}
      className="hero relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Video or Image */}
      <div data-section="background" className="hero__background absolute inset-0 z-0">
        <div className="hero__overlay absolute inset-0 bg-black/40 z-10" />
        {content.backgroundVideoUrl ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="hero__video w-full h-full object-cover scale-110"
            poster={content.backgroundPosterUrl}
          >
            <source src={content.backgroundVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={content.backgroundPosterUrl}
            alt="Hero background"
            className="hero__poster w-full h-full object-cover scale-110"
          />
        )}
      </div>

      <div data-section="content" className="hero__content relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="hero__badge mb-6 inline-block px-4 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
          <span className="hero__badge-text text-[10px] uppercase tracking-[0.3em] font-medium text-rose-200">
            {content.badgeText}
          </span>
        </div>
        
        <h1 className="hero__title text-5xl md:text-8xl font-serif text-white mb-8 leading-tight tracking-tight italic">
          {content.titleLine1} <br />
          <span className="hero__title-highlight not-italic opacity-90">{content.titleLine2}</span>
        </h1>
        
        <div className="hero__subtitle mb-10 max-w-xl mx-auto px-6 py-1 border border-none rounded-2xl bg-none backdrop-none">
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
           
          </p>
        </div>
        
        <div data-section="actions" className="hero__actions flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href={content.primaryCtaLink} 
            className="hero__cta hero__cta--primary w-full sm:w-auto px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose-100 transition-all rounded-full shadow-2xl shadow-white/10"
          >
            {content.primaryCtaText}
          </a>
          {content.secondaryCtaText && (
            <button 
              className="hero__cta hero__cta--secondary text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
              onClick={onSecondaryClick}
            >
              {content.secondaryCtaText}
            </button>
          )}
        </div>
      </div>

      <div data-section="scroll-indicator" className="hero__scroll-indicator absolute bottom-10 inset-x-0 z-20 flex justify-center animate-bounce">
        <ChevronDown className="text-white/40" size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;
