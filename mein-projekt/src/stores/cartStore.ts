import { create } from "zustand";
import type { Product } from "../types/products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  increaseQuantity: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      ),
    })),  

    decreaseQuantity: (productId) =>
      set((state) => ({
       items: state.items
          .filter((item) => {
            return !(item.product.id === productId
            && item.quantity === 1)                     
          })
          .map((item) => 
            item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
          ),
      })),

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
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
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.product.id !== productId
      ),
    })),

  clearCart: () => set({ items: [] }),
}));