// Serwis do komunikacji z API OpenWeatherMap
// Odpowiada za pobieranie danych pogodowych dla miast

import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY  // Klucz API ze zmiennych środowiskowych

// Sprawdź czy API key jest skonfigurowany
const hasApiKey = () => {
  return !!API_KEY
}

// Pobierz dane pogodowe dla miasta
const getWeather = (capital) => {
  if (!API_KEY) {
    return Promise.reject(new Error('Weather API key not configured'))
  }

  return axios
    .get(`${BASE_URL}?q=${capital}&units=metric&appid=${API_KEY}`)
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export default { getWeather, hasApiKey}