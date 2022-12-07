import { useState } from 'react'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('')

  return (
    <div>
      <p>find coutries</p>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} type="text" />
      <ul>
      {countries.length > 10 ? 
        countries.map(country => <li key={country.ccn3}>{country.name.common}</li>)
        : <p>Too mamy matches, specify another filter</p>}
      </ul>
    </div>
  )
}

export default App