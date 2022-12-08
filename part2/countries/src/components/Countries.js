import CountryButton from './CountryButton';

const Countries = ({ countries, showCountry }) => {
  return (
    <ul>
      {countries.map(country => <li key={country.name.common}>{country.name.common} <CountryButton showCountry={() => showCountry(country)}/></li>)}
    </ul>
  )
  
}

export default Countries;