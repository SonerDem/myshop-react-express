import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,});

const prisma = new PrismaClient({ adapter });

app.use(cors());

app.use(express.json());

app.post("/api/login", async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const user = await prisma.benutzer.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Ungültige E-Mail oder Passwort." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Ungültige E-Mail oder Passwort." });
    }
    res.status(200).json({ message: "Login erfolgreich.",
       user: {id: user.id, 
       name: user.name, 
       email: user.email },});

  } catch (error) {
    console.error("Fehler beim Login:", error);
    res.status(500).json({ error: "Login fehlgeschlagen." });
  }
});


app.post("/api/register", async (req, res) => {
  try{
    const daten = req.body;       
    const {name, password, email} = daten;
    if (!name || !email || !password) {
      console.log("Einträge fehlen")
     return res.status(400).json({ error: "Einträge fehlen" });
    }    
    const hashedpw = await bcrypt.hash(password, 10);
    const gleicheEmail = await prisma.benutzer.findUnique({where:{email},});
    if (gleicheEmail){
      return res.status(409).json({ error: "Email existiert bereits" });
    }    
    await prisma.benutzer.create({
      data: {
      name,
      email,
      password: hashedpw
  },
 });
   return res.status(201).json({
    message: "Benutzer erfolgreich registriert.",
});
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    res.status(500).json({ error: "Registrierung fehlgeschlagen." });
  }  
});

app.get("/api/products", async (_req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Fehler beim Laden der Produkte:", error);
    res.status(500).json({ error: "Produkte konnten nicht geladen werden." });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Ungültige Produkt-ID." });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: "Produkt nicht gefunden." });
    }

    res.json(product);
  } catch (error) {
    console.error("Fehler beim Laden des Produkts:", error);
    res.status(500).json({ error: "Produkt konnte nicht geladen werden." });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});