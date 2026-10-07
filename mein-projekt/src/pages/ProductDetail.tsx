import { useParams } from "react-router-dom";
import { products } from "../api/products";
import { useCartStore } from "../stores/cartStore";

function ProductDetail() {
  const { id } = useParams();

  const productId = Number(id);

  const product = products.find(
    (product) => product.id === productId
  );

  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <main>
        <h1>Produkt nicht gefunden</h1>
      </main>
    );
  }

  return (
    <main>
      <img
        src={product.imageUrl}
        alt={product.name}
      />

      <p>{product.category}</p>

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>{product.price.toFixed(2)} €</p>

      <button
        type="button"
        onClick={() => addItem(product)}
      >
        In den Warenkorb
      </button>
    </main>
  );
}

export default ProductDetail;