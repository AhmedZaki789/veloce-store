'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { Product } from './data';

export type CartItem = Product & { qty: number };

type CartContextValue = {
  cart: CartItem[];
  addToCart: (p: Product, qty?: number) => void;
  updateQty: (item: CartItem, qty: number) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  miniOpen: boolean;
  setMiniOpen: (v: boolean) => void;
  flash: string | null;
  setFlash: (v: string | null) => void;
  cartCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const itemKey = (p: { id: string; name: string }) => p.id + (p.name || '');

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [miniOpen, setMiniOpen] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('veloce_cart');
      if (raw) setCart(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('veloce_cart', JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  const addToCart = useCallback((p: Product, qty = 1) => {
    setCart((prev) => {
      const key = itemKey(p);
      const idx = prev.findIndex((x) => itemKey(x) === key);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { ...p, qty }];
    });
    setFlash(`Added — ${p.name}`);
    setTimeout(() => setFlash(null), 2200);
  }, []);

  const updateQty = useCallback((item: CartItem, qty: number) => {
    setCart((prev) => prev.map((x) => (itemKey(x) === itemKey(item) ? { ...x, qty } : x)));
  }, []);

  const removeItem = useCallback((item: CartItem) => {
    setCart((prev) => prev.filter((x) => itemKey(x) !== itemKey(item)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeItem, clearCart, miniOpen, setMiniOpen, flash, setFlash, cartCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
