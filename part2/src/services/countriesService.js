// Serwis do komunikacji z API REST Countries
// Odpowiada za wyszukiwanie krajów po nazwie

import axios from 'axios'

const BASE_URL = 'https://restcountries.com/v3.1'

// Wyszukaj kraje po pełnej nazwie
const searchCountries = (searchTerm) => {
  return axios
    .get(`${BASE_URL}/name/${searchTerm}?fullText=true`)
    .then(response => response.data)
    .catch(error => {
      if (error.response && error.response.status === 404) {
        return []
      }
      throw error
    })
}

export default { searchCountries }
