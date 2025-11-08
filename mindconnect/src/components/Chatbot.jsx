import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatbotMessages");
    return saved ? JSON.parse(saved) : [{ from: "bot", text: "Hi! How are you feeling today? You can share anything on your mind." }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (from, text) => {
    setMessages((msgs) => [...msgs, { from, text }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage("user", input);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a compassionate AI mental health assistant." },
            ...messages.map(msg => ({
              role: msg.from === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: input }
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          },
        }
      );

      const botReply = response.data.choices[0].message.content.trim();
      addMessage("bot", botReply);
    } catch (error) {
      addMessage("bot", "Sorry, I'm having trouble connecting right now.");
      console.error(error);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window" aria-live="polite" aria-label="Chat conversation">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder={loading ? "Waiting for response..." : "Type your message here..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="Chat message input"
        disabled={loading}
      />
      <button onClick={handleSend} aria-label="Send message" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default Chatbot;
