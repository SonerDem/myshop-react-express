import { Link } from "react-router-dom";
import { formatPrice } from "../formatPrice";
import { useCartStore } from "../stores/cartStore";
import type { CartItem as CartItemType } from "../stores/cartStore";
import ProductImage from "./ProductImage";

export default function CartItem({ item }: { item: CartItemType }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const { product } = item;

  return (
    <li className="cart-item">
      <ProductImage product={product} className="cart-item__image" />
      <div className="cart-item__details">
        <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
        <p>{item.color} · Größe {item.size}</p>
        <div className="cart-item__actions">
          <div className="cart-item__quantity">
            <button type="button" aria-label={`Menge für ${product.name} verringern`} onClick={() => decreaseQuantity(product.id)}>−</button>
            <span>{item.quantity}</span>
            <button type="button" aria-label={`Menge für ${product.name} erhöhen`} onClick={() => increaseQuantity(product.id)}>+</button>
          </div>
          <button className="text-button" type="button" aria-label={`${product.name} entfernen`} onClick={() => removeItem(product.id)}>Entfernen</button>
        </div>
      </div>
      <strong className="cart-item__price">{formatPrice(product.price * item.quantity)}</strong>
    </li>
  );
}
