
import React, { Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PreOrderSection from './components/PreOrderSection';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';

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
    <div className="min-h-screen selection:bg-rose-200 selection:text-black">
      <Navbar scrolled={scrolled} />
      
      <main>
        {/* Fullscreen Video Hero */}
        <Hero />
        
        {/* The 3D Interactive Pre-Order Centerpiece */}
        <section id="pre-order" className="relative z-10 bg-[#0c0c0c]">
            <PreOrderSection />
        </section>

        {/* Detailed Scent Narrative */}
        <ProductDetails />
      </main>

      <Footer />
      
      {/* Decorative Gradients */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none opacity-20 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/30 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-900/20 blur-[100px]"></div>
      </div>
    </div>
  );
};

export default App;
