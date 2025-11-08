import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/home.jsx";
import MoodTracker from "./components/MoodTracker.jsx";
import Chatbot from "./components/Chatbot.jsx";
import RelationshipCheckin from "./components/RelationshipCheckin.jsx";
import Insights from "./components/Insights.jsx";
import SafetyNet from "./components/SafetyNet.jsx";
import Resources from "./components/Resources.jsx";
import About from "./components/About.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home route uses the Home component */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracker" element={<MoodTracker />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/relationship" element={<RelationshipCheckin />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/safety" element={<SafetyNet />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        {/* Add more Route elements for other pages as you build them */}
      </Routes>
    </Router>
  );
}

export default App;
