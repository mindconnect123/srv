import React, { useState, useEffect } from "react";
import "./MoodTracker.css";

function MoodTracker() {
  // Load from localStorage or default to empty array
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("moodHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  // Save history to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) return;

    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood,
      note,
    };

    setHistory([newEntry, ...history]);
    setMood("");
    setNote("");
  };

  return (
    <div className="main-content">
      <h2>How are you feeling today?</h2>
      <form className="mood-form" onSubmit={handleSubmit}>
        <label>
          Mood:
          <select value={mood} onChange={e => setMood(e.target.value)} required>
            <option value="">Select mood</option>
            <option value="😊 Happy">😊 Happy</option>
            <option value="😔 Sad">😔 Sad</option>
            <option value="😡 Angry">😡 Angry</option>
            <option value="😰 Anxious">😰 Anxious</option>
            <option value="😴 Tired">😴 Tired</option>
            <option value="😃 Excited">😃 Excited</option>
          </select>
        </label>
        <label>
          Note (optional):
          <input
            type="text"
            value={note}
            placeholder="Add a note"
            onChange={e => setNote(e.target.value)}
          />
        </label>
        <button type="submit">Add Entry</button>
      </form>
      <h3>Logged Moods</h3>
      <ul className="mood-history">
        {history.length === 0 && <li>No entries yet.</li>}
        {history.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.date}</strong> - {entry.mood}
            {entry.note && <>: <em>{entry.note}</em></>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodTracker;
