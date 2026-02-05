
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video Mockup - Abstract fluid textures suggesting luxury and skin */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover scale-110"
          poster="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-water-splashing-on-a-black-background-4074-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 inline-block px-4 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-rose-200">
                Dropping Spring 2026
            </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight tracking-tight italic">
          Love Transforms <br />
          <span className="not-italic opacity-90">Everything.</span>
        </h1>
        
        <div className="mb-10 max-w-xl mx-auto px-6 py-1 border border-none rounded-2xl bg-none backdrop-none">
            <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
             
            </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#pre-order" 
            className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose-100 transition-all rounded-full shadow-2xl shadow-white/10"
          >
            Claim Your Bottle
          </a>
          <button className="text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">
            Discover the Scent
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-white/40" size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;
