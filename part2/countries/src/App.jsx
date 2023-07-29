import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [allData, setAllData] = useState(null);
  const [usrInput, setUsrInput] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setAllData(res.data);
      });
  }, []);

  const handleUserInput = (e) => {
    setUsrInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsrInput(usrInput);
  };

  const countryToShow = usrInput
    ? allData.filter((datum) =>
        datum.name.common
          .toLowerCase()
          .includes(
            usrInput.toLowerCase() ||
              datum.common.official
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
          {countryToShow.map((datum) => (
            <li key={datum.cca2}>{datum.name.common}</li>
          ))}
        </ul>
      );
    }

    return <h4>Too many matches, specify another filter.</h4>;
  };

  const ShowDetails = ({ country }) => {
    // console.log(props);
    return (
      <>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>capital {country.area}</p>
        <h4>languages:</h4>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
        <img
          src={country.flags.png}
          alt="country flag"
          style={{ height: "150px", width: "auto" }}
        />
      </>
    );
  };

  if (!allData) {
    return null;
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
