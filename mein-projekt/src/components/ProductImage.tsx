import { useState } from "react";
import type { Product } from "../types/products";
import Icon from "./Icon";

const illustrations: Record<string, string> = {
  "/products/tshirt.jpg": "/products/tshirt.svg",
  "/products/hoodie.jpg": "/products/hoodie.svg",
  "/products/sneakers.jpg": "/products/sneakers.svg",
};

export default function ProductImage({ product, className = "" }: { product: Product; className?: string }) {
  const [failedUrl, setFailedUrl] = useState("");
  const url = illustrations[product.imageUrl] ?? product.imageUrl;

  if (!url || failedUrl === url) {
    return <div className={`product-image-placeholder ${className}`} role="img" aria-label={`Kein Bild für ${product.name} verfügbar`}><Icon name="image" /></div>;
  }

  return <img className={className} src={url} alt={product.name} onError={() => setFailedUrl(url)} />;
}
