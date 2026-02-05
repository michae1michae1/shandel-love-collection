
import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c0c0c] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-serif text-3xl italic tracking-widest">Shandel Love</h4>
            <p className="text-white/40 max-w-sm font-light leading-relaxed">
              We create intimate sensory experiences. Crafting small-batch fragrances that resonate with the human form.
            </p>
            <div className="flex space-x-6 text-white/60">
              <Instagram size={20} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
              <Twitter size={20} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
              <Facebook size={20} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="uppercase tracking-[0.2em] text-xs font-bold text-rose-200/80">Information</h5>
            <ul className="space-y-4 text-sm text-white/40 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">Shipping Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Returns & Exchanges</li>
              <li className="hover:text-white transition-colors cursor-pointer">Sustainability</li>
              <li className="hover:text-white transition-colors cursor-pointer">Ingredient Glossary</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="uppercase tracking-[0.2em] text-xs font-bold text-rose-200/80">Newsletter</h5>
            <div className="space-y-4">
              <p className="text-xs text-white/40 font-light">Join for early access to future drops and events.</p>
              <div className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent border-b border-white/20 py-2 focus:border-white outline-none text-sm transition-all"
                />
                <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose-200 text-left hover:text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-[10px] uppercase tracking-widest text-white/20">
          <p>© 2024 Shandel Love Collection. All Rights Reserved.</p>
          <div className="flex space-x-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
