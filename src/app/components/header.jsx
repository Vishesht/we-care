import React, { useState } from "react";
import "./styles.css";

export default function Header({ setActiveTab }) {
  const [selectedTab, setSelectedTab] = useState("crop");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setActiveTab(tab);
    setMenuOpen(false); // close menu on mobile after selection
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">🌱 WeCare</h1>
        <h1 className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </h1>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li className={selectedTab === "crop" ? "active" : ""}>
              <a onClick={() => handleTabClick("crop")}>Crop Recommendations</a>
            </li>
            <li className={selectedTab === "fertilizer" ? "active" : ""}>
              <a onClick={() => handleTabClick("fertilizer")}>
                Fertilizer Recommendations
              </a>
            </li>
            {/* <li className={selectedTab === "forecast" ? "active" : ""}>
              <a onClick={() => handleTabClick("forecast")}>
                Rainfall & Yield Forecasts
              </a>
            </li> */}
            <li className={selectedTab === "sales" ? "active" : ""}>
              <a onClick={() => handleTabClick("sales")}>Crop Sales</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
