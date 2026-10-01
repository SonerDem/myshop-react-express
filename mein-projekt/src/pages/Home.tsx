import ProductCard from "../components/ProductCard";
import { products } from "../api/products";

function Home() {
  return (
    <main>
      <section>
        <h1>Willkommen bei MYSHOP</h1>

        <p>
          Entdecke unsere Produkte.
        </p>
      </section>

      <section>
        <h2>Unsere Produkte</h2>

        <div>
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