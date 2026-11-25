import { Link } from "react-router-dom";
import { formatPrice } from "../formatPrice";
import { useCartStore } from "../stores/cartStore";
import type { CartItem as CartItemType } from "../stores/cartStore";
import ProductImage from "./ProductImage";

export default function CartItem({ item }: { item: CartItemType }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const { product, color, size } = item;
  const variantName = `${product.name}, ${color}, Größe ${size}`;

  return (
    <li className="cart-item">
      <ProductImage product={product} className="cart-item__image" />
      <div className="cart-item__details">
        <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
        <p>{item.color} · Größe {item.size}</p>
        <div className="cart-item__actions">
          <div className="cart-item__quantity">
            <button type="button" aria-label={`Menge für ${variantName} verringern`} onClick={() => decreaseQuantity(product.id, color, size)}>−</button>
            <span>{item.quantity}</span>
            <button type="button" aria-label={`Menge für ${variantName} erhöhen`} onClick={() => increaseQuantity(product.id, color, size)}>+</button>
          </div>
          <button className="text-button" type="button" aria-label={`${variantName} entfernen`} onClick={() => removeItem(product.id, color, size)}>Entfernen</button>
        </div>
      </div>
      <strong className="cart-item__price">{formatPrice(product.price * item.quantity)}</strong>
    </li>
  );
}
