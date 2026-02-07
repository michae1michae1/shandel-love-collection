import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/cn';
import { useCart } from '../hooks/useCart';
import type { CartLine } from '../types/cart';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, isLoading, closeCart, updateQuantity, removeItem } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isCartOpen, closeCart]);

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  const lines = cart?.lines.nodes ?? [];
  const isEmpty = lines.length === 0;

  return (
    <div
      data-component="CartDrawer"
      data-open={isCartOpen || undefined}
      className={cn(
        'cart-drawer fixed inset-0 z-[100] transition-all duration-300',
        isCartOpen ? 'visible' : 'invisible pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'cart-drawer__backdrop absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300',
          isCartOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          'cart-drawer__panel absolute top-0 right-0 h-full w-full sm:w-[420px] bg-[#0c0c0c] border-l border-white/10',
          'flex flex-col transition-transform duration-300 ease-out',
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <CartDrawerHeader itemCount={cart?.totalQuantity ?? 0} onClose={closeCart} />

        {/* Content */}
        <div className="cart-drawer__content flex-1 overflow-y-auto">
          {isEmpty ? (
            <CartDrawerEmpty onClose={closeCart} />
          ) : (
            <div className="cart-drawer__lines p-4 space-y-4">
              {lines.map((line) => (
                <CartLineItem
                  key={line.id}
                  line={line}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <CartDrawerFooter
            subtotal={cart?.cost.subtotalAmount}
            total={cart?.cost.totalAmount}
            onCheckout={handleCheckout}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

interface CartDrawerHeaderProps {
  itemCount: number;
  onClose: () => void;
}

const CartDrawerHeader: React.FC<CartDrawerHeaderProps> = ({ itemCount, onClose }) => (
  <div className="cart-drawer__header flex items-center justify-between p-4 border-b border-white/10">
    <div className="cart-drawer__title flex items-center gap-3">
      <ShoppingBag className="w-5 h-5 text-rose-300" strokeWidth={1.5} />
      <h2 className="text-lg font-serif text-white tracking-wide">
        Your Cart
        {itemCount > 0 && (
          <span className="text-white/40 text-sm ml-2">({itemCount})</span>
        )}
      </h2>
    </div>
    <button
      className="cart-drawer__close text-white/60 hover:text-white transition-colors p-2 -mr-2"
      onClick={onClose}
      aria-label="Close cart"
    >
      <X size={24} strokeWidth={1.5} />
    </button>
  </div>
);

interface CartDrawerEmptyProps {
  onClose: () => void;
}

const CartDrawerEmpty: React.FC<CartDrawerEmptyProps> = ({ onClose }) => (
  <div className="cart-drawer__empty flex flex-col items-center justify-center h-full p-8 text-center">
    <div className="cart-drawer__empty-icon p-6 rounded-full bg-rose-900/20 border border-rose-500/20 mb-6">
      <ShoppingBag className="w-10 h-10 text-rose-300/60" strokeWidth={1} />
    </div>
    <h3 className="cart-drawer__empty-title text-xl font-serif text-white mb-2">
      Your cart is empty
    </h3>
    <p className="cart-drawer__empty-text text-white/50 text-sm mb-6 max-w-[240px]">
      Discover our signature fragrance and add it to your collection.
    </p>
    <button
      className="cart-drawer__empty-cta px-8 py-3 bg-white text-black font-bold uppercase tracking-[0.15em] text-xs hover:bg-rose-100 transition-all rounded-full"
      onClick={onClose}
    >
      Continue Shopping
    </button>
  </div>
);

interface CartLineItemProps {
  line: CartLine;
  onUpdateQuantity: (lineId: string, quantity: number) => Promise<void>;
  onRemove: (lineId: string) => Promise<void>;
  isLoading: boolean;
}

const CartLineItem: React.FC<CartLineItemProps> = ({ line, onUpdateQuantity, onRemove, isLoading }) => {
  const { merchandise, quantity, cost } = line;
  const productTitle = merchandise.product.title;
  const variantTitle = merchandise.title !== 'Default Title' ? merchandise.title : null;
  const imageUrl = merchandise.image?.url;
  const imageAlt = merchandise.image?.altText || productTitle;
  const price = parseFloat(cost.totalAmount.amount).toFixed(2);

  return (
    <div
      data-component="CartLineItem"
      className={cn(
        'cart-line-item flex gap-4 p-3 rounded-xl',
        'bg-white/[0.02] border border-white/5',
        isLoading && 'opacity-50 pointer-events-none'
      )}
    >
      {/* Product Image */}
      <div className="cart-line-item__image w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white/20" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="cart-line-item__details flex-1 min-w-0">
        <h4 className="cart-line-item__title text-sm font-medium text-white truncate">
          {productTitle}
        </h4>
        {variantTitle && (
          <p className="cart-line-item__variant text-xs text-white/40 mt-0.5">
            {variantTitle}
          </p>
        )}
        <p className="cart-line-item__price text-sm text-rose-200 mt-1">
          ${price}
        </p>

        {/* Quantity Controls */}
        <div className="cart-line-item__controls flex items-center gap-3 mt-2">
          <div className="cart-line-item__quantity flex items-center border border-white/10 rounded-full">
            <button
              className="cart-line-item__quantity-btn p-1.5 text-white/60 hover:text-white transition-colors disabled:opacity-30"
              onClick={() => onUpdateQuantity(line.id, quantity - 1)}
              disabled={isLoading || quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="cart-line-item__quantity-value w-8 text-center text-xs text-white">
              {quantity}
            </span>
            <button
              className="cart-line-item__quantity-btn p-1.5 text-white/60 hover:text-white transition-colors disabled:opacity-30"
              onClick={() => onUpdateQuantity(line.id, quantity + 1)}
              disabled={isLoading}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            className="cart-line-item__remove p-1.5 text-white/40 hover:text-rose-400 transition-colors"
            onClick={() => onRemove(line.id)}
            disabled={isLoading}
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface CartDrawerFooterProps {
  subtotal?: { amount: string; currencyCode: string };
  total?: { amount: string; currencyCode: string };
  onCheckout: () => void;
  isLoading: boolean;
}

const CartDrawerFooter: React.FC<CartDrawerFooterProps> = ({ subtotal, total, onCheckout, isLoading }) => {
  const subtotalAmount = subtotal ? parseFloat(subtotal.amount).toFixed(2) : '0.00';
  const totalAmount = total ? parseFloat(total.amount).toFixed(2) : '0.00';

  return (
    <div className="cart-drawer__footer border-t border-white/10 p-4 space-y-4">
      {/* Totals */}
      <div className="cart-drawer__totals space-y-2">
        <div className="cart-drawer__subtotal flex justify-between text-sm">
          <span className="text-white/60">Subtotal</span>
          <span className="text-white">${subtotalAmount}</span>
        </div>
        <div className="cart-drawer__shipping flex justify-between text-sm">
          <span className="text-white/60">Shipping</span>
          <span className="text-white/40 text-xs">Calculated at checkout</span>
        </div>
        <div className="cart-drawer__total flex justify-between text-base font-medium pt-2 border-t border-white/10">
          <span className="text-white">Total</span>
          <span className="text-rose-100">${totalAmount}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        className={cn(
          'cart-drawer__checkout w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs',
          'hover:bg-rose-100 transition-all rounded-full shadow-2xl shadow-white/5',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        onClick={onCheckout}
        disabled={isLoading}
      >
        Checkout
      </button>

      <p className="cart-drawer__secure text-center text-[9px] text-white/30 uppercase tracking-[0.2em]">
        Secure checkout powered by <span className="text-white/60 font-bold">Shopify</span>
      </p>
    </div>
  );
};

export default CartDrawer;
