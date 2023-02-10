import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { API_KEY } from "./apikey";

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [hum, setHum] = useState("");
  const [country, setCountry] = useState("");
  const [speed, setSpeed] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const date = new Date().toString().slice(0, 25);

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = res.data;
      setTemp(data && data.main.temp);
      setDesc(data && data.weather[0].description);
      setHum(data && data.main.humidity);
      setCountry(data && data.sys.country);
      setSpeed(data && data.wind.speed);
      setName(data && data.name);
      setIcon(data && data.weather[0].icon);

      setIsDataFetched(true);

      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Invalid Location");
    }
  };

  const defaultData = async () => {
    if (isDataFetched === false || city === "") {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=${ API_KEY}&units=metric`
        );
        const data = res.data;
        setTemp(data && data.main.temp);
        setDesc(data && data.weather[0].description);
        setHum(data && data.main.humidity);
        setCountry(data && data.sys.country);
        setSpeed(data && data.wind.speed);
        setName(data && data.name);
        setIcon(data && data.weather[0].icon);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    defaultData();
  });

  return (
    <div className="app">
      <div className="app__container">
        <form onSubmit={fetchData} className="app__search">
          <input
            className="app__input"
            type="text"
            placeholder="Search City"
            onChange={(e) => setCity(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="app__searchIcon"
            onClick={fetchData}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </form>
        <h1 className="app__title">Weather in {name}</h1>
        <h1 className="app__temp">{temp}°C</h1>
        <div className="app__desc">
          <img
            className="app__image"
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt="desc"
          />
          <h3>{desc}</h3>
        </div>
        <div className="app__humidity">
          <h4 className="app__hum">Humidity: {hum}%</h4>
          <h4 className="app__count">Country: {country}</h4>
        </div>
        <div className="app__windspeed">
          <h4 className="app__wind">Wind Speed: {speed}m/s</h4>
          <h4 className="app__date">{date}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;