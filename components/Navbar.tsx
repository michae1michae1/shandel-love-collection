
import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between ${
        scrolled ? 'bg-[#0c0c0c]/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center space-x-8">
        <button className="text-white hover:text-rose-200 transition-colors hidden md:block uppercase tracking-widest text-xs font-light">
          Collection
        </button>
        <button className="text-white hover:text-rose-200 transition-colors hidden md:block uppercase tracking-widest text-xs font-light">
          Experience
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="font-serif text-2xl md:text-3xl tracking-[0.1em] font-medium text-white uppercase">
          Shandel Love
        </span>
        <span className="text-[10px] tracking-[0.4em] text-rose-200/80 uppercase -mt-0 font-light">
          Collection
        </span>
      </div>

      <div className="flex items-center space-x-6 md:space-x-8">
        <a 
          href="#pre-order" 
          className="hidden sm:flex px-6 py-2 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-rose-100 transition-all rounded-full"
        >
          Pre-Order
        </a>
        <button className="text-white hover:text-rose-200 transition-colors relative">
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 bg-rose-400 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            0
          </span>
        </button>
        <button className="text-white md:hidden">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
