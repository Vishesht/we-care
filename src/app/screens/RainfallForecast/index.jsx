"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function RainfallForecast() {
  const [forecastData, setForecastData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const [rainfall, setRainfall] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [pesticide, setPesticide] = useState("");
  const [area, setArea] = useState("");
  const [yieldResult, setYieldResult] = useState(null);

  const [dropdowns, setDropdowns] = useState(null);
  const [state, setState] = useState("");
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/dropdown-options")
      .then((res) => {
        console.log(res.data); // Check the response here
        setDropdowns(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch dropdown options", err);
        setError("Error fetching dropdown options. Please try again.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setYieldResult(null);
      const data = {
        State: state,
        Season: season,
        Crop: crop,
        Crop_Year: year,
        Area: parseFloat(area),
        Annual_Rainfall: parseFloat(rainfall),
        Fertilizer: parseFloat(fertilizer),
        Pesticide: parseFloat(pesticide),
      };
      console.log("first-data", data);
      const yieldRes = await axios.post("http://127.0.0.1:5000/predict_yield");

      setYieldResult(yieldRes.data.predicted_yield.toFixed(2));
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Could not fetch data. Please check inputs or try again later.");
    }
  };

  return (
    <div className="forecast-container">
      <h2>🌾 Crop Yield Predictor</h2>
      <p>Get AI-driven crop yield prediction based on historical data.</p>

      <form onSubmit={handleSubmit} className="forecast-form">
        {dropdowns && (
          <>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {dropdowns.State.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              required
            >
              <option value="">Select Season</option>
              {dropdowns.Season.map((item, i) => (
                <option key={i} value={item.trim()}>
                  {item.trim()}
                </option>
              ))}
            </select>

            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              required
            >
              <option value="">Select Crop</option>
              {dropdowns.Crop.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {dropdowns &&
              dropdowns.Crop_Year &&
              dropdowns.Crop_Year.length > 0 && (
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">Select Year</option>
                  {dropdowns.Crop_Year.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}
          </>
        )}

        <input
          type="number"
          placeholder="Annual Rainfall (mm)"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Fertilizer Used (kg)"
          value={fertilizer}
          onChange={(e) => setFertilizer(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Pesticide Used (kg)"
          value={pesticide}
          onChange={(e) => setPesticide(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Area (hectares)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />

        <button type="submit">Predict Yield</button>
      </form>

      {error && <p className="error">{error}</p>}

      {yieldResult && (
        <div className="yield-result">
          <h3>📈 Predicted Yield</h3>
          <p>
            Estimated yield for <strong>{crop}</strong> is{" "}
            <strong>{yieldResult} tonnes</strong> per {area} ha
          </p>
        </div>
      )}
    </div>
  );
}
