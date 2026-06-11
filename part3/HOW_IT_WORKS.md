# PHONEBOOK - KRÓTKO

## Co Działa ✅

### 1. MongoDB Atlas
- **Cluster**: Fullstackopen
- **User**: com231562_db_user  
- **Password**: Phonebook123
- **Status**: ✓ Connected

### 2. CLI Tool (mongo.js)
```bash
node mongo.js Phonebook123              # List all
node mongo.js Phonebook123 "Name" "050-1234567"  # Add
```

### 3. Backend API (http://localhost:3001)
```
GET  /api/persons       → Pobiera wszystkich z DB
GET  /api/persons/:id   → Pobiera jedną osobę
POST /api/persons       → Dodaje nową (do DB)
PUT  /api/persons/:id   → Aktualizuje
DELETE /api/persons/:id → Usuwa z DB
GET  /info              → Count z bazy
```

### 4. Frontend React (http://localhost:5174)
- ✅ Ładuje osoby z API
- ✅ Dodawanie nowych osób
- ✅ Usuwanie osób
- ✅ Aktualizacja przy duplikacji (pytanie czy zmienić)
- ✅ Powiadomienia (success/error)

## Jak Uruchomić

```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend  
npm run dev:frontend

# Terminal 3: CLI (testowanie)
node mongo.js Phonebook123
```

## Baza Danych

**Struktura**:
```
collections: people
  └── { _id, name, number }
```

**Osób w bazie**: 4 (Alice, Bob, Charlie, Diana)

## Files

- `src/index.js` - Backend z MongoDB + error middleware
- `src/App.jsx` - Frontend z logika PUT
- `models/person.js` - Mongoose schema
- `mongo.js` - CLI tool
- `.env` - MONGODB_URI config
- `package.json` - Dependencies: mongoose, dotenv

## Status: ✅ GOTOWE DO UŻYTKU

Wszystkie Exercises 3.12-3.18 działają!
