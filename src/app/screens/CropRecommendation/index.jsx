"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [errors, setErrors] = useState({});
  const [recommendation, setRecommendation] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData, errors]);

  const validateForm = () => {
    const allFilled = Object.values(formData).every((val) => val !== "");
    const noErrors = Object.keys(errors).length === 0;
    setIsFormValid(allFilled && noErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const number = parseFloat(value);

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation logic
    if (value === "" || isNaN(number)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "This field is required and must be a number.",
      }));
    } else if (number < 0) {
      setErrors((prev) => ({ ...prev, [name]: "Value cannot be negative." }));
    } else {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const payload = {
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      };

      const res = await axios.post(
        "http://127.0.0.1:5000/predict_crop",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRecommendation(res.data.crop);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  return (
    <div className="fertilizer-container">
      <h1 style={{ color: "#000" }}>🌾 Smart Crop Recommendation System</h1>
      <p className="info-text">
        Enter your field data to get AI-based crop suggestions best suited for
        your soil and environment.
      </p>
      <div className="form-card">
        <h2 style={{ color: "#000", marginBottom: 12 }}>
          🌿 Enter Your Farm Details
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            { name: "N", label: "Nitrogen (N) level in soil" },
            { name: "P", label: "Phosphorus (P) level in soil" },
            { name: "K", label: "Potassium (K) level in soil" },
            { name: "temperature", label: "Temperature (°C)" },
            { name: "humidity", label: "Humidity (%)" },
            { name: "ph", label: "Soil pH level" },
            { name: "rainfall", label: "Rainfall (mm)" },
          ].map(({ name, label }) => (
            <div key={name} style={{ textAlign: "left" }}>
              <label
                style={{ fontWeight: "bold", fontSize: "14px", color: "#444" }}
              >
                {label}
              </label>
              <input
                name={name}
                type="number"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={formData[name]}
                onChange={handleChange}
                required
              />
              {errors[name] && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  {errors[name]}
                </p>
              )}
            </div>
          ))}

          <button type="submit" className="submit-btn" disabled={!isFormValid}>
            Get Recommendation
          </button>
        </form>
        {recommendation && (
          <div className="result">
            <h3>✅ Recommended Crop: {recommendation}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
