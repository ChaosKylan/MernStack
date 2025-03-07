# To-Do App mit dem MERN-Stack

Dieses Projekt ist eine **To-Do-Anwendung**, entwickelt mit dem **MERN-Stack** (MongoDB, Express.js, React.js, Node.js).  
Die App ermöglicht es Benutzern, Aufgaben zu erstellen, zu bearbeiten, zu löschen und deren Status zu verfolgen.

## Funktionen

- ✅ Aufgaben erstellen (Titel & Beschreibung)
- ✏️ Aufgaben bearbeiten
- ❌ Aufgaben löschen
- 🔄 Aufgabenstatus auf "Erledigt" oder "Ausstehend" setzen

## Technologien

| Technologie    | Beschreibung             |
|---------------|--------------------------|
| MongoDB       | NoSQL-Datenbank        |
| Express.js    | Backend-Framework       |
| React.js      | Frontend-Bibliothek     |
| Node.js       | JavaScript-Laufzeitumgebung |

## Installation & Ausführung

### 1. Repository klonen

```bash
git clone https://github.com/ChaosKylan/MernStack.git
cd MernStack
```

### 2. Backend einrichten
```bash
cd server
npm install

Erstelle eine .env-Datei und füge folgende Zeile hinzu:
MONGODB_URI=Ihre_MongoDB_Verbindungszeichenfolge

Server starten:
npm start
👉 Der Server läuft auf http://localhost:5000
```
### 3. Frontend einrichten

```bash
cd ../client
npm install
npm start
👉 Die App läuft unter http://localhost:3000
