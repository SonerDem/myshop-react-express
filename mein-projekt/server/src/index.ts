import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();
const PORT = 3000;
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,});

const prisma = new PrismaClient({ adapter });

app.use(cors());

app.get("/api/products", async (_req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Fehler beim Laden der Produkte:", error);
    res.status(500).json({ error: "Produkte konnten nicht geladen werden." });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});