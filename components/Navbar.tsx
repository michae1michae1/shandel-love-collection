import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '../lib/cn';
import { useCart } from '../hooks/useCart';
import type { SiteSettings } from '../types/content';

interface NavbarProps {
  scrolled: boolean;
  siteSettings: SiteSettings;
  loading?: boolean;
  onCollectionClick?: () => void;
  onExperienceClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  scrolled, 
  siteSettings, 
  loading = false,
  onCollectionClick,
  onExperienceClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, openCart } = useCart();
  const cartCount = cart?.totalQuantity ?? 0;

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleExperienceClick = () => {
    setMobileMenuOpen(false);
    if (onExperienceClick) {
      onExperienceClick();
    } else {
      // Default behavior: scroll to experience section
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCollectionClick = () => {
    setMobileMenuOpen(false);
    onCollectionClick?.();
  };

  const handlePreOrderClick = () => {
    setMobileMenuOpen(false);
    document.getElementById('pre-order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        data-component="Navbar"
        data-scrolled={scrolled || undefined}
        data-loading={loading || undefined}
        className={cn(
          'navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between',
          scrolled && 'navbar--scrolled bg-[#0c0c0c]/80 backdrop-blur-md py-4 border-b border-white/5',
          !scrolled && 'bg-transparent'
        )}
      >
        <div data-section="nav-links" className="navbar__links flex items-center space-x-8">
          <button 
            className="navbar__link text-white hover:text-rose-200 transition-colors hidden md:block uppercase tracking-widest text-xs font-light"
            onClick={handleCollectionClick}
          >
            Collection
          </button>
          <button 
            className="navbar__link text-white hover:text-rose-200 transition-colors hidden md:block uppercase tracking-widest text-xs font-light"
            onClick={handleExperienceClick}
          >
            Experience
          </button>
        </div>

        <div data-section="brand" className="navbar__brand absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="navbar__brand-name font-serif text-xl md:text-3xl tracking-[0.1em] font-medium text-white uppercase whitespace-nowrap">
            {siteSettings.brandName}
          </span>
          <span className="navbar__brand-tagline text-[10px] tracking-[0.4em] text-rose-200/80 uppercase -mt-0 font-light">
            {siteSettings.brandTagline}
          </span>
        </div>

        <div data-section="actions" className="navbar__actions flex items-center space-x-6 md:space-x-8">
          <a 
            href="#pre-order" 
            className="navbar__cta hidden sm:flex px-6 py-2 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-rose-100 transition-all rounded-full"
          >
            Pre-Order
          </a>
          <button 
            className="navbar__cart text-white hover:text-rose-200 transition-colors relative"
            onClick={openCart}
            aria-label="Open cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="navbar__cart-count absolute -top-1 -right-1 bg-rose-400 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
          <button 
            className="navbar__menu-toggle text-white md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        data-component="MobileMenu"
        data-open={mobileMenuOpen || undefined}
        className={cn(
          'mobile-menu fixed inset-0 z-[60] md:hidden transition-all duration-300',
          mobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div 
          className={cn(
            'mobile-menu__backdrop absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300',
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div 
          className={cn(
            'mobile-menu__panel absolute top-0 right-0 h-full w-[280px] bg-[#0c0c0c] border-l border-white/10 transition-transform duration-300 ease-out',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Close Button */}
          <div className="mobile-menu__header flex justify-end p-4">
            <button 
              className="text-white/60 hover:text-white transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="mobile-menu__nav px-6 py-8 space-y-6">
            <button
              className="mobile-menu__link block w-full text-left text-white hover:text-rose-200 transition-colors uppercase tracking-widest text-sm font-light py-3 border-b border-white/10"
              onClick={handleCollectionClick}
            >
              Collection
              <span className="block text-[10px] text-white/40 mt-1 normal-case tracking-normal">Coming Soon</span>
            </button>
            <button
              className="mobile-menu__link block w-full text-left text-white hover:text-rose-200 transition-colors uppercase tracking-widest text-sm font-light py-3 border-b border-white/10"
              onClick={handleExperienceClick}
            >
              Experience
              <span className="block text-[10px] text-white/40 mt-1 normal-case tracking-normal">Discover the scent</span>
            </button>
            <button
              className="mobile-menu__link block w-full text-left text-white hover:text-rose-200 transition-colors uppercase tracking-widest text-sm font-light py-3 border-b border-white/10"
              onClick={handlePreOrderClick}
            >
              Pre-Order
              <span className="block text-[10px] text-white/40 mt-1 normal-case tracking-normal">Reserve your bottle</span>
            </button>
          </nav>

          {/* Brand Footer */}
          <div className="mobile-menu__footer absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
            <div className="text-center">
              <span className="font-serif text-lg tracking-[0.1em] text-white/60 uppercase">
                {siteSettings.brandName}
              </span>
              <span className="block text-[9px] tracking-[0.3em] text-rose-200/50 uppercase mt-1">
                {siteSettings.brandTagline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
