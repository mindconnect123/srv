import React, { useState } from 'react';
import './Chatbot.css';

const MindMendChatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi, I'm Mind Mend. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [mood, setMood] = useState(null);

  const addMessage = (from, text) => {
    setMessages((msgs) => [...msgs, { from, text }]);
  };

  const handleUserMessage = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    addMessage('user', userMessage);

    const lower = userMessage.toLowerCase();

    if (lower.includes('sad') || lower.includes('depressed')) {
      addMessage(
        'bot',
        "I'm really sorry you're feeling this way. Remember, it's okay to have tough days. Would you like some coping techniques or to talk about it?"
      );
      addMessage(
        'bot',
        "If it helps, I can suggest journaling exercises or mindfulness tips — just let me know."
      );
    } else if (lower.includes('anxious') || lower.includes('stressed')) {
      addMessage(
        'bot',
        "Feeling anxious can be overwhelming. Would you like a guided breathing exercise or some helpful resources?"
      );
      addMessage(
        'bot',
        "Taking small breaks and grounding yourself can help. I can guide you through it if you'd like."
      );
    } else if (lower.includes('tired') || lower.includes('exhausted')) {
      addMessage(
        'bot',
        "It sounds like you might be feeling worn out. Remember to prioritize rest and hydration."
      );
      addMessage(
        'bot',
        "Would you like some tips on how to improve your sleep or boost your energy gently?"
      );
    } else if (lower.includes('happy') || lower.includes('good')) {
      addMessage('bot', "That's wonderful to hear! What’s been making you feel good lately?");
      addMessage('bot', "It’s great to celebrate those positive moments!");
    } else if (lower.includes('help') || lower.includes('support')) {
      addMessage(
        'bot',
        "I'm here for you. Would you like resources to professional help, or just someone to listen?"
      );
    } else if (lower.includes('lonely')) {
      addMessage(
        'bot',
        "Feeling lonely can be tough. Connecting with friends, journaling, or even small walks can help."
      );
      addMessage('bot', "I'm here to listen whenever you want to share.");
    } else {
      addMessage(
        'bot',
        "Thank you for sharing. Would you like to tell me more, or perhaps try a mood check-in?"
      );
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-header">Mind Mend Chatbot</h2>

      <div className="chat-window" role="log" aria-live="polite" tabIndex="0">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.from === 'bot' ? 'bot' : 'user'}`}
          >
            <span className="chat-bubble">{msg.text}</span>
          </div>
        ))}
      </div>

      {!mood && (
        <div className="mood-container">
          <label htmlFor="moodSlider" className="mood-label">
            How’s your mood today? (1 = low, 5 = high)
          </label>
          <input
            id="moodSlider"
            type="range"
            min="1"
            max="5"
            onChange={(e) => setMood(e.target.value)}
            className="mood-slider"
          />
          {mood && <p className="mood-text">Mood recorded: {mood}</p>}
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUserMessage()}
          className="chat-input"
          aria-label="User message input"
        />
        <button onClick={handleUserMessage} className="send-button" aria-label="Send message">
          Send
        </button>
      </div>

      <div className="resources">
        <p>
          Need urgent help? Visit{' '}
          <a href="https://www.who.int/campaigns/world-mental-health-day" target="_blank" rel="noopener noreferrer">
            WHO Mental Health Resources
          </a>{' '}
          or{' '}
          <a href="https://www.befrienders.org/helplines" target="_blank" rel="noopener noreferrer">
            find a helpline
          </a>
          .
        </p>
        <p>Your wellbeing matters; all data stays only in your browser and is not shared.</p>
      </div>
    </div>
  );
};

export default MindMendChatbot;
