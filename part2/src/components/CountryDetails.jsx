
// Komponent wyświetlający szczegóły wybranego kraju
// Pokazuje informacje o kraju oraz pogodę w jego kapitale
const CountryDetails = ({ country, weather, weatherLoading }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h2>{country.name.common}</h2>

      {/* Sekcja z informacjami o kraju */}
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
        <p>
          <strong>Languages:</strong>{' '}
          {country.languages
            ? Object.values(country.languages).join(', ')
            : 'N/A'}
        </p>
      </div>

      {/* Wyświetl flagę kraju */}
      {country.flags && (
        <div style={{ marginBottom: '20px' }}>
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            style={{ width: '300px', borderRadius: '4px' }}
          />
        </div>
      )}

      {/* Sekcja pogody */}
      {weatherLoading && (
        <div style={{
          padding: '15px',
          background: '#e3f2fd',
          border: '1px solid #2196f3',
          borderRadius: '4px',
          marginTop: '20px',
          color: '#1976d2'
        }}>
          Loading weather...
        </div>
      )}

      {weather && (
        <div style={{
          padding: '15px',
          background: '#f0f8ff',
          border: '1px solid #87ceeb',
          borderRadius: '4px',
          marginTop: '20px'
        }}>
          <h3>Weather in {country.capital?.[0]}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Feels like:</strong> {weather.main.feels_like}°C</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
          <p><strong>Wind speed:</strong> {weather.wind.speed} m/s</p>
          <p style={{ textTransform: 'capitalize' }}>
            <strong>Conditions:</strong> {weather.weather[0].description}
          </p>
          {weather.weather[0].icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CountryDetails
