import ProductCard from "../components/ProductCard";
import type { Product } from "../types/products";
import { useState, useEffect } from "react";

function Home() {
  const [backendItems, setbackendItems] = useState<Product[]>([]);

  useEffect(() => {   
    async function fetchData() {
      await fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => setbackendItems(data))
        .catch((error) => console.error("Fehler beim Abrufen der Daten:", error));
    }  
    fetchData();          
    }, [])



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
          {backendItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;