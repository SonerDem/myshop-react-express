import { useCartStore } from "../stores/cartStore";
import CartItem from "../components/CartItem";

function Cart() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);


  if (items.length === 0) {
    return (
      <main>
        <h1>Warenkorb</h1>
        <p>Dein Warenkorb ist leer.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Warenkorb</h1>
      {items.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))} 
      
      <button
        type="button"
        onClick={clearCart}
      >
        Warenkorb leeren
      </button>
      <div>
      <p className="cart-summary">
        Gesamt: {totalPrice.toFixed(2)} €
      </p>
      </div>
      <button
        type="button"
        className="cart-summary__checkout"
      >
        Zur Kasse
      </button>
    </main>
  );
}

export default Cart;