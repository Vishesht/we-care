"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import React from "react";

export default function FertilizerRecommendation() {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soil_type: "",
    crop_type: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [soilTypes, setSoilTypes] = useState([]);
  const [cropTypes, setCropTypes] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [soilRes, cropRes] = await Promise.all([
          axios.get("http://127.0.0.1:5000/get_soil_names"),
          axios.get("http://127.0.0.1:5000/get_crop_names"),
        ]);
        setSoilTypes(soilRes.data.soil_names || []);
        setCropTypes(cropRes.data.crop_names || []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData, formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    if (
      [
        "temperature",
        "humidity",
        "moisture",
        "nitrogen",
        "phosphorus",
        "potassium",
      ].includes(name)
    ) {
      if (!value || isNaN(value)) {
        errors[name] = "This field must be a number";
      } else {
        const num = parseFloat(value);
        if (num < 0) {
          errors[name] = "Value cannot be negative";
        } else {
          delete errors[name];
        }
      }
    }

    if (name === "soil_type" && !value) {
      errors[name] = "Please select a soil type";
    }
    if (name === "crop_type" && !value) {
      errors[name] = "Please select a crop type";
    }

    setFormErrors(errors);
  };

  const validateForm = () => {
    const allFilled = Object.values(formData).every((val) => val !== "");
    const noErrors = Object.keys(formErrors).length === 0;
    setIsFormValid(allFilled && noErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        moisture: parseFloat(formData.moisture),
        soil_type: formData.soil_type,
        crop_type: formData.crop_type,
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
      };

      const res = await axios.post(
        "http://127.0.0.1:5000/predict_fertilizer",
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setRecommendation(res.data.fertilizer);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  return (
    <div className="fertilizer-container">
      <h1 style={{ color: "#000" }}>🌾 Fertilizer Recommendation System</h1>
      <p className="info-text">
        Enter your farm details below and get the best fertilizer suggestion for
        your crops!
      </p>

      <div className="form-card">
        <h2 style={{ color: "#000", marginBottom: 12 }}>
          🌿 Enter Your Farm Details
        </h2>

        <form onSubmit={handleSubmit}>
          {[
            { name: "temperature", label: "Temperature (°C)" },
            { name: "humidity", label: "Humidity (%)" },
            { name: "moisture", label: "Moisture (%)" },
            { name: "nitrogen", label: "Nitrogen (mg/kg)" },
            { name: "phosphorus", label: "Phosphorus (mg/kg)" },
            { name: "potassium", label: "Potassium (mg/kg)" },
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
              {formErrors[name] && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  {formErrors[name]}
                </p>
              )}
            </div>
          ))}

          <div className="input-group">
            <label style={{ color: "#000" }}>Soil Type</label>
            <select
              name="soil_type"
              value={formData.soil_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Soil Type</option>
              {soilTypes.map((soil) => (
                <option key={soil} value={soil}>
                  {soil}
                </option>
              ))}
            </select>
            {formErrors.soil_type && (
              <span className="error-text">{formErrors.soil_type}</span>
            )}
          </div>

          <div className="input-group">
            <label style={{ color: "#000" }}>Crop Type</label>
            <select
              name="crop_type"
              value={formData.crop_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Crop Type</option>
              {cropTypes.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
            {formErrors.crop_type && (
              <span className="error-text">{formErrors.crop_type}</span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={!isFormValid}>
            Get Recommendation
          </button>
        </form>

        {recommendation && (
          <div className="result">
            <h3>✅ Recommended Fertilizer: {recommendation}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
