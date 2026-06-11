// Główny komponent aplikacji do wyszukiwania krajów
// Wyświetla wyszukiwarkę, listę krajów oraz szczegóły wybranego kraju z pogodą

import { useState, useEffect } from 'react'
import countriesService from '../services/countriesService'
import weatherService from '../services/weatherService'
import CountriesList from './CountriesList'
import CountryDetails from './CountryDetails'

const CountriesApp = () => {
  // State do zarządzania wyszukiwaniem krajów
  const [searchTerm, setSearchTerm] = useState('')      // Term do wyszukania
  const [countries, setCountries] = useState([])        // Lista znalezionych krajów
  const [selectedCountry, setSelectedCountry] = useState(null)  // Wybrany kraj
  const [weather, setWeather] = useState(null)          // Pogoda kapitały
  const [loading, setLoading] = useState(false)         // Loading przy wyszukiwaniu
  const [weatherLoading, setWeatherLoading] = useState(false)

  // Effect do pobierania krajów po zmianie term wyszukania
  useEffect(() => {
    if (searchTerm.length === 0) {
      setCountries([])
      setSelectedCountry(null)
      setWeather(null)
      return
    }

    setLoading(true)
    // Pobierz kraje z API
    countriesService
      .searchCountries(searchTerm)
      .then(data => {
        setCountries(data)
        if (data.length === 1) {
          setSelectedCountry(data[0])
          fetchWeather(data[0].capital)
        } else {
          setSelectedCountry(null)
          setWeather(null)
        }
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }, [searchTerm])

  // Pobierz pogodę dla kapitały wybranego kraju
  const fetchWeather = (capital) => {
    if (!capital || !weatherService.hasApiKey()) return

    setWeatherLoading(true)
    // Pobierz dane pogodowe z API
    weatherService
      .getWeather(capital)
      .then(data => {
        setWeather(data)
        setWeatherLoading(false)
      })
      .catch(error => {
        setWeather(null)
        setWeatherLoading(false)
      })
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
    fetchWeather(country.capital)
  }

  // Warunki do wyświetlania listy krajów (2-10 krajów znalezionych)
  const showList = !loading && countries.length > 1 && countries.length <= 10 && !selectedCountry
  // Warunki do wyświetlania szczegółów wybranego kraju
  const showDetails = !loading && selectedCountry

  return (
    <div style={{ padding: '20px' }}>
      <h1>Countries</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {loading && <div>Loading...</div>}

      {!loading && countries.length > 10 && !selectedCountry && (
        <div style={{
          padding: '10px',
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
          color: '#856404'
        }}>
          Too many matches, specify another filter
        </div>
      )}
      
      {showList && (
        <CountriesList countries={countries} onShowCountry={handleShowCountry} />
      )}

      {showDetails && (
        <CountryDetails country={selectedCountry} weather={weather} weatherLoading={weatherLoading} />
      )}
    </div>
  )
}

export default CountriesApp