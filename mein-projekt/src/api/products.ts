import type { Product } from "../types/products";

export const products: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    description: "Ein schlichtes und bequemes T-Shirt für den Alltag.",
    price: 29.99,
    imageUrl: "/products/tshirt.jpg",
    category: "Clothing",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Green"],
  },
  {
    id: 2,
    name: "Premium Hoodie",
    description: "Ein hochwertiger Hoodie mit modernem Schnitt.",
    price: 59.99,
    imageUrl: "/products/hoodie.jpg",
    category: "Clothing",
    size: ["S", "M", "L", "XL"],
    color: ["Black", "Gray", "White"],
  },
  {
    id: 3,
    name: "Classic Sneakers",
    description: "Minimalistische Sneaker für jeden Tag.",
    price: 89.99,
    imageUrl: "/products/sneakers.jpg",
    category: "Shoes",
    size: ["38", "39", "40", "41", "42", "43"],
    color: ["White", "Black", "Gray"],
  },
];