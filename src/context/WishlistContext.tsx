"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product, WishlistItem } from "@/types";

interface WishlistContextValue {
  items: WishlistItem[];
  totalItems: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "status-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* localStorage недоступен */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* игнорировать ошибки записи */
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) return prev;
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) {
        return prev.filter((i) => i.product.id !== product.id);
      }
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        totalItems: items.length,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
