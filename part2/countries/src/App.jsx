import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [allData, setAllData] = useState(null);
  const [usrInput, setUsrInput] = useState("");
  const [nationToShow, setNationToShow] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({
    temp: "",
    tempIcon: "",
    wind: "",
  });

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setAllData(res.data);
      });
  }, []);

  useEffect(() => {
    let countryLat = nationToShow
      ? nationToShow.capitalInfo.latlng[0]
      : "27.72";
    let countrylon = nationToShow
      ? nationToShow.capitalInfo.latlng[1]
      : "85.32";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countryLat}&lon=${countrylon}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }`
      )
      .then((res) => {
        setWeatherInfo({
          temp: res.data.main.temp,
          wind: res.data.wind.speed,
          tempIcon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        });
      });
  }, [nationToShow]);

  const handleUserInput = (e) => {
    setUsrInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsrInput(usrInput);
  };

  const countryToShow = usrInput
    ? allData.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(
            usrInput.toLowerCase() ||
              country.common.official
                .toLowerCase()
                .includes(usrInput.toLowerCase())
          )
      )
    : [];

  const ShowCountry = () => {
    if (countryToShow.length === 1) {
      return <ShowDetails country={countryToShow[0]} />;
    }
    if (countryToShow.length < 10) {
      return (
        <ul>
          {countryToShow.map((country) => (
            <li key={country.cca2}>
              {country.name.common}{" "}
              <button onClick={() => funToShow(country)}>Toggle Show</button>
              {nationToShow === country ? (
                <ShowDetails country={country} />
              ) : null}
            </li>
          ))}
        </ul>
      );
    }

    return <h4>Too many matches, specify another filter.</h4>;
  };

  const ShowDetails = ({ country }) => {
    return (
      <>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>capital area: {country.area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt="country flag"
          style={{ height: "150px", width: "auto" }}
        />
        <h4>
          Weather in <u>{country.capital}</u>
        </h4>
        <p>Temp: {weatherInfo.temp}</p>
        <img src={weatherInfo.tempIcon} alt="Weather Icon from api" />
        <p>Wind: {weatherInfo.wind}</p>
      </>
    );
  };

  const funToShow = (country) => {
    nationToShow.cca2 === country.cca2
      ? setNationToShow("")
      : setNationToShow(country);
  };

  if (!allData) {
    return "Waiting for server to respond!!";
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={usrInput} onChange={handleUserInput} />
        <button type="submit">Submit</button>
      </form>
      <ShowCountry />
    </>
  );
};

export default App;
