import { useCartStore } from '@/store/cart';

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const addToCart = (product: { id: string; name: string; basePrice: number }, color: string) => {
    addItem({
      id: `${product.id}-${color}`,
      productName: product.name,
      variantId: product.id,
      color,
      price: product.basePrice,
    });
  };

  return { items, addToCart, removeItem, clearCart };
}
