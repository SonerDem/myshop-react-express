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
      <div className="cart-item">
      <img src={item.product.imageUrl} alt={item.product.name}  className="cart-item__image" />
      <div className="cart-item__details">
      <h2>{item.product.name}</h2>

      <p >Farbe: {item.color}</p>
      <p >Größe: {item.size}</p>

      <div className="cart-item__quantity">
      <button
        type="button"
        onClick={() => decreaseQuantity(item.product.id)}
      >-</button>

      <p className="cart-item__price">{item.quantity}</p>

      <button
        type="button"
        onClick={() => increaseQuantity(item.product.id)}
      >+</button>
      </div>

      <p className="cart-summary__total">
        Preis:{" "}
        {(item.product.price * item.quantity).toFixed(2)} €
      </p>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => removeItem(item.product.id)}
      >
        Entfernen
      </button>
      </div>
      </div>
    </div>
  );
}