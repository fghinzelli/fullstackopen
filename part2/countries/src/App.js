import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
import Country from './components/Country';
import Countries from './components/Countries';
import Filter from './components/Filter';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [weather, setWeather] = useState({});

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
      let selectedCountry = fCountries[0]
      setCountry(selectedCountry);
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCountry.capitalInfo.latlng[0]}&lon=${selectedCountry.capitalInfo.latlng[1]}&units=metric&appid=${API_KEY}`)
        .then(response => setWeather(response.data))
    } else {
      setCountry(null);
      setWeather(null);
    }
  }

  let countryBlock = null;
  if (country) {
    countryBlock = <Country country={country} weather={weather} />
  } else if (filter !== '') {
    if (filteredCountries.length > 10) {
      countryBlock = <p>Too mamy matches, specify another filter</p>
    } else {
      countryBlock = <Countries showCountry={country => setCountry(country)} countries={filteredCountries} />
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