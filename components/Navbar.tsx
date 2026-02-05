
import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { cn } from '../lib/cn';

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  return (
    <nav 
      data-component="Navbar"
      data-scrolled={scrolled || undefined}
      className={cn(
        'navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between',
        scrolled && 'navbar--scrolled bg-[#0c0c0c]/80 backdrop-blur-md py-4 border-b border-white/5',
        !scrolled && 'bg-transparent'
      )}
    >
      <div data-section="nav-links" className="navbar__links flex items-center space-x-8">
        <button className="navbar__link text-white hover:text-rose-200 transition-colors hidden md:block uppercase tracking-widest text-xs font-light">
          Collection
        </button>
        <button className="navbar__link text-white hover:text-rose-200 transition-colors hidden md:block uppercase tracking-widest text-xs font-light">
          Experience
        </button>
      </div>

      <div data-section="brand" className="navbar__brand absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="navbar__brand-name font-serif text-2xl md:text-3xl tracking-[0.1em] font-medium text-white uppercase">
          Shandel Love
        </span>
        <span className="navbar__brand-tagline text-[10px] tracking-[0.4em] text-rose-200/80 uppercase -mt-0 font-light">
          Collection
        </span>
      </div>

      <div data-section="actions" className="navbar__actions flex items-center space-x-6 md:space-x-8">
        <a 
          href="#pre-order" 
          className="navbar__cta hidden sm:flex px-6 py-2 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-rose-100 transition-all rounded-full"
        >
          Pre-Order
        </a>
        <button className="navbar__cart text-white hover:text-rose-200 transition-colors relative">
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="navbar__cart-count absolute -top-1 -right-1 bg-rose-400 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            0
          </span>
        </button>
        <button className="navbar__menu-toggle text-white md:hidden">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
