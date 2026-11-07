import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/products";

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products", { signal: controller.signal });
        if (!response.ok) throw new Error("Produkte konnten nicht geladen werden.");
        setProducts(await response.json());
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }

    void loadProducts();
    return () => controller.abort();
  }, []);

  return (
    <div className="shell home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow"><span className="eyebrow__dot" /> MYSHOP KOLLEKTION</p>
          <h1 id="hero-title">Gute Basics.<br /><em>Jeden Tag.</em></h1>
          <p className="hero__description">Kleidung und Sneaker für deinen Alltag. Schlicht im Design, vielseitig zu kombinieren.</p>
          <a className="button" href="#produkte">Kollektion entdecken <Icon name="arrow" /></a>
        </div>
        <div className="hero__art" aria-hidden="true">
          <span className="hero__index">MYSHOP / 01</span>
          <img src="/products/hoodie.svg" alt="" />
          <span className="hero__caption">THE EVERYDAY EDIT</span>
        </div>
      </section>

      <section id="produkte" className="collection" aria-labelledby="collection-title">
        <div className="section-heading">
          <div><p className="eyebrow">DIE KOLLEKTION</p><h2 id="collection-title">Entdecke den Shop</h2></div>
          {products && <p className="section-heading__count">{products.length} Artikel</p>}
        </div>
        {error ? <p className="notice error" role="alert">Die Produkte konnten nicht geladen werden.</p>
          : !products ? <p className="notice" role="status">Produkte werden geladen…</p>
          : products.length === 0 ? <p className="notice">Aktuell sind keine Produkte verfügbar.</p>
          : <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
      </section>
    </div>
  );
}
