import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
import Country from './components/Country';
import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const findCountries = (event) => {
    let filterValue = event.target.value;
    setFilter(filterValue)
    const fCountries = countries.filter(countryItem => countryItem.name.common.indexOf(filterValue) !== -1)
    setFilteredCountries(fCountries)
    if (fCountries.length === 1) {
      setCountry(fCountries[0]);
    } else {
      setCountry(null);
    }
  }

  let countryBlock = null;
  if (country) {
    countryBlock = <Country country={country} />
  } else if (filter !== '') {
    if (filteredCountries.length > 10) {
      countryBlock = <p>Too mamy matches, specify another filter</p>
    } else {
      countryBlock = <Countries countries={filteredCountries} />
    }
  }

return (
  <div>
    <p>find coutries</p>
    <Filter filter={filter} findCountries={findCountries} />
    {countryBlock}
  </div>
)
}

export default App