import axios from 'axios'

// ========= EXERCISE 3.9: API SERVICE =========
// Service module for communicating with the backend API

// Base URL - changes depending on environment
const getBaseURL = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:3001/api'
  }
  return '/api'
}

const personService = {
  getAll: () => {
    return axios
      .get(getBaseURL() + '/persons')
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching persons:', error)
        throw error
      })
  },

  create: (newPerson) => {
    return axios
      .post(getBaseURL() + '/persons', newPerson)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating person:', error.response?.data || error)
        throw error.response?.data || error
      })
  },

  delete: (id) => {
    return axios
      .delete(getBaseURL() + `/persons/${id}`)
      .catch(error => {
        console.error('Error deleting person:', error)
        throw error
      })
  },

  // ========= EXERCISE 3.17: UPDATE PERSON ==========
  update: (id, updatedPerson) => {
    return axios
      .put(getBaseURL() + `/persons/${id}`, updatedPerson)
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating person:', error.response?.data || error)
        throw error.response?.data || error
      })
  }
}

export default personService
