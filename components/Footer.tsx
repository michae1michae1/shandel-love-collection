import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  // Extensible for future props
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer 
      data-component="Footer"
      className="footer bg-[#0c0c0c] text-white pt-24 pb-12 border-t border-white/5"
    >
      <div className="footer__container max-w-7xl mx-auto px-6 md:px-12">
        <div data-section="footer-grid" className="footer__grid grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div data-section="brand-info" className="footer__brand md:col-span-2 space-y-6">
            <h4 className="footer__brand-name font-serif text-3xl italic tracking-widest">Shandel Love</h4>
            <p className="footer__brand-description text-white/40 max-w-sm font-light leading-relaxed">
              We create intimate sensory experiences. Crafting small-batch fragrances that resonate with the human form.
            </p>
            <div data-section="social-links" className="footer__social flex space-x-6 text-white/60">
              <Instagram size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
              <Twitter size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
              <Facebook size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          <div data-section="info-links" className="footer__info-section space-y-6">
            <h5 className="footer__section-title uppercase tracking-[0.2em] text-xs font-bold text-rose-200/80">Information</h5>
            <ul className="footer__links space-y-4 text-sm text-white/40 font-light">
              <li className="footer__link hover:text-white transition-colors cursor-pointer">Shipping Policy</li>
              <li className="footer__link hover:text-white transition-colors cursor-pointer">Returns & Exchanges</li>
              <li className="footer__link hover:text-white transition-colors cursor-pointer">Sustainability</li>
              <li className="footer__link hover:text-white transition-colors cursor-pointer">Ingredient Glossary</li>
            </ul>
          </div>

          <div data-section="newsletter" className="footer__newsletter space-y-6">
            <h5 className="footer__section-title uppercase tracking-[0.2em] text-xs font-bold text-rose-200/80">Newsletter</h5>
            <div className="footer__newsletter-content space-y-4">
              <p className="footer__newsletter-text text-xs text-white/40 font-light">Join for early access to future drops and events.</p>
              <div className="footer__newsletter-form flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="footer__newsletter-input bg-transparent border-b border-white/20 py-2 focus:border-white outline-none text-sm transition-all"
                />
                <button className="footer__newsletter-submit text-[10px] uppercase tracking-[0.2em] font-bold text-rose-200 text-left hover:text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div data-section="copyright" className="footer__copyright pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-[10px] uppercase tracking-widest text-white/20">
          <p className="footer__copyright-text">© 2024 Shandel Love Collection. All Rights Reserved.</p>
          <div className="footer__legal flex space-x-8">
            <span className="footer__legal-link">Privacy Policy</span>
            <span className="footer__legal-link">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
