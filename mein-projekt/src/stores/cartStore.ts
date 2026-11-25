import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/products";

export interface CartItem {
  product: Product;
  color: string;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, color: string, size: string) => void;
  removeItem: (productId: number, color: string, size: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: number, color: string, size: string) => void;
  decreaseQuantity: (productId: number, color: string, size: string) => void;
}

const isSameItem = (
  item: CartItem,
  productId: number,
  color: string,
  size: string
): boolean => {
  return (
    item.product.id === productId &&
    item.color === color &&
    item.size === size
  );
};

export const useCartStore = create<CartStore>()(persist((set) => ({
  items: [],
  

  increaseQuantity: (productId, color, size) =>
    set((state) => ({
      items: state.items.map((item) =>
        isSameItem(item, productId, color, size)
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      ),
    })),  

  decreaseQuantity: (productId, color, size) =>
    set((state) => ({
      items: state.items
        .filter((item) => !(isSameItem(item, productId, color, size) && item.quantity === 1))
        .map((item) =>
          isSameItem(item, productId, color, size)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
    })),

  addItem: (product, color, size) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => isSameItem(item, product.id, color, size)
        
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            isSameItem(item, product.id, color, size)
              ? {
                  ...item,
                  product,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            product,
            color: color, 
            size: size, 
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (productId, color, size) =>
    set((state) => ({
      items: state.items.filter(
        (item) => !isSameItem(item, productId, color, size)
      ),
    })),

  clearCart: () => set({ items: [] }),
}), {
  name: "myshop-cart",
  partialize: (state) => ({ items: state.items }),
}));
