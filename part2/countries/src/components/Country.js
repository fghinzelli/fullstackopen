const Country = ({ country, weather }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      languages: <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />

      {/* <h2>Weather in {country.name.common}</h2>
      temperature {weather.main.temp} Celsius
      <img src={weater.weather.icon} alt={weater.weather.main}></img>
      wind {weather.wind.speed} m/s */}
    </>
  )
}

export default Country;