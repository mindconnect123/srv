import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const questions = [
  {
    question: "What brings you to MindConnect?",
    type: "textarea",
    key: "reason",
  },
  {
    question: "Have you tried therapy before?",
    type: "radio",
    options: ["Yes", "No"],
    key: "triedTherapy",
  },
  {
    question: "What are you hoping to improve?",
    type: "checkbox",
    options: [
      "Anxiety",
      "Depression",
      "Relationships",
      "Stress Management",
      "Self-esteem",
      "Other",
    ],
    key: "goals",
  },
  {
    question: "Preferred therapist gender?",
    type: "radio",
    options: ["Woman", "Man", "No preference"],
    key: "preferredGender",
  },
  {
    question: "Preferred language?",
    type: "radio",
    options: ["English", "Hindi", "Other"],
    key: "preferredLanguage",
  },
  {
    question: "Where do you currently live?",
    type: "textarea",
    key: "location",
  },
];

function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  // Login states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Registration states
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useLocalStorage("registerAnswers", {});

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login submitted: " + username);
  };

  const handleInput = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleFinish = () => {
    alert("Registration saved: " + JSON.stringify(answers));
    localStorage.removeItem("registerAnswers");
    setAnswers({});
    setStep(0);
    setIsRegistering(false);
    navigate("/home"); // Redirect to home page after registration
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, questions.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="register-flow">
      {!isRegistering ? (
        <form onSubmit={handleLogin}>
          <h2>Login to MindConnect</h2>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="btn-primary">
            Login
          </button>
          <div className="register-link">
            Don’t have an account?{" "}
            <span className="link-text" onClick={() => setIsRegistering(true)}>
              Register soon!
            </span>
          </div>
        </form>
      ) : (
        <div>
          <h2>Register Soon</h2>
          {step < questions.length ? (
            <div className="transition">
              <label className="question-label">{questions[step].question}</label>
              <div className="options-container">
                {questions[step].type === "radio" &&
                  questions[step].options.map((opt) => (
                    <div key={opt} className="option-item">
                      <input
                        type="radio"
                        name={questions[step].key}
                        checked={answers[questions[step].key] === opt}
                        onChange={() => handleInput(questions[step].key, opt)}
                      />
                      <span> {opt}</span>
                    </div>
                  ))}
                {questions[step].type === "checkbox" &&
                  questions[step].options.map((opt) => (
                    <div key={opt} className="option-item">
                      <input
                        type="checkbox"
                        checked={answers[questions[step].key]?.includes(opt)}
                        onChange={() =>
                          handleInput(
                            questions[step].key,
                            answers[questions[step].key]
                              ? answers[questions[step].key].includes(opt)
                                ? answers[questions[step].key].filter((o) => o !== opt)
                                : [...answers[questions[step].key], opt]
                              : [opt]
                          )
                        }
                      />
                      <span> {opt}</span>
                    </div>
                  ))}
                {questions[step].type === "textarea" && (
                  <textarea
                    placeholder="Type your answer..."
                    value={answers[questions[step].key] || ""}
                    onChange={(e) => handleInput(questions[step].key, e.target.value)}
                    className="input-textarea"
                  />
                )}
              </div>
              <div className="btn-group">
                {step > 0 && (
                  <button onClick={prevStep} className="btn-secondary" type="button">
                    Previous
                  </button>
                )}
                {step < questions.length - 1 ? (
                  <button onClick={nextStep} className="btn-primary" type="button">
                    Next
                  </button>
                ) : (
                  <button onClick={handleFinish} className="btn-primary" type="button">
                    Finish
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="thank-you-text">Thanks for registering!</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
