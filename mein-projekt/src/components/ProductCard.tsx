import type { Product } from "../types/products";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <img
        src={product.imageUrl}
        alt={product.name}
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>{product.price.toFixed(2)} €</p>

      <button>
        In den Warenkorb
      </button>
    </article>
  );
}

export default ProductCard;