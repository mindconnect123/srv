import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="main-content">
      <section className="home-hero">
        <h1>Welcome to MindConnect</h1>
        <p>
          Your companion for tracking mood, habits, and wellbeing. MindConnect empowers you to understand yourself better and connect
          with supportive resources, all in a calming and safe environment.
        </p>
        <a href="/login" className="home-btn">Get Started</a>
      </section>

      <section className="home-features">
        <h2>Main Features</h2>
        <ul>
          <li>🌈 Mood & Habit Tracker</li>
          <li>🤖 Empathetic Chatbot for daily reflection</li>
          <li>👥 Relationship Check-ins</li>
          <li>📊 Personalized Insights & Analytics</li>
          <li>🛡️ Social Safety Net & Trusted Contacts</li>
          <li>🧑‍⚕️ Resources for Professional Help</li>
          <li>🔒 Privacy & Consent Built In</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
