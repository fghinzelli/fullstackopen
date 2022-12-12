const CountryWeather = ({localName, weather }) => {
  return (
    <>
      <h2>Weather in {localName}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather.main}
      ></img>
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default CountryWeather;
