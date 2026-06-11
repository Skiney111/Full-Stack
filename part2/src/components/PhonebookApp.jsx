import { useState, useEffect } from 'react'
import personService from '../services/personService'
import Notification from './Notification'

// Filtr
// Służy do filtrowania listy kontaktów po nazwie
const Filter = function(props) {
  return (
    <div>
      filter shown with: <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

// Formularz osoby 
// Służy do dodawania nowej osoby do książki telefonicznej
const PersonForm = function(props) {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

// Lista osób 
const Persons = function(props) {
  const personsList = []
  // przez każdą osobę i wyświetlam ją na liście
  for (let i = 0; i < props.persons.length; i++) {
    const person = props.persons[i]
    personsList.push(
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => props.handleDelete(person.id, person.name)}>delete</button>
      </p>
    )
  }
  return <div>{personsList}</div>
}

// PhonebookApp 
const PhonebookApp = function() {
  //  lista wszystkich kontaktów pobrana 
  const [persons, setPersons] = useState([])
  
  const [notification, setNotification] = useState(null)
  
  // typ wiadomości: 'success' (zielona) lub 'error' (czerwona)
  const [notificationType, setNotificationType] = useState('success')
  
  // nazwa nowej osoby
  const [newName, setNewName] = useState('')
  
  // numer nowej osoby
  const [newNumber, setNewNumber] = useState('')
  
  // tekst do filtrowania listy
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    // Pobierz wszystkie kontakty z serwera JSON na porcie 3001
    personService
      .getAll() //czeka na odpowiedź serwera, .then(costam) co zrobić gdy dane się pobiorą
      .then(initialPersons => {
        setPersons(initialPersons) // Uaktualnij state ze pobranymi danymi
      })
      .catch(error => {
      })
  }, []) 

  // Wyświetl powiadomienie
  const showNotification = (message, type = 'success') => {
    setNotification(message) // Pokaż powiadomienie, Ustaw kolor/typ, Ukryj powiadomienie po 3 sekundach (3000 ms)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  function addPerson(event) {
    event.preventDefault() // Nie odświeżaj strony
    
    // Szukaj osoby o tej samej nazwie
    const existingPerson = persons.find(p => p.name === newName)
    
    // JEŚLI OSOBA JUŻ ISTNIEJE zaktualizuj numer
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            // PĘTLA: Kopiuję wszystkie osoby, zmienioną osobę biorę ze serwera
            const updatedPersons = []
            for (let i = 0; i < persons.length; i++) {
              if (persons[i].id !== existingPerson.id) {
                updatedPersons.push(persons[i])
              } else {
                updatedPersons.push(returnedPerson)
              }
            }
            setPersons(updatedPersons)
            setNewName('') // Wyczyść formę
            setNewNumber('')
            showNotification(`Updated ${newName}'s number`)
          })
          .catch(error => {
            // Jeśli osoba została usunięta z serwera = usuń z listy
            if (error.response && error.response.status === 404) {
              showNotification(`Information of ${newName} has already been removed from the server`, 'error')
              const filteredPersons = []
              // PĘTLA: Tworzę nową listę bez usuniętej osoby
              for (let i = 0; i < persons.length; i++) {
                if (persons[i].id !== existingPerson.id) {
                  filteredPersons.push(persons[i])
                }
              }
              setPersons(filteredPersons)
            } else {
              showNotification(`Error updating ${newName}`, 'error')
            }
          })
      }
      return 
    }

    // JEŚLI OSOBA NIE ISTNIEJE - dodaj nową
    const personObject = {
      name: newName,
      number: newNumber
    }
    // Wyślij POST request do serwera http://localhost:3001/persons
    personService
      .create(personObject)
      .then(returnedPerson => {
        // Dodaj nową osobę do listy
        setPersons(persons.concat(returnedPerson))
        setNewName('') // Wyczyść formę
        setNewNumber('')
        showNotification(`Added ${newName}`)
      })
      .catch(error => {
        showNotification(`Error adding ${newName}`, 'error')
      })
  }

  // Obsługa zmian w inputach
  function handleNameChange(event) {
    setNewName(event.target.value)
  }
  
  function handleNumberChange(event) {
    setNewNumber(event.target.value)
  }
  
  function handleFilterChange(event) {
    setFilter(event.target.value)
  }

  // Usuń osobę
  function handleDelete(id, name) {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          // pętla tworzy nową listę bez usuniętej osoby
          const remainingPersons = []
          for (let i = 0; i < persons.length; i++) {
            if (persons[i].id !== id) {
              remainingPersons.push(persons[i])
            }
          }
          setPersons(remainingPersons)
          showNotification(`Deleted ${name}`)
        })
        .catch(error => {
          showNotification(`Error deleting ${name}`, 'error')
        })
    }
  }

  // FILTROWANIE: Pokażemy tylko osoby zawierające szukany tekst
  let personsToShow
  if (filter) {
    personsToShow = []
    // PĘTLA: Szukam osób których imię zawiera tekst z filtra (bez względu na wielkość liter)
    for (let i = 0; i < persons.length; i++) { 
      if (persons[i].name.toLowerCase().includes(filter.toLowerCase())) {
        personsToShow.push(persons[i])
      }
    }
  } else {
    personsToShow = persons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default PhonebookApp
//useEffect poniera liste z serweru do person, uzytko9wnik pisze XYZ , potem klik add sprawdza czy os istnieje 
//jesli tak zmienia numer jesli nie to dodaje 
//klik dlate usuwa request z serwera i
//filts personsToShow - pokazuje tylko osoby które zawierają tekst z filtra, bez względu na wielkość liter