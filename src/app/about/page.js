"use client";

import { useState } from "react";
import { FaShieldAlt, FaQuestionCircle, FaUserCheck } from "react-icons/fa";

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Is R4X Sensi safe to use?",
      answer: "Absolutely. R4X Sensi utilizes device-level settings adjustments (such as touch digitizer calibration, TCP buffer optimizations, registry values, and thread priority configurations). It does not hook into game memory, read game code, or modify game files. Because it runs outside of the games, it is 100% safe and anti-ban."
    },
    {
      question: "How do I install the tools?",
      answer: "After completing your purchase, our system sends you the configuration details and instructions directly on WhatsApp. Installation takes less than 3 minutes, and no root or jailbreak is required for most platforms."
    },
    {
      question: "Are updates free?",
      answer: "Yes! All R4X tools include lifetime access to automatic updates. As game engines or operating systems update, we update our optimization templates to maintain compatibility and stability."
    },
    {
      question: "Which games are supported?",
      answer: "We support major competitive eSports titles including Free Fire, PUBG Mobile, Call of Duty: Mobile, Valorant, Apex Legends, Fortnite, and Counter-Strike."
    }
  ];

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 className="glow-text" style={{ fontSize: "3rem", marginBottom: "15px" }}>
          ABOUT R4X SENSI
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          The ultimate hardware and system optimizer for competitive mobile and PC gaming.
        </p>
      </div>

      {/* TECH DETAILS */}
      <div className="glass card-premium" style={{ marginBottom: "40px", padding: "40px 30px" }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", color: "#fff", marginBottom: "20px", fontSize: "1.6rem" }}>
          How it Works
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "20px", fontSize: "1.05rem" }}>
          R4X Sensi operates at the operating system level, bridging the gap between your device hardware and the games you play. 
          Standard operating system drivers are optimized for battery saving, causing micro-stutters and input lag. 
          R4X Sensi recalibrates touch buffers, TCP packets, and process scheduling to prioritize gaming streams.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
          By unlocking full CPU/GPU bandwidth and matching touch digitizer sampling rates to display refresh rates, you experience 
          instantaneous response times and consistent FPS lines.
        </p>
      </div>

      {/* SAFETY & ANTI-BAN */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "50px" }}>
        
        <div className="glass card-premium" style={{ borderLeft: "4px solid #39FF14" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
            <FaShieldAlt style={{ color: "#39FF14", fontSize: "1.8rem" }} />
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem" }}>Anti-Ban Guarantee</h3>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            We do not modify game files, hook APIs, or inject memory scripts. Your gaming account remains 100% secure and compliant.
          </p>
        </div>

        <div className="glass card-premium" style={{ borderLeft: "4px solid #60a5fa" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
            <FaUserCheck style={{ color: "#60a5fa", fontSize: "1.8rem" }} />
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem" }}>eSports Approved</h3>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Developed in partnership with tournament players to assure that latency reduction respects game league regulations.
          </p>
        </div>

      </div>

      {/* FAQ SECTION */}
      <h2 className="glow-text" style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem" }}>
        FREQUENTLY ASKED QUESTIONS
      </h2>

      <div style={{ marginBottom: "80px" }}>
        {faqs.map((faq, i) => (
          <div key={i} className={`faq-item glass ${openFaq === i ? 'open' : ''}`}>
            <div className="faq-question" onClick={() => toggleFaq(i)}>
              <span>{faq.question}</span>
              <span style={{ 
                color: "#39FF14", 
                fontSize: "1.2rem",
                transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              }}>+</span>
            </div>
            <div className="faq-answer">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}