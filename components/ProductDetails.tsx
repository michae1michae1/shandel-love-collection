import React from 'react';
import { cn } from '../lib/cn';

interface ProductDetailsProps {
  // Extensible for future props
}

interface ScentNote {
  title: string;
  scent: string;
  color: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const notes: ScentNote[] = [
    { title: "Top Notes", scent: "Bright Citrus, Sun-kissed Bergamot", color: "bg-orange-100" },
    { title: "Heart Notes", scent: "Soft Lavender, Fresh Rose", color: "bg-rose-200" },
    { title: "Base Notes", scent: "Velvety Maple, Warm Vanilla", color: "bg-rose-900" }
  ];

  return (
    <section 
      data-component="ProductDetails"
      className="product-details py-24 bg-white text-black"
    >
      <div className="product-details__container max-w-7xl mx-auto px-6 md:px-12">
        <div className="product-details__grid grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div data-section="content" className="product-details__content space-y-12">
            <div data-section="header" className="product-details__header space-y-4">
              <span className="product-details__eyebrow text-[10px] uppercase tracking-[0.4em] font-bold text-rose-900/40">The Experience</span>
              <h3 className="product-details__title text-4xl md:text-6xl font-serif leading-tight">A Trail of LOVE.</h3>
            </div>
            
            <p className="product-details__description text-gray-500 text-lg leading-relaxed font-light">
              <span className="product-details__product-name font-serif italic text-black">Love "Le Nouveau"</span> is a scent crafted to uplift the spirit, calm the heart, and leave a trail of LOVE wherever you go. Organic & Natural ingredients only.
            </p>

            <div data-section="scent-notes" className="product-details__notes space-y-8">
              {notes.map((note, idx) => (
                <div 
                  key={idx} 
                  data-note-index={idx}
                  className="product-details__note flex items-start space-x-6"
                >
                  <div className={cn(
                    'product-details__note-badge w-12 h-12 rounded-full shrink-0 border border-black/5 flex items-center justify-center font-serif text-lg',
                    note.color
                  )}>
                    0{idx + 1}
                  </div>
                  <div className="product-details__note-info space-y-1">
                    <h4 className="product-details__note-title uppercase tracking-[0.2em] text-[10px] font-bold text-black/90">{note.title}</h4>
                    <p className="product-details__note-scent text-gray-600 font-light">{note.scent}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-section="image" className="product-details__image-container relative group overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=1000" 
              alt="Fragrance application" 
              className="product-details__image w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="product-details__image-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
            <div className="product-details__image-caption absolute bottom-10 left-10 text-white">
              <span className="product-details__caption-label text-[10px] uppercase tracking-widest font-bold">The Muse</span>
              <p className="product-details__caption-quote font-serif text-2xl italic">"Love transforms everything."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
