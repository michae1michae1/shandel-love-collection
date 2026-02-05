import React from 'react';
import { cn } from '../lib/cn';
import type { ProductData, ScentNote } from '../types/content';

interface ProductDetailsProps {
  product: ProductData;
  loading?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, loading = false }) => {
  const notes = product.scentNotes.length > 0 ? product.scentNotes : [];

  return (
    <section 
      data-component="ProductDetails"
      data-loading={loading || undefined}
      className="product-details py-24 bg-white text-black"
    >
      <div className="product-details__container max-w-7xl mx-auto px-6 md:px-12">
        <div className="product-details__grid grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div data-section="content" className="product-details__content space-y-12">
            <div data-section="header" className="product-details__header space-y-4">
              <span className="product-details__eyebrow text-[10px] uppercase tracking-[0.4em] font-bold text-rose-900/40">
                {product.sectionEyebrow || 'The Experience'}
              </span>
              <h3 className="product-details__title text-4xl md:text-6xl font-serif leading-tight">
                {product.sectionTitle || 'A Trail of LOVE.'}
              </h3>
            </div>
            
            <p className="product-details__description text-gray-500 text-lg leading-relaxed font-light">
              <span className="product-details__product-name font-serif italic text-black">{product.title}</span>{' '}
              {product.sectionDescription || product.description}
            </p>

            {notes.length > 0 && (
              <div data-section="scent-notes" className="product-details__notes space-y-8">
                {notes.map((note, idx) => (
                  <ScentNoteItem key={note.id} note={note} index={idx} />
                ))}
              </div>
            )}
          </div>

          <div data-section="image" className="product-details__image-container relative group overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl">
            <img 
              src={product.lifestyleImage?.url || 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=1000'} 
              alt={product.lifestyleImage?.altText || 'Fragrance application'} 
              className="product-details__image w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="product-details__image-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
            <div className="product-details__image-caption absolute bottom-10 left-10 text-white">
              <span className="product-details__caption-label text-[10px] uppercase tracking-widest font-bold">
                {product.imageCaption || 'The Muse'}
              </span>
              <p className="product-details__caption-quote font-serif text-2xl italic">
                {product.imageQuote || '"Love transforms everything."'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ScentNoteItemProps {
  note: ScentNote;
  index: number;
}

const ScentNoteItem: React.FC<ScentNoteItemProps> = ({ note, index }) => (
  <div 
    data-note-index={index}
    className="product-details__note flex items-start space-x-6"
  >
    <div className={cn(
      'product-details__note-badge w-12 h-12 rounded-full shrink-0 border border-black/5 flex items-center justify-center font-serif text-lg',
      note.colorClass
    )}>
      0{index + 1}
    </div>
    <div className="product-details__note-info space-y-1">
      <h4 className="product-details__note-title uppercase tracking-[0.2em] text-[10px] font-bold text-black/90">
        {note.title}
      </h4>
      <p className="product-details__note-scent text-gray-600 font-light">
        {note.description}
      </p>
    </div>
  </div>
);

export default ProductDetails;
