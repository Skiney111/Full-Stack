import { useState } from 'react'

// ========= EXERCISE 3.9: FORM COMPONENT =========
// Component for adding new persons to the phonebook

function PersonForm({ onAddPerson }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name.trim() === '' || number.trim() === '') {
      alert('Name and number cannot be empty')
      return
    }

    onAddPerson({
      name: name.trim(),
      number: number.trim()
    })

    // Reset form
    setName('')
    setNumber('')
  }

  return (
    <div className="form-group">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="number">Number</label>
          <input
            id="number"
            type="text"
            placeholder="+1 (555) 123-4567"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  )
}

export default PersonForm
