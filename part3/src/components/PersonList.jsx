// ========= EXERCISE 3.9: PERSON LIST COMPONENT =========
// Component for displaying all persons in the phonebook

function PersonList({ persons, onDeletePerson }) {
  if (persons.length === 0) {
    return (
      <div className="persons-list">
        <h2>Contacts ({persons.length})</h2>
        <div className="no-persons">
          No contacts in the phonebook yet
        </div>
      </div>
    )
  }

  return (
    <div className="persons-list">
      <h2>Contacts ({persons.length})</h2>
      {persons.map((person) => (
        <div key={person.id} className="person-item">
          <div className="person-info">
            <div className="person-name">{person.name}</div>
            <div className="person-number">{person.number}</div>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDeletePerson(person.id, person.name)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default PersonList
