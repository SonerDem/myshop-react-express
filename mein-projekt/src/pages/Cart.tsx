import { useCartStore } from "../stores/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

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
        <div key={item.product.id}>
          <h2>{item.product.name}</h2>

          <p>
            Menge: {item.quantity}
          </p>
          <button onClick={() => increaseQuantity(item.product.id)}>+</button>
          <button onClick={() => decreaseQuantity(item.product.id)}>-</button>

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
      ))}

      <button
        type="button"
        onClick={clearCart}
      >
        Warenkorb leeren
      </button>
    </main>
  );
}

export default Cart;