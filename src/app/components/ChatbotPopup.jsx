"use client";
import { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // try {
    //   const res = await axios.post(
    //     "https://api.openai.com/v1/chat/completions",
    //     {
    //       model: "gpt-3.5-turbo",
    //       messages: [
    //         {
    //           role: "system",
    //           content: "You are a helpful assistant who gives farming advice.",
    //         },
    //         ...messages.map((msg) => ({
    //           role: msg.sender === "user" ? "user" : "assistant",
    //           content: msg.text,
    //         })),
    //         { role: "user", content: input },
    //       ],
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   const reply = res.data.choices[0].message.content.trim();
    //   const botMessage = { text: reply, sender: "bot" };
    //   setMessages((prev) => [...prev, botMessage]);
    // } catch (err) {
    //   console.error("Error:", err);
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       text: "Sorry, something went wrong. Please try again later.",
    //       sender: "bot",
    //     },
    //   ]);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <button
        style={{ width: 100 }}
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 Chat
      </button>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <span>AI Chatbot Assistant</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          <div className="chatbox">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <span>{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div className="chat-message bot">
                <span>Typing...</span>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
