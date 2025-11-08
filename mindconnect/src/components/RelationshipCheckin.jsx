import React, { useState, useEffect } from "react";
import "./RelationshipCheckin.css";

function RelationshipCheckin() {
  // Load saved check-ins from localStorage or start with empty array
  const [checkins, setCheckins] = useState(() => {
    const saved = localStorage.getItem("relationshipCheckins");
    return saved ? JSON.parse(saved) : [];
  });

  const [type, setType] = useState(""); // social, family, partner
  const [note, setNote] = useState("");

  // Save check-ins to localStorage whenever they update
  useEffect(() => {
    localStorage.setItem("relationshipCheckins", JSON.stringify(checkins));
  }, [checkins]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) return;

    const newCheckin = {
      date: new Date().toLocaleDateString(),
      type,
      note,
    };

    setCheckins([newCheckin, ...checkins]);
    setType("");
    setNote("");
  };

  return (
    <div className="main-content">
      <h2>Relationship Check-in</h2>
      <form className="checkin-form" onSubmit={handleSubmit}>
        <label>
          Relationship Type:
          <select value={type} onChange={e => setType(e.target.value)} required>
            <option value="">Select type</option>
            <option value="Social">Social</option>
            <option value="Family">Family</option>
            <option value="Partner">Partner</option>
          </select>
        </label>
        <label>
          Notes (optional):
          <textarea
            value={note}
            placeholder="How are your interactions?"
            onChange={e => setNote(e.target.value)}
          />
        </label>
        <button type="submit">Add Check-in</button>
      </form>

      <h3>Past Check-ins</h3>
      <ul className="checkin-history">
        {checkins.length === 0 && <li>No check-ins yet.</li>}
        {checkins.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.date}</strong> ({entry.type}) 
            {entry.note && <>: <em>{entry.note}</em></>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RelationshipCheckin;
