import { Link } from "react-router-dom";
import type { Product } from "../types/products";
import { formatPrice } from "../formatPrice";
import Icon from "./Icon";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__media">
          <ProductImage product={product} className="product-card__image" />
        </div>
        <div className="product-card__content">
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
          <p className="product-card__description">{product.description}</p>
          <div className="product-card__bottom">
            <strong>{formatPrice(product.price)}</strong>
            <span className="circle-icon"><Icon name="arrow" /></span>
          </div>
        </div>
      </Link>
    </article>
  );
}
