const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      capital: {country.capital}
      area: {country.area}
      languages: <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </>
  )
}

export default Country;