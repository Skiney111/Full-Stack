# Full Stack - Exercises Part 0-3

Kompletny projekt kursu Full Stack Open (part3 - MongoDB Integration).

## 📂 Struktura Projektu

```
FullStack/
├── part0/       # HTML formularze
├── part1/       # React podstawy
├── part2/       # React + REST API
├── part3/       # MongoDB + Express
└── vercel.json  # Konfiguracja Vercel
```

## 🚀 Deployment na Vercel

### Opcja 1: Frontend + Backend (Recommended)

1. **Fork/Clone do swój repo:**
   ```bash
   git clone https://github.com/Skiney111/Full-Stack.git
   cd Full-Stack
   ```

2. **Zainstaluj Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Zaloguj się do Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy part3:**
   ```bash
   cd part3
   vercel
   ```

5. **W Vercel Dashboard - dodaj Environment Variables:**
   - `MONGODB_URI`: `mongodb+srv://user:password@cluster.mongodb.net/phonebook`
   - `NODE_ENV`: `production`

### Opcja 2: Frontend na Vercel + Backend na Heroku/Railway

**Frontend (Vercel):**
```bash
cd part3
npm run build
# Deploy dist/ folder
```

**Backend (Heroku):**
```bash
heroku create phonebook-api
git push heroku main
```

## 📋 Part3 - Aplikacja Phonebook

### Wymagania
- Node.js 18+
- MongoDB Atlas account
- npm/yarn

### Instalacja

```bash
cd part3
npm install
```

### Konfiguracja

Utwórz `.env` w `part3/`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phonebook
NODE_ENV=development
PORT=3001
```

### Uruchomienie

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

Frontend: http://localhost:5174
Backend API: http://localhost:3001

## 📚 Dostępne Endpoints

```
GET    /api/persons      - Wszyscy osoby
GET    /api/persons/:id  - Jedna osoba
POST   /api/persons      - Dodaj osobę
PUT    /api/persons/:id  - Zaktualizuj osobę
DELETE /api/persons/:id  - Usuń osobę
GET    /info             - Info o bazie
```

## ✅ Implementowane Ćwiczenia

- **3.12** - CLI tool (mongo.js)
- **3.13** - GET endpoints z MongoDB
- **3.14** - POST endpoint
- **3.15** - DELETE endpoint
- **3.16** - Error Handler middleware
- **3.17** - PUT endpoint
- **3.18** - Info endpoint

## 🔒 Security

- `.env` w `.gitignore` (never commit credentials)
- Hasła przechowywane w Vercel Environment Variables
- Mongoose schema validation

## 🐛 Debugging

**CLI tool do testowania bazy:**
```bash
cd part3
node mongo.js password          # Lista osób
node mongo.js password "Anna" "555-1234"  # Dodaj osobę
```

**API Testing:**
Użyj VS Code REST Client (`test.http`)

---

**Status:** ✅ Full Stack Complete - Ready for Production
