import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import type { SiteSettings } from '../types/content';

interface FooterProps {
  siteSettings: SiteSettings;
  loading?: boolean;
  shopifyDomain?: string;
}

export const Footer: React.FC<FooterProps> = ({ siteSettings, loading = false, shopifyDomain }) => {
  const getPolicyUrl = (policy: string) => {
    if (shopifyDomain) {
      return `https://${shopifyDomain}/policies/${policy}`;
    }
    return `#${policy}`;
  };

  return (
    <footer 
      data-component="Footer"
      data-loading={loading || undefined}
      className="footer bg-[#0c0c0c] text-white pt-24 pb-12 border-t border-white/5"
    >
      <div className="footer__container max-w-7xl mx-auto px-6 md:px-12">
        <div data-section="footer-grid" className="footer__grid grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div data-section="brand-info" className="footer__brand md:col-span-2 space-y-6">
            <h4 className="footer__brand-name font-serif text-3xl italic tracking-widest">
              {siteSettings.brandName}
            </h4>
            <p className="footer__brand-description text-white/40 max-w-sm font-light leading-relaxed">
              {siteSettings.brandDescription}
            </p>
            <div data-section="social-links" className="footer__social flex space-x-6 text-white/60">
              {siteSettings.instagramUrl && (
                <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
                </a>
              )}
              {siteSettings.twitterUrl && (
                <a href={siteSettings.twitterUrl} target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
                </a>
              )}
              {siteSettings.facebookUrl && (
                <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
                </a>
              )}
              {!siteSettings.instagramUrl && !siteSettings.twitterUrl && !siteSettings.facebookUrl && (
                <>
                  <Instagram size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
                  <Twitter size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
                  <Facebook size={20} strokeWidth={1.5} className="footer__social-icon hover:text-white transition-colors cursor-pointer" />
                </>
              )}
            </div>
          </div>

          <div data-section="info-links" className="footer__info-section space-y-6">
            <h5 className="footer__section-title uppercase tracking-[0.2em] text-xs font-bold text-rose-200/80">Information</h5>
            <ul className="footer__links space-y-4 text-sm text-white/40 font-light">
              <li>
                <a href={getPolicyUrl('shipping-policy')} className="footer__link hover:text-white transition-colors cursor-pointer">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href={getPolicyUrl('refund-policy')} className="footer__link hover:text-white transition-colors cursor-pointer">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#sustainability" className="footer__link hover:text-white transition-colors cursor-pointer">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#ingredients" className="footer__link hover:text-white transition-colors cursor-pointer">
                  Ingredient Glossary
                </a>
              </li>
            </ul>
          </div>

          <div data-section="newsletter" className="footer__newsletter space-y-6">
            <h5 className="footer__section-title uppercase tracking-[0.2em] text-xs font-bold text-rose-200/80">
              {siteSettings.newsletterHeading}
            </h5>
            <div className="footer__newsletter-content space-y-4">
              <p className="footer__newsletter-text text-xs text-white/40 font-light">
                {siteSettings.newsletterText}
              </p>
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
          <p className="footer__copyright-text">{siteSettings.copyrightText}</p>
          <div className="footer__legal flex space-x-8">
            <a href={getPolicyUrl('privacy-policy')} className="footer__legal-link hover:text-white/40 transition-colors">
              Privacy Policy
            </a>
            <a href={getPolicyUrl('terms-of-service')} className="footer__legal-link hover:text-white/40 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
