import ProductCard from "../components/ProductCard";
import { products } from "../api/products";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1>Willkommen bei MYSHOP</h1>

        <p>
          Entdecke unsere Produkte.
        </p>
      </section>

      <section className="products-section">
        <h2>Unsere Produkte</h2>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;