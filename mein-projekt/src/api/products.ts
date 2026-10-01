import type { Product } from "../types/products";

export const products: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    description: "Ein schlichtes und bequemes T-Shirt für den Alltag.",
    price: 29.99,
    imageUrl: "/products/tshirt.jpg",
    category: "Clothing",
  },
  {
    id: 2,
    name: "Premium Hoodie",
    description: "Ein hochwertiger Hoodie mit modernem Schnitt.",
    price: 59.99,
    imageUrl: "/products/hoodie.jpg",
    category: "Clothing",
  },
  {
    id: 3,
    name: "Classic Sneakers",
    description: "Minimalistische Sneaker für jeden Tag.",
    price: 89.99,
    imageUrl: "/products/sneakers.jpg",
    category: "Shoes",
  },
];