"use client";

import { useEffect, useState } from "react";
import { FaSearch, FaWhatsapp, FaGamepad } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setProducts(d.products || []);
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const categories = ["All", "Android", "iOS", "PC"];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Android": return "badge-category badge-android";
      case "iOS": return "badge-category badge-ios";
      case "PC": return "badge-category badge-pc";
      default: return "badge-category";
    }
  };

  return (
    <div className="container">

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 className="glow-text" style={{ fontSize: "3rem", marginBottom: "15px" }}>
          R4X STORE
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Select the optimization suite designed specifically for your hardware setup.
        </p>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="glass" style={{
        padding: "20px 30px",
        marginBottom: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}>
        
        {/* Search */}
        <div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
          <input 
            type="text"
            className="input-glass"
            placeholder="Search optimization tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: "45px" }}
          />
          <FaSearch style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)"
          }} />
        </div>

        {/* Categories */}
        <div className="tab-container">
          {categories.map(cat => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="glass" style={{ padding: "60px", textAlign: "center", color: "var(--text-muted)" }}>
          <FaGamepad style={{ fontSize: "3rem", color: "rgba(255,255,255,0.1)", marginBottom: "15px" }} />
          <h3>No Optimization Tools Found</h3>
          <p style={{ fontSize: "0.95rem" }}>Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map(p => (
            <div key={p._id} className="glass card-premium" style={{ position: "relative" }}>
              
              <div style={{
                width: "100%",
                height: "180px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                marginBottom: "20px",
                position: "relative"
              }}>
                <img 
                  src={p.image || "/logo.jpg"} 
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }} 
                />
                <div style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px"
                }}>
                  <span className={getCategoryBadgeClass(p.category)}>
                    {p.category}
                  </span>
                </div>
              </div>

              <h3 className="card-title" style={{ fontSize: "1.3rem" }}>{p.title}</h3>
              <p className="card-description" style={{ fontSize: "0.9rem" }}>{p.description}</p>
              
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "15px"
              }}>
                <span style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#39FF14", 
                  fontWeight: "900",
                  fontSize: "1.4rem",
                  textShadow: "0 0 10px rgba(57, 255, 20, 0.3)"
                }}>
                  {p.price ? p.price.replace('$', 'Rs ') : ''}
                </span>

                <a
                  className="btn btn-primary"
                  href={`https://wa.me/94725686864?text=${encodeURIComponent(p.whatsappMessage ? p.whatsappMessage.replace(/\$/g, 'Rs ') : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    gap: "8px",
                    alignItems: "center",
                    padding: "8px 20px"
                  }}
                >
                  <FaWhatsapp style={{ fontSize: "1.2rem" }} /> BUY
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}