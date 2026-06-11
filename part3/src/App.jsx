import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import personService from './services/personService'

// ========= EXERCISE 3.9: PHONEBOOK FRONTEND =========
// Frontend that connects to the backend API

function App() {
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)

  // Fetch all persons on component mount
  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
      .catch(error => {
        setNotification({
          message: 'Error loading persons: ' + error.message,
          type: 'error'
        })
        setTimeout(() => setNotification(null), 5000)
      })
  }, [])

  // Handle adding a new person
  const handleAddPerson = (newPerson) => {
    // ========= EXERCISE 3.17: CHECK IF PERSON ALREADY EXISTS =========
    const existingPerson = persons.find(p => p.name === newPerson.name)
    
    if (existingPerson) {
      // Ask user if they want to update the number
      if (window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )) {
        // Update existing person with PUT request
        personService
          .update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            // Update person in state
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : updatedPerson))
            setNotification({
              message: `${newPerson.name}'s number was updated`,
              type: 'success'
            })
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(error => {
            setNotification({
              message: 'Error updating person: ' + (error.error || error.message),
              type: 'error'
            })
            setTimeout(() => setNotification(null), 5000)
          })
      }
      return
    }

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNotification({
          message: `${newPerson.name} was added to the phonebook`,
          type: 'success'
        })
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(error => {
        setNotification({
          message: 'Error adding person: ' + (error.error || error.message),
          type: 'error'
        })
        setTimeout(() => setNotification(null), 5000)
      })
  }

  // Handle deleting a person
  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification({
            message: `${name} was deleted from the phonebook`,
            type: 'success'
          })
          setTimeout(() => setNotification(null), 5000)
        })
        .catch(error => {
          setNotification({
            message: 'Error deleting person: ' + error.message,
            type: 'error'
          })
          setTimeout(() => setNotification(null), 5000)
        })
    }
  }

  return (
    <div className="container">
      <h1>Phonebook</h1>
      
      <Notification notification={notification} />
      
      <PersonForm onAddPerson={handleAddPerson} />
      
      <PersonList 
        persons={persons}
        onDeletePerson={handleDeletePerson}
      />

      <div className="info">
        Backend API: {import.meta.env.MODE === 'development' 
          ? 'http://localhost:3001' 
          : window.location.origin}
      </div>
    </div>
  )
}

export default App
