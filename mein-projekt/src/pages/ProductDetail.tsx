import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import ProductImage from "../components/ProductImage";
import { formatPrice } from "../formatPrice";
import { useCartStore } from "../stores/cartStore";
import type { Product } from "../types/products";

export default function ProductDetail() {
  const { id } = useParams();
  return <ProductPage key={id} id={Number(id)} />;
}

function ProductPage({ id }: { id: number }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        if (!Number.isInteger(id) || id <= 0) throw new Error("Ungültige Produkt-ID.");
        const response = await fetch(`http://localhost:3000/api/products/${id}`, { signal: controller.signal });
        if (response.status === 404) throw new Error("Produkt nicht gefunden.");
        if (!response.ok) throw new Error("Produkt konnte nicht geladen werden.");
        setProduct(await response.json());
      } catch (error) {
        if (controller.signal.aborted) return;
        setError(error instanceof Error ? error.message : "Produkt konnte nicht geladen werden.");
      }
    }

    void loadProduct();
    return () => controller.abort();
  }, [id]);

  return (
    <section className="shell page">
      <Link className="back-link" to="/"><Icon name="back" /> Zur Kollektion</Link>
      {error ? <h1 className="notice error">{error}</h1> : !product ? <p className="notice" role="status">Produkt wird geladen…</p> : (
        <div className="detail">
          <ProductImage product={product} className="detail__image" />
          <div className="detail__content">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="detail__price">{formatPrice(product.price)}</p>
            <p className="detail__description">{product.description}</p>
            <form className="detail__form" onSubmit={(event) => {
              event.preventDefault();
              if (!color || !size) return;
              addItem(product, color, size);
              setAdded(true);
            }}>
              <div className="detail__options">
                <label>Farbe
                  <select name="color" required value={color} onChange={(event) => { setColor(event.target.value); setAdded(false); }}>
                    <option value="" disabled>Auswählen</option>
                    {product.color.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label>Größe
                  <select name="size" required value={size} onChange={(event) => { setSize(event.target.value); setAdded(false); }}>
                    <option value="" disabled>Auswählen</option>
                    {product.size.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              </div>
              <button className="button" type="submit"><Icon name="bag" /> In den Warenkorb</button>
              {added && <p className="notice success" role="status">Hinzugefügt. <Link to="/cart">Zum Warenkorb</Link></p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
