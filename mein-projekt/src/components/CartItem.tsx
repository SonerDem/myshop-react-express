import { useCartStore } from "../stores/cartStore";
import type { CartItem as CartItemType } from "../stores/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  return (
    <div>
      <h2>{item.product.name}</h2>

      <p>Menge: {item.quantity}</p>

      <button
        type="button"
        onClick={() => increaseQuantity(item.product.id)}
      >
        +
      </button>

      <button
        type="button"
        onClick={() => decreaseQuantity(item.product.id)}
      >
        -
      </button>

      <p>
        Preis:{" "}
        {(item.product.price * item.quantity).toFixed(2)} €
      </p>

      <button
        type="button"
        onClick={() => removeItem(item.product.id)}
      >
        Entfernen
      </button>
    </div>
  );
}