import { useState } from 'react'

const Filter = function(props) {
  return (
    <div>
      filter shown with: <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

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

const Persons = function(props) {
  const personsList = []
  for (let i = 0; i < props.persons.length; i++) {
    const person = props.persons[i]
    personsList.push(
      <p key={person.name}>{person.name} {person.number}</p>
    )
  }
  return <div>{personsList}</div>
}

const PhonebookApp = function() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  function addPerson(event) {
    event.preventDefault()
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(newName + ' is already added to phonebook')
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  function handleNameChange(event) {
    setNewName(event.target.value)
  }
  function handleNumberChange(event) {
    setNewNumber(event.target.value)
  }
  function handleFilterChange(event) {
    setFilter(event.target.value)
  }

  let personsToShow
  if (filter) {
    personsToShow = []
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
      <Persons persons={personsToShow} />
    </div>
  )
}

export default PhonebookApp
