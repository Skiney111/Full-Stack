# Ćwiczenie 2.11: Phonebook Step 6 - Wyjaśnienie

## 📁 Jak pliki się łączą

```
┌─────────────────────────────────────────────────────────────────┐
│  PRZEGLĄDARKA                                                   │
│  http://localhost:3000/  (Vite dev server - aplikacja React)   │
└──────────────────────────────────┬──────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌─────────────────────┐      ┌──────────────────────┐
        │ PhonebookApp.jsx    │      │ Notification.jsx     │
        │ (Główny komponent)  │      │ (Wyświetla powiadom) │
        └──────────┬──────────┘      └──────────────────────┘
                   │
                   │ importuje
                   ▼
        ┌─────────────────────────────────────────┐
        │  personService.js                       │
        │  (Komunikacja z serem przez axios)      │
        │                                         │
        │  - getAll()    → GET /persons           │
        │  - create()    → POST /persons          │
        │  - update()    → PUT /persons/:id       │
        │  - remove()    → DELETE /persons/:id    │
        └──────────┬──────────────────────────────┘
                   │
         HTTP requests na port 3001
                   │
                   ▼
        ┌─────────────────────────────────────────┐
        │  JSON Server (http://localhost:3001)    │
        │  npm run server                         │
        └──────────┬──────────────────────────────┘
                   │
                   ▼
        ┌─────────────────────────────────────────┐
        │  db.json                                │
        │  (Baza danych)                          │
        │  - przechowuje listę osób               │
        │  - każda osoba ma: id, name, number     │
        └─────────────────────────────────────────┘
```

---

## 📊 Przepływ danych

### 1. **Uruchomienie aplikacji**
```
1. npm run server           → Uruchomia JSON Server na porcie 3001
2. npm run dev             → Uruchomia Vite (React) na porcie 5173
3. PhonebookApp.jsx się załadowuje
4. useEffect hook uruchamia się (bo [] - raz przy załadowaniu)
5. personService.getAll() pobiera dane z serwera
6. setPersons() - zapisuje dane w state
7. Komponent się renderuje z danymi
```

### 2. **Dodawanie osoby**
```
User pisze imię + numer
    ↓
onClick przycisk "add"
    ↓
addPerson() funkcja
    ↓
Sprawdź czy osoba już istnieje
    ├─ TAK: zapytaj czy zmienić numer → personService.update()
    └─ NIE: dodaj nową → personService.create()
    ↓
HTTP request do serwera (POST lub PUT)
    ↓
db.json się aktualizuje na serwerze
    ↓
setPersons() aktualizuje UI
    ↓
Powiadomienie: "Added [imię]" lub "Updated [imię]"
```

### 3. **Usuwanie osoby**
```
User klika "delete"
    ↓
Potwierdzenie: "Delete [imię]?"
    ↓
personService.remove(id) 
    ↓
HTTP DELETE request do serwera
    ↓
db.json się aktualizuje
    ↓
setPersons() usuwa osobę z ekranu
    ↓
Powiadomienie: "Deleted [imię]"
```

---

## 🔍 Wyjaśnienie ważnych pojęć

### **State (Stan)**
```javascript
const [persons, setPersons] = useState([])
```
- `persons` - ZMIENNA (ile osób w pamięci)
- `setPersons()` - FUNKCJA (zmienia wartość persons i odświeża ekran)
- `useState([])` - na początku: pusta tablica

### **Event Handler (Obsługa zdarzeń)**
```javascript
function handleNameChange(event) {
  setNewName(event.target.value)
}
```
- `event` - zdarzenie (np. kliknięcie, pisanie)
- `event.target.value` - co użytkownik wpisał w input

### **Promise (Obietnica)**
```javascript
personService.getAll()
  .then(data => { ... })      // Jak się uda
  .catch(error => { ... })    // Jak się nie uda
```
- `.then()` - co robić gdy dane się pobiorą
- `.catch()` - co robić gdy jest błąd

### **useEffect Hook (Efekt uboczny)**
```javascript
useEffect(() => {
  // Ten kod uruchamia się
}, []) // Raz, bo array jest pusty
```
- `[]` (empty array) = uruchamia się raz przy załadowaniu
- Brak `[]` = uruchamia się za każdym razem
- `[persons]` = uruchamia się jak persons się zmieni

### **Spread Operator (...)**
```javascript
const updatedPerson = { ...existingPerson, number: newNumber }
```
- Kopiuje wszystkie właściwości obiektu
- Rozwinięcie: `{ id: "1", name: "Arto", number: "040-123456" }`
- Zmienia `number` na nowy

---

## 🔗 Właściwości i metody (czego się używa)

### **State zmienne (rzeczy które się zmieniają)**
| Nazwa | Typ | Co to | Zmienia się gdy |
|-------|-----|-------|---|
| `persons` | array | Lista wszystkich osób | pobierzemy dane / dodamy / usuniemy |
| `newName` | string | Imię wpisane w input | użytkownik pisze |
| `newNumber` | string | Numer wpisany w input | użytkownik pisze |
| `filter` | string | Tekst filtru | użytkownik pisze |
| `notification` | string \| null | Wiadomość do wyświetlenia | dodamy/usuniemy/błąd |
| `notificationType` | string | Typ: 'success' lub 'error' | ustawiamy w showNotification |

### **personService metody (komunikacja z serwerem)**
```javascript
personService.getAll()        // GET http://localhost:3001/persons
personService.create(obj)     // POST http://localhost:3001/persons
personService.update(id, obj) // PUT http://localhost:3001/persons/{id}
personService.remove(id)      // DELETE http://localhost:3001/persons/{id}
```

### **Reguły asynchroniczne (_przychodzą opóźnione_)**
```javascript
axios.get(url).then(...).catch(...)
```
- `.get()` - pobierz dane (czeka na serwer)
- `.post()` - wyślij nowe dane (czeka na serwer)
- `.put()` - uaktualnij dane (czeka na serwer)
- `.delete()` - usuń dane (czeka na serwer)

---

## 💾 Struktura db.json

```json
{
  "persons": [
    {
      "id": "1",                  // Unikalny identyfikator
      "name": "Arto Hellas",      // Imię
      "number": "040-123456"      // Numer telefonu
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    }
  ]
}
```

- `id` - używany do identyfikacji/aktualizacji/usuwania
- `name` - czego szukamy w filtrze
- `number` - wyświetlamy na liście

---

## 🚀 Komendy do uruchomienia

```bash
# Terminal 1: Uruchom JSON Server (baza danych)
npm run server
# Powinno pokazać: "Listening on 3001"
# Sprawdź: http://localhost:3001/persons

# Terminal 2: Uruchom Vite (aplikacja React)
npm run dev
# Powinno pokazać: "Local: http://localhost:5173/"
# Otwórz w przeglądarce
```

---

## ✅ Checklist ćwiczenia 2.11

- ✅ `db.json` ma prawidłową strukturę
- ✅ `npm run server` uruchamia json-server na porcie 3001
- ✅ `personService.getAll()` pobiera dane z serwera
- ✅ `useEffect(..., [])` uruchamia się raz przy załadowaniu
- ✅ `setPersons()` przechowuje pobrane dane
- ✅ Aplikacja wyświetla osoby z serwera
- ✅ Można dodawać nowe osoby (POST)
- ✅ Można aktualizować numery (PUT)
- ✅ Można usuwać osoby (DELETE)
- ✅ Filtrowanie działa z pobranymi danymi
- ✅ Powiadomienia pokazują się dla każdej akcji

