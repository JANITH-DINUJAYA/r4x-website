import Link from "next/link";
import { FaRocket, FaCrosshairs, FaBolt, FaShieldAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container">
      
      {/* HERO SECTION */}
      <div className="hero">
        <img 
          src="/logo.jpg" 
          alt="R4X Sensi Logo" 
          className="hero-logo" 
        />
        <h1 className="title">
          R4X <span>SENSI</span>
        </h1>
        <p className="subtitle">
          Next-generation gaming performance optimization suites for Android, iOS & PC. 
          Stabilize frame rates, recalibrate touch digitizers, and enjoy zero delay.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/products" className="btn btn-primary">
            Explore Store
          </Link>
          <Link href="/about" className="btn btn-secondary">
            Safety FAQ
          </Link>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="stats-container glass">
        <div className="stat-item">
          <div className="stat-value">50K+</div>
          <div className="stat-label">Downloads</div>
        </div>
        <div className="stat-item" style={{ borderLeft: "1px solid rgba(255,255,255,0.05)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="stat-value">99.7%</div>
          <div className="stat-label">FPS Stability</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">4.9★</div>
          <div className="stat-label">User Rating</div>
        </div>
      </div>

      {/* FEATURES GRID */}
      <h2 className="glow-text" style={{ textAlign: "center", marginTop: "60px", fontSize: "2.2rem" }}>
        SYSTEM CAPABILITIES
      </h2>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "30px" }}>
        Engineered for professional eSports competitors and gaming enthusiasts.
      </p>

      <div className="grid">
        
        <div className="glass card-premium">
          <div className="card-icon"><FaRocket /></div>
          <h3 className="card-title">FPS Boost Engine</h3>
          <p className="card-description">
            Cleans background resource allocation, prevents thermal throttling, and stabilizes frame rendering for buttery smooth gaming.
          </p>
        </div>

        <div className="glass card-premium">
          <div className="card-icon"><FaCrosshairs /></div>
          <h3 className="card-title">Touch Calibrator</h3>
          <p className="card-description">
            Calibrates Android & iOS touch response delays, helping you track targets and hit headshots with laser precision.
          </p>
        </div>

        <div className="glass card-premium">
          <div className="card-icon"><FaBolt /></div>
          <h3 className="card-title">Latency Optimizer</h3>
          <p className="card-description">
            Optimizes system DNS resolver settings and TCP/IP stack buffers to ensure lowest possible ping in online matchmaking.
          </p>
        </div>

        <div className="glass card-premium">
          <div className="card-icon"><FaShieldAlt /></div>
          <h3 className="card-title">Anti-Ban Engine</h3>
          <p className="card-description">
            Operates purely on device hardware optimization. No modifications are made to game directories or memory injection, ensuring 100% safety.
          </p>
        </div>

      </div>

      {/* TESTIMONIALS */}
      <h2 className="glow-text" style={{ textAlign: "center", marginTop: "80px", fontSize: "2.2rem" }}>
        GAMER FEEDBACK
      </h2>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "40px" }}>
        See what competitive players say about R4X Sensi.
      </p>

      <div className="grid" style={{ marginBottom: "60px" }}>
        
        <div className="glass card-premium" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <p style={{ fontStyle: "italic", marginBottom: "20px", color: "var(--text-muted)" }}>
            "My touch delay went from feeling heavy to absolutely instant. Headshots on Free Fire are so much easier now. Definitely worth it!"
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#39FF14", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#000" }}>
              K
            </div>
            <div>
              <h4 style={{ color: "#fff" }}>Kaizen FF</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--neon)" }}>Verified Buyer</span>
            </div>
          </div>
        </div>

        <div className="glass card-premium" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <p style={{ fontStyle: "italic", marginBottom: "20px", color: "var(--text-muted)" }}>
            "The registry tweaks for PC completely cleared up my micro-stutters in Warzone. Ping dropped by 12ms too. Amazing service."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#000" }}>
              N
            </div>
            <div>
              <h4 style={{ color: "#fff" }}>NexT_Gamer</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--neon)" }}>Verified Buyer</span>
            </div>
          </div>
        </div>

        <div className="glass card-premium" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <p style={{ fontStyle: "italic", marginBottom: "20px", color: "var(--text-muted)" }}>
            "I was skeptical about iOS optimization, but the touch response is noticeably snappier. Anti-ban works perfectly, been using for 3 months."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f472b6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#000" }}>
              Z
            </div>
            <div>
              <h4 style={{ color: "#fff" }}>Zara_Vibe</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--neon)" }}>Verified Buyer</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{
        marginTop: "100px",
        padding: "30px 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        textAlign: "center",
        color: "var(--text-muted)",
        fontSize: "0.9rem"
      }}>
        <p>© 2026 R4X SENSI. All Rights Reserved. Not affiliated with any game publisher.</p>
        <p style={{ marginTop: "5px", fontSize: "0.8rem" }}>Built with ultimate eSports performance in mind.</p>
      </footer>

    </div>
  );
}