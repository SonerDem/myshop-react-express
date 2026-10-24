import { useParams } from "react-router-dom";
import { products } from "../api/products";
import { useCartStore } from "../stores/cartStore";
import { useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string | null>(null); 
  const [selectedColor, setSelectedColor] = useState<string | null>(null); 

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

      <select id="color" 
        name="color" 
        value={selectedColor || ""}
        onChange={(e) => setSelectedColor(e.target.value)}>

          <option value="" disabled>
            Farbe auswählen
          </option>

        {product.color.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>

      
      <select id="size" 
        name="size" 
        value={selectedSize || ""}
        onChange={(e) => setSelectedSize(e.target.value)}>

          <option value="" disabled>
            Größe auswählen
          </option>

        {product.size.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>


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