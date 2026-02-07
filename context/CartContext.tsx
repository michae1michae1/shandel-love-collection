import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Cart } from '../types/cart';
import {
  createCart,
  addToCart,
  updateCartLines,
  removeCartLines,
  getCart,
  normalizeVariantId,
} from '../lib/shopify/cart';

const CART_STORAGE_KEY = 'shandel-love-cart-id';

interface CartContextValue {
  cart: Cart | null;
  isCartOpen: boolean;
  isLoading: boolean;
  isAdding: boolean;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Rehydrate cart from localStorage on mount
  useEffect(() => {
    async function initializeCart() {
      const storedCartId = localStorage.getItem(CART_STORAGE_KEY);
      
      if (storedCartId) {
        try {
          const existingCart = await getCart(storedCartId);
          if (existingCart && existingCart.lines.nodes.length > 0) {
            setCart(existingCart);
          } else {
            // Cart is empty or expired, clear storage
            localStorage.removeItem(CART_STORAGE_KEY);
          }
        } catch (error) {
          console.error('Failed to fetch existing cart:', error);
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
      
      setIsLoading(false);
    }

    initializeCart();
  }, []);

  // Persist cart ID to localStorage whenever cart changes
  useEffect(() => {
    if (cart?.id) {
      localStorage.setItem(CART_STORAGE_KEY, cart.id);
    }
  }, [cart?.id]);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsAdding(true);
    
    try {
      const normalizedId = normalizeVariantId(variantId);
      const lineInput = { merchandiseId: normalizedId, quantity };
      
      if (cart?.id) {
        // Add to existing cart
        const updatedCart = await addToCart(cart.id, [lineInput]);
        if (updatedCart) {
          setCart(updatedCart);
        }
      } else {
        // Create new cart with this item
        const newCart = await createCart([lineInput]);
        if (newCart) {
          setCart(newCart);
        }
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setIsAdding(false);
    }
  }, [cart?.id]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    
    setIsLoading(true);
    
    try {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const updatedCart = await removeCartLines(cart.id, [lineId]);
        if (updatedCart) {
          setCart(updatedCart);
        }
      } else {
        // Update quantity
        const updatedCart = await updateCartLines(cart.id, [{ id: lineId, quantity }]);
        if (updatedCart) {
          setCart(updatedCart);
        }
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart?.id) return;
    
    setIsLoading(true);
    
    try {
      const updatedCart = await removeCartLines(cart.id, [lineId]);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id]);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const value = useMemo<CartContextValue>(() => ({
    cart,
    isCartOpen,
    isLoading,
    isAdding,
    addItem,
    updateQuantity,
    removeItem,
    openCart,
    closeCart,
  }), [cart, isCartOpen, isLoading, isAdding, addItem, updateQuantity, removeItem, openCart, closeCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
