import { Link } from "react-router-dom";
import type { Product } from "../types/products";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {

  return (
      <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__image-link">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card__image"
        />
      </Link>

      <div className="product-card__content">
        <span className="product-card__category">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-card__title"
        >
          {product.name}
        </Link>

        <p className="product-card__description">
          {product.description}
        </p>

        <div className="product-card__bottom">
          <span className="product-card__price">
            {product.price.toFixed(2)} €
          </span>          
        </div>
      </div>
    </article>
  );
}

export default ProductCard;