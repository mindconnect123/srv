import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./MoodTracker.css";

function MoodTracker() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("moodHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }, [history]);

  const sendEmailNotification = (mood, note, contacts) => {
    contacts.forEach(contact => {
      if (contact.email) {
        const templateParams = {
          to_name: contact.name,
          mood,
          note: note || 'No additional note provided',
          to_email: contact.email,
        };
        emailjs.send('service_v2isyhw', 'template_y6rkg8q', templateParams, 'JBW4Gba5asCYS6nk-')
          .then(response => {
            console.log('Email sent to', contact.email, response.status, response.text);
          })
          .catch(err => {
            console.error('Failed to send email to', contact.email, err);
          });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) return;

    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood,
      note,
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    setMood("");
    setNote("");

    // Check last 3 moods for sad/anxious count
    const lastThreeMoods = updatedHistory.slice(0, 3).map(entry => entry.mood);
    const sadOrAnxiousCount = lastThreeMoods.reduce((count, m) => {
      return count + ((m === "😔 Sad" || m === "😰 Anxious") ? 1 : 0);
    }, 0);

    if (sadOrAnxiousCount === 3) {
      const contacts = JSON.parse(localStorage.getItem('trustedContacts') || '[]');
      sendEmailNotification(mood, note, contacts);
    }
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
