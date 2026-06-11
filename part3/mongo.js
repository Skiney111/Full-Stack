// ========== EXERCISE 3.12: COMMAND-LINE DATABASE TOOL ==========
// Usage:
//   List all persons: node mongo.js <password>
//   Add new person:   node mongo.js <password> <name> <number>

import mongoose from 'mongoose'
import Person from './models/person.js'

// Get command-line arguments
// process.argv[0] = node path
// process.argv[1] = mongo.js path
// process.argv[2] = password
// process.argv[3] = name (optional)
// process.argv[4] = number (optional)
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// MongoDB Atlas connection string
// IMPORTANT: The password should be passed as argument, NOT hardcoded!
const url = `mongodb+srv://com231562_db_user:${password}@fullstackopen.k6ggak6.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

// ========== CONNECT TO MONGODB ==========
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
    
    if (name && number) {
      // ========== ADD NEW PERSON ==========
      const person = new Person({
        name,
        number
      })

      return person.save()
        .then(() => {
          console.log(`added ${name} number ${number} to phonebook`)
          mongoose.connection.close()
        })
        .catch(error => {
          if (error.code === 11000) {
            console.log(`Error: person with name '${name}' already exists`)
          } else if (error.errors?.number) {
            console.log(`Error: ${error.errors.number.message}`)
          } else {
            console.log(`Error: ${error.message}`)
          }
          mongoose.connection.close()
        })
    } else if (name || number) {
      // Invalid usage: only one argument provided
      console.log('Error: if providing a name, you must also provide a number')
      mongoose.connection.close()
      process.exit(1)
    } else {
      // ========== LIST ALL PERSONS ==========
      return Person.find({})
        .then(persons => {
          console.log('phonebook:')
          persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })
          mongoose.connection.close()
        })
        .catch(error => {
          console.log(`Error fetching persons: ${error.message}`)
          mongoose.connection.close()
        })
    }
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
    process.exit(1)
  })
