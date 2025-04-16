"use client";
import { useState } from "react";
import axios from "axios";
import "./styles.css";
import { stateCityData } from "../utils/common";

export default function RainfallForecast() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity(""); // Reset city when state changes
    setForecastData(null);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setForecastData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const API_KEY = "b2275bbe9f6837aa1f94233731c588fc";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecastData(response.data.list[0]); // Just current forecast
      setCityName(response.data.city.name);
    } catch (error) {
      console.error("Error fetching forecast", error);
      setError(
        "Could not fetch data. Please select a valid city or try again later."
      );
    }
  };

  return (
    <div className="forecast-container">
      <h2>Weather</h2>
      <p>Stay updated with the latest weather conditions in your area.</p>

      <form onSubmit={handleSubmit} className="forecast-form">
        <select value={state} onChange={handleStateChange} required>
          <option value="">Select State</option>
          {Object.keys(stateCityData).map((st, idx) => (
            <option key={idx} value={st}>
              {st}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={handleCityChange}
          disabled={!state}
          required
        >
          <option value="">Select City</option>
          {state &&
            stateCityData[state].map((ct, idx) => (
              <option key={idx} value={ct}>
                {ct}
              </option>
            ))}
        </select>

        <button type="submit" disabled={!city}>
          Get Forecast
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {forecastData && (
        <div className="forecast-results">
          <h3>
            🌦️ Today's Forecast for{" "}
            <span className="highlight">
              {cityName}, {state}
            </span>
          </h3>
          <div className="forecast-card-enhanced">
            <div className="forecast-header">
              <p className="forecast-date">
                {new Date(forecastData.dt_txt).toLocaleString("en-IN", {
                  weekday: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="forecast-desc">
                {forecastData.weather[0].description}
              </p>
            </div>
            <div className="forecast-grid">
              <div className="forecast-item">
                <span>🌡</span>
                <p>{forecastData.main.temp} °C</p>
                <small>Temperature</small>
              </div>
              <div className="forecast-item">
                <span>💧</span>
                <p>{forecastData.main.humidity}%</p>
                <small>Humidity</small>
              </div>
              <div className="forecast-item">
                <span>☁️</span>
                <p>{forecastData.clouds.all}%</p>
                <small>Cloudiness</small>
              </div>
              <div className="forecast-item">
                <span>🌬</span>
                <p>{forecastData.wind.speed} m/s</p>
                <small>Wind Speed</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
