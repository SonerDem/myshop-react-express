import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

// Sagt TypeScript, welche Daten wir in der Session speichern.
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

const app = express();
const PORT = 3000;
const sessionSecret = process.env.SESSION_SECRET;
const databaseUrl = process.env.DATABASE_URL;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET fehlt in der .env-Datei.");
}
if (!databaseUrl) {
  throw new Error("DATABASE_URL fehlt in der .env-Datei.");
}
const adapter = new PrismaPg({
  connectionString: databaseUrl,});

const prisma = new PrismaClient({ adapter });
const PgSessionStore = connectPgSimple(session);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Sessions werden in PostgreSQL gespeichert und überstehen Serverneustarts.
app.use(session({
  store: new PgSessionStore({
    conString: databaseUrl,
    createTableIfMissing: true,
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

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
    // Ab hier gilt der Benutzer als eingeloggt: Die Session merkt sich seine ID.
    req.session.userId = user.id;

    res.status(200).json({ message: "Login erfolgreich.",
       user: {id: user.id, 
       name: user.name, 
       email: user.email },});

  } catch (error) {
    console.error("Fehler beim Login:", error);
    res.status(500).json({ error: "Login fehlgeschlagen." });
  }
});


app.post("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Fehler beim Logout:", error);
      return res.status(500).json({ error: "Abmelden fehlgeschlagen." });
    }

    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.sendStatus(204);
  });
});

// Gibt den Benutzer zurück, der zur aktuellen Session gehört.
app.get("/api/me", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ error: "Nicht eingeloggt." });
  }

  try {
    const user = await prisma.benutzer.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Nicht eingeloggt." });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Fehler beim Laden des angemeldeten Benutzers:", error);
    return res.status(500).json({ error: "Benutzer konnte nicht geladen werden." });
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
