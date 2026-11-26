# MYSHOP – E-Shop mit React, Express und PostgreSQL

🚧 **Status:** in aktiver Entwicklung – neue Features kommen nach und nach dazu.

Ein kleiner Online-Shop für Kleidung und Sneaker, den ich als Portfolio-Projekt gebaut habe.
Das Frontend ist eine React-App, das Backend eine Express-API, die ihre Daten mit Prisma
in einer PostgreSQL-Datenbank speichert.

> **Hinweis:** Eine Kasse mit echter Zahlung ist bewusst nicht enthalten. Der Button
> „Zur Kasse“ ist deaktiviert. Es werden keine Bestellungen oder Zahlungsdaten verarbeitet.

**Live-Demo:** _folgt_ <!-- TODO: Link einfügen -->

## Screenshots

<!-- TODO: Screenshots in docs/screenshots/ ablegen und hier einbinden, z. B.:
![Startseite](docs/screenshots/startseite.png)
![Warenkorb](docs/screenshots/warenkorb.png)
-->
_Screenshots folgen._

## Features

- **Produktübersicht und Detailseite:** Produkte werden aus der Datenbank geladen,
  auf der Detailseite wählt man Farbe und Größe.
- **Warenkorb:** Gleiche Produkte in verschiedenen Farben/Größen werden getrennt geführt.
  Menge erhöhen/verringern, Artikel entfernen, Warenkorb leeren, Gesamtsumme in Euro.
  Der Warenkorb bleibt nach dem Neuladen der Seite erhalten (localStorage).
- **Registrierung:** Passwörter werden mit bcrypt gehasht gespeichert,
  doppelte E-Mail-Adressen werden abgelehnt.
- **Login und Logout mit Sessions:** Die Session wird in PostgreSQL gespeichert
  und über ein HttpOnly-Cookie erkannt. Nach dem Neuladen bleibt man angemeldet.
- **Eingabeprüfung im Server** mit passenden HTTP-Statuscodes (400, 401, 404, 409).
- **Barrierefreiheit:** Skip-Link zum Inhalt, beschriftete Formulare und Buttons,
  Lade- und Fehlermeldungen für Screenreader.

## Tech-Stack

| Bereich  | Technologien |
|----------|--------------|
| Frontend | React 19, TypeScript, Vite, React Router 7, Zustand |
| Backend  | Node.js, Express 5, TypeScript, express-session, connect-pg-simple, bcrypt |
| Datenbank | PostgreSQL, Prisma 7 (Schema, Migrationen, Seed) |
| Qualität | ESLint |

## Projektstruktur

```
mein-projekt/
├── src/                  # React-Frontend (Seiten, Komponenten, Zustand-Stores)
├── public/               # Statische Dateien (Produktbilder)
└── server/
    ├── src/index.ts      # Express-API
    ├── prisma/           # Schema, Migrationen und Seed-Daten
    └── .env.example      # Vorlage für die Umgebungsvariablen
```

## API-Endpunkte

| Methode | Pfad | Beschreibung |
|---------|------|--------------|
| GET  | `/api/products`     | Alle Produkte |
| GET  | `/api/products/:id` | Ein Produkt |
| POST | `/api/register`     | Konto erstellen |
| POST | `/api/login`        | Anmelden (startet eine Session) |
| POST | `/api/logout`       | Abmelden (beendet die Session) |
| GET  | `/api/me`           | Aktuell angemeldeter Benutzer |

## Lokal starten

### Voraussetzungen

- [Node.js](https://nodejs.org/) (entwickelt mit Version 24)
- Eine laufende PostgreSQL-Datenbank

### 1. Repository klonen

```bash
git clone <REPO-URL>
cd <REPO-ORDNER>/mein-projekt
```

### 2. Backend einrichten

```bash
cd server
npm install
```

Umgebungsvariablen anlegen: `.env.example` nach `.env` kopieren und die eigenen Werte eintragen.

```bash
cp .env.example .env
```

| Variable | Bedeutung |
|----------|-----------|
| `DATABASE_URL` | Verbindung zur PostgreSQL-Datenbank |
| `SHADOW_DATABASE_URL` | Optional, nur für `prisma migrate dev` |
| `SESSION_SECRET` | Zufälliger, geheimer Schlüssel für die Session-Cookies |

Datenbank vorbereiten:

```bash
npx prisma migrate deploy   # Tabellen anlegen
npx prisma generate         # Prisma Client erzeugen
npm run db:seed             # Beispielprodukte einfügen
```

Server starten (läuft auf http://localhost:3000):

```bash
npx tsx src/index.ts
```

### 3. Frontend starten

In einem zweiten Terminal:

```bash
cd mein-projekt
npm install
npm run dev
```

Die App läuft dann auf http://localhost:5173.

## Bekannte Grenzen und nächste Schritte

- Keine Kasse und keine Bestellungen (bewusst, siehe Hinweis oben)
- Die API-Adresse `http://localhost:3000` ist im Frontend fest eingetragen
- Noch keine automatisierten Tests
