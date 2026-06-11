// Komponent wyświetlający listę krajów
// Każdy kraj ma przycisk "Show" do wyświetlenia szczegółów
const CountriesList = ({ countries, onShowCountry }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {/* Renderuj każdy kraj jako element listy */}
      {countries.map((country) => (
        <div
          key={country.name.common}
          style={{
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{country.name.common}</span>
          <button
            onClick={() => onShowCountry(country)}
            style={{
              padding: '5px 15px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Show
          </button>
        </div>
      ))}
    </div>
  )
}

export default CountriesList
