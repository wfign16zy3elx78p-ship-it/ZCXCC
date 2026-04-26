import { create } from 'zustand';

export interface CartItem {
  id: string;
  productName: string;
  variantId: string;
  color: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (variantId: string, color: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.variantId === item.variantId && i.color === item.color,
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === item.variantId && i.color === item.color
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }

      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (variantId, color) =>
    set((state) => ({
      items: state.items.filter((i) => !(i.variantId === variantId && i.color === color)),
    })),
  clearCart: () => set({ items: [] }),
}));
