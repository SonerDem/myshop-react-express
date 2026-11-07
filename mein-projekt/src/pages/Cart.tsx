import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import Icon from "../components/Icon";
import { formatPrice } from "../formatPrice";
import { useCartStore } from "../stores/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const quantity = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <section className="shell page">
      <Link className="back-link" to="/"><Icon name="back" /> Weiter einkaufen</Link>
      <div className="page-heading">
        <p className="eyebrow">DEINE AUSWAHL</p>
        <h1>Warenkorb</h1>
      </div>
      {items.length === 0 ? (
        <div className="empty-cart">
          <span className="circle-icon"><Icon name="bag" /></span>
          <h2>Dein Warenkorb ist leer.</h2>
          <p>In der Kollektion findest du Kleidung und Sneaker für deinen Alltag.</p>
          <Link className="button" to="/">Zum Shop <Icon name="arrow" /></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            <ul className="cart-list">
              {items.map((item) => <CartItem key={JSON.stringify([item.product.id, item.color, item.size])} item={item} />)}
            </ul>
            <button className="text-button" type="button" onClick={clearCart}>Warenkorb leeren</button>
          </div>
          <aside className="cart-summary" aria-labelledby="summary-title">
            <h2 id="summary-title">Übersicht</h2>
            <p className="cart-summary__row"><span>Artikel</span><span>{quantity}</span></p>
            <p className="cart-summary__row cart-summary__total"><span>Gesamt</span><strong>{formatPrice(total)}</strong></p>
            <button type="button" className="button" disabled>Zur Kasse <Icon name="arrow" /></button>
            <p className="cart-summary__note">Die Kasse ist noch nicht verfügbar.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
