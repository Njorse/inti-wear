import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
  talla: string;
  color: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clear: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.id === item.id && i.talla === item.talla && i.color === item.color
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.talla === item.talla && i.color === item.color
                ? { ...i, cantidad: i.cantidad + item.cantidad }
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      updateQuantity: (id, cantidad) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, cantidad } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.precio * i.cantidad, 0),
    }),
    { name: "inti-cart" }
  )
);