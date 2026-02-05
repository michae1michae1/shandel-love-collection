
import React, { useState, useEffect } from 'react';
import { Navbar, Hero, PreOrderSection, ProductDetails, Footer } from './components';
import { cn } from './lib/cn';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      data-page="HomePage"
      data-state="ready"
      className="home-page min-h-screen selection:bg-rose-200 selection:text-black"
    >
      <Navbar scrolled={scrolled} />
      
      <main data-section="main-content" className="home-page__main">
        {/* Fullscreen Video Hero */}
        <Hero />
        
        {/* The 3D Interactive Pre-Order Centerpiece */}
        <section 
          id="pre-order" 
          data-section="pre-order"
          className="home-page__pre-order-section relative z-10 bg-[#0c0c0c]"
        >
          <PreOrderSection />
        </section>

        {/* Detailed Scent Narrative */}
        <ProductDetails />
      </main>

      <Footer />
      
      {/* Decorative Gradients */}
      <div 
        data-section="decorative-gradients"
        className="home-page__gradients fixed top-0 left-0 w-full h-screen pointer-events-none opacity-20 z-0"
      >
        <div className="home-page__gradient home-page__gradient--rose absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/30 blur-[120px]"></div>
        <div className="home-page__gradient home-page__gradient--orange absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-900/20 blur-[100px]"></div>
      </div>
    </div>
  );
};

export default App;
