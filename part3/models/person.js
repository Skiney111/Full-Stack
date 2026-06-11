import mongoose from 'mongoose'

// ========== EXERCISE 3.12-3.18: MONGODB PERSON MODEL ==========
// Define the schema for a person in the phonebook

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true  // No duplicate names
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(value) {
        // Must have format: XX-XXXXXX or XXX-XXXXX (number with dash)
        return /^\d{2,3}-\d{4,}$/.test(value) || /^\d{7,}$/.test(value)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

// Format returned JSON (remove __v field from response)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

export default Person
