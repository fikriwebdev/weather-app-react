import { useState } from "react";
import "./App.css";

const api = {
  key: "76b4841b936c16d0a17d98272f36bba2",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const getTemp = (e) => {
    e.preventDefault();
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((data) => setWeather(data));
    setCity("");
  };

  const getDate = (date) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = months[date.getMonth()];
    const day = days[date.getDay()];
    const year = date.getFullYear();
    return `${day}, ${month} ${year}`;
  };

  const { name, main, sys } = weather;

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.weather[0].main === "Clouds"
            ? "App sun"
            : weather.weather[0].main === "Rain"
            ? "App rain"
            : weather.weather[0].main === "Fog"
            ? "App fog"
            : "App chill"
          : "App"
      }>
      <div className="search-box">
        <form onSubmit={(e) => getTemp(e)}>
          <input
            type="text"
            placeholder="city.."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
      </div>

      {typeof weather.main != "undefined" ? (
        <div>
          <div className="date">
            <div>
              <h3>{getDate(new Date())}</h3>
            </div>
          </div>

          <div className="city">
            <div>
              <h3>
                {name}, {sys.country}
              </h3>
            </div>
          </div>

          <div className="temperature">
            <div>
              <h3>{Math.round(main.temp)}&#8451;</h3>
            </div>
          </div>

          <div className="desc">
            <div>
              <h3>{weather.weather[0].main}</h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
