"use client";
import { useState } from "react";
import Header from "./components/header";
import CropRecommendation from "./screens/CropRecommendation";
import RainfallForecast from "./screens/RainfallForecast";
import CropSales from "./screens/CropSales";
import ChatbotPopup from "./components/ChatbotPopup";
import FertilizerRecommendation from "./screens/FertilizerRecommendation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("crop");

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Header setActiveTab={setActiveTab} />
      <div style={{ height: 60 }} />
      {activeTab === "crop" && <CropRecommendation />}
      {activeTab === "fertilizer" && <FertilizerRecommendation />}
      {activeTab === "forecast" && <RainfallForecast />}
      {activeTab === "sales" && <CropSales />}
      <div style={{ height: 60 }} />
      {/* Floating Chatbot */}
      <ChatbotPopup />
    </div>
  );
}
