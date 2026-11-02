import { useParams } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { useState, useEffect } from "react";
import type { Product } from "../types/products";

function ProductDetail() {
  // Liest die Produkt-ID aus der URL, z. B. /products/1
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Speichert das geladene Produkt; am Anfang ist noch keines vorhanden
  const [product, setProduct] = useState<Product | null>(null);

  // Zeigt an, ob das Produkt gerade geladen wird
  const [loading, setLoading] = useState(true);

  // Speichert eine mögliche Fehlermeldung
  const [error, setError] = useState<string | null>(null);

  // Wandelt die Produkt-ID aus der URL von String in Number um
  const productId = Number(id);
  useEffect(() => {
    async function fetchData() {
      try {
        // Ladezustand aktivieren und alte Daten zurücksetzen
        setLoading(true);
        setError(null);
        setProduct(null);

        // Prüfen, ob die Produkt-ID eine gültige positive Ganzzahl ist
        if (!Number.isInteger(productId) || productId <= 0) {
          throw new Error("Ungültige Produkt-ID.");
        }

        // Produkt anhand seiner ID vom Backend abrufen
        const response = await fetch(
          `http://localhost:3000/api/products/${productId}`
        );

        // Prüfen, ob der Server eine erfolgreiche Antwort zurückgegeben hat
        if (!response.ok) {
          throw new Error("Produkt konnte nicht geladen werden.");
        }

        // JSON-Antwort in ein Product-Objekt umwandeln
        const data: Product = await response.json();

        // Das geladene Produkt im State speichern
        setProduct(data);
      } catch (error) {
        // Fehler in der Konsole ausgeben
        console.error("Fehler beim Abrufen der Daten:", error);

        // Fehlermeldung für die Anzeige auf der Seite speichern
        setError(
          error instanceof Error
            ? error.message
            : "Ein unbekannter Fehler ist aufgetreten."
        );
      } finally {
        // Wird immer ausgeführt, egal ob erfolgreich oder mit Fehler
        setLoading(false);
      }
    }

    // Die Funktion tatsächlich ausführen
    fetchData();

  // Der Effect wird erneut ausgeführt, wenn sich productId ändert
  }, [productId]);

  // Holt die addItem-Funktion aus unserem Zustandsspeicher (Zustand)
  const addItem = useCartStore((state) => state.addItem);

  // Während des Ladens eine Ladeanzeige darstellen
  if (loading) {
    return (
      <main>
        <h1>Produkt wird geladen...</h1>
      </main>
    );
  }

  // Bei einem Fehler oder fehlendem Produkt eine Fehlermeldung anzeigen
  if (error || !product) {
    return (
      <main>
        <h1>{error ?? "Produkt nicht gefunden."}</h1>
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
        onClick={() => {
          if (!selectedColor || !selectedSize) {
            alert("Bitte wählen Sie eine Farbe und Größe aus.");
          } else {
            addItem(product, selectedColor, selectedSize);
          }
        }}
      >
        In den Warenkorb
      </button>
    </main>
  );
}

export default ProductDetail;