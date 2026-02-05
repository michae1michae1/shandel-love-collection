import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  // Extensible for future props
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section 
      data-component="Hero"
      className="hero relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div data-section="background" className="hero__background absolute inset-0 z-0">
        <div className="hero__overlay absolute inset-0 bg-black/40 z-10" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero__video w-full h-full object-cover scale-110"
          poster="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-water-splashing-on-a-black-background-4074-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div data-section="content" className="hero__content relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="hero__badge mb-6 inline-block px-4 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
          <span className="hero__badge-text text-[10px] uppercase tracking-[0.3em] font-medium text-rose-200">
            Dropping Spring 2026
          </span>
        </div>
        
        <h1 className="hero__title text-5xl md:text-8xl font-serif text-white mb-8 leading-tight tracking-tight italic">
          Love Transforms <br />
          <span className="hero__title-highlight not-italic opacity-90">Everything.</span>
        </h1>
        
        <div className="hero__subtitle mb-10 max-w-xl mx-auto px-6 py-1 border border-none rounded-2xl bg-none backdrop-none">
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
           
          </p>
        </div>
        
        <div data-section="actions" className="hero__actions flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#pre-order" 
            className="hero__cta hero__cta--primary w-full sm:w-auto px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose-100 transition-all rounded-full shadow-2xl shadow-white/10"
          >
            Claim Your Bottle
          </a>
          <button className="hero__cta hero__cta--secondary text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">
            Discover the Scent
          </button>
        </div>
      </div>

      <div data-section="scroll-indicator" className="hero__scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-white/40" size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;

