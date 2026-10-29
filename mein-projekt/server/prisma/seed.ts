import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

const products = [
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

try {
  const result = await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
  console.log(`${result.count} Produkt(e) eingefügt.`);
} finally {
  await prisma.$disconnect();
}
