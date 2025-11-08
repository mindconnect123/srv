import React from "react";
import "./Resources.css";

function Resources() {
  const resources = [
    {
      category: "Mental Health Help Lines",
      links: [
        { name: "National Suicide Prevention Lifeline", url: "tel:988" },
        { name: "Crisis Text Line", url: "sms:741741" },
        { name: "Samaritans", url: "https://www.samaritans.org" }
      ]
    },
    {
      category: "Therapy Directories",
      links: [
        { name: "BetterHelp", url: "https://www.betterhelp.com" },
        { name: "Talkspace", url: "https://www.talkspace.com" },
        { name: "Psychology Today", url: "https://www.psychologytoday.com/us/therapists" }
      ]
    },
    {
      category: "Self-Help & Education",
      links: [
        { name: "Mind.org.uk", url: "https://www.mind.org.uk" },
        { name: "NIMH (National Institute of Mental Health)", url: "https://www.nimh.nih.gov" },
        { name: "Mental Health America", url: "https://mhanational.org" }
      ]
    }
  ];

  return (
    <div className="main-content">
      <h2>Helpful Resources & Guidance</h2>
      {resources.map((section, idx) => (
        <section key={idx} className="resource-section">
          <h3>{section.category}</h3>
          <ul>
            {section.links.map((link, i) => (
              <li key={i}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Resources;
