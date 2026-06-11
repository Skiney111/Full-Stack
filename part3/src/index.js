import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import 'dotenv/config'
import Person from '../models/person.js'

const app = express()
const PORT = process.env.PORT || 3001

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ========== EXERCISE 3.12-3.18: MONGODB CONNECTION ==========
const mongoUrl = process.env.MONGODB_URI
if (!mongoUrl) {
  console.error('ERROR: MONGODB_URI environment variable is not set!')
  console.error('Please create a .env file with MONGODB_URI')
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('✓ Connected to MongoDB')
  })
  .catch(error => {
    console.error('✗ Failed to connect to MongoDB:', error.message)
    process.exit(1)
  })

// ========== EXERCISE 3.9: CORS MIDDLEWARE ==========
// Allow requests from any origin (needed for frontend development)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Handle OPTIONS requests for CORS pre-flight
app.options('*', (req, res) => {
  res.sendStatus(204)
})

app.use(express.json())

// ========== EXERCISE 3.7 & 3.8: MORGAN LOGGING ==========
// Custom morgan token for logging POST request body (Exercise 3.8)
morgan.token('request-body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return ''
})

// Morgan middleware with tiny format + custom body logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

// ========== EXERCISE 3.13: GET ALL PERSONS FROM DATABASE ==========
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})

// ========== EXERCISE 3.18: INFO PAGE FROM DATABASE ==========
app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(personCount => {
      const currentTime = new Date().toString()
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Phonebook Info</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 50px; }
            h1 { color: #333; }
            p { font-size: 18px; line-height: 1.8; }
          </style>
        </head>
        <body>
          <h1>Phonebook Info</h1>
          <p>Phonebook has info for <strong>${personCount}</strong> people</p>
          <p>Request received at: <strong>${currentTime}</strong></p>
        </body>
        </html>
      `
      
      res.send(htmlContent)
    })
    .catch(error => next(error))
})

// ========== EXERCISE 3.18: GET SINGLE PERSON FROM DATABASE ==========
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})

// ========== EXERCISE 3.15: DELETE PERSON FROM DATABASE ==========
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// ========== EXERCISE 3.14: CREATE NEW PERSON IN DATABASE ==========
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  // Error handling: Check if name or number is missing
  if (!name || !number) {
    return res.status(400).json({
      error: 'name and number are required'
    })
  }

  const person = new Person({
    name,
    number
  })

  person.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson)
    })
    .catch(error => next(error))
})

// ========== EXERCISE 3.17: UPDATE PERSON IN DATABASE (PUT) ==========
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  // Validation
  if (!name || !number) {
    return res.status(400).json({
      error: 'name and number are required'
    })
  }

  const person = {
    name,
    number
  }

  Person.findByIdAndUpdate(
    req.params.id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})

// ========== ROOT ENDPOINT ==========
app.get('/', (req, res) => {
  res.send('Phonebook Backend API - Use /api/persons for data')
})

// ========== EXERCISE 3.11: SERVE STATIC FILES FROM FRONTEND BUILD ==========
// In production, serve the frontend build from the dist folder
// This allows the backend to serve the full-stack application
const distPath = path.join(__dirname, '../dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  
  // Serve index.html for client-side routing
  app.get('*', (req, res) => {
    // Don't override API routes
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'))
    }
  })
}

// ========== EXERCISE 3.16: ERROR HANDLER MIDDLEWARE ==========
// Must be defined after all other middleware and routes
const errorHandler = (error, req, res, next) => {
  console.error('Error:', error.message)

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors)
      .map(err => err.message)
      .join(', ')
    return res.status(400).json({ error: messages })
  }

  // Mongoose duplicate key error (unique constraint)
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]
    return res.status(400).json({ error: `${field} must be unique` })
  }

  // Mongoose cast error (invalid ID format)
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  // Default error
  res.status(500).json({ error: 'something went wrong' })
}

app.use(errorHandler)

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`
=== Phonebook Backend ===
Environment: ${process.env.NODE_ENV || 'development'}
Build served: ${fs.existsSync(distPath) ? 'Yes (from dist/)' : 'No (frontend served separately)'}

=== Endpoints ===
GET    /api/persons       - Get all persons (3.13)
GET    /api/persons/:id   - Get single person (3.18)
POST   /api/persons       - Add new person (3.14)
PUT    /api/persons/:id   - Update person (3.17)
DELETE /api/persons/:id   - Delete person (3.15)
GET    /info              - Info page (3.18)

GET    /                  - Serve frontend or API info

Database: MongoDB connected ✓
  `)
})
