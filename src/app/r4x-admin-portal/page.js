"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaSignOutAlt, FaPlus, FaTachometerAlt, FaUnlockAlt, FaBoxOpen } from "react-icons/fa";

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Android",
    image: "/logo.jpg",
    whatsappMessage: ""
  });
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check login on mount
  useEffect(() => {
    const token = localStorage.getItem("r4x-admin-token");
    if (token === "r4x-admin-authorized-token-2026") {
      setLogin(true);
      fetchProducts();
    }
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Perform login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("r4x-admin-token", data.token);
        setLogin(true);
        fetchProducts();
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch (err) {
      setLoginError("Server error. Please try again.");
    }
  };

  // Perform logout
  const handleLogout = () => {
    localStorage.removeItem("r4x-admin-token");
    setLogin(false);
    setUsername("");
    setPassword("");
  };

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormSuccess("");
    setFormError("");
    setLoading(true);

    if (!form.title || !form.price || !form.description || !form.whatsappMessage) {
      setFormError("All fields except Image URL are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setFormSuccess("Product added successfully!");
        setForm({
          title: "",
          description: "",
          price: "",
          category: "Android",
          image: "/logo.jpg",
          whatsappMessage: ""
        });
        fetchProducts();
      } else {
        setFormError(data.error || "Failed to add product");
      }
    } catch (err) {
      setFormError("Error occurred. Please check DB connection.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this optimization tool?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Pre-fill WhatsApp message helper when Title changes
  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setForm(prev => ({
      ...prev,
      title: titleVal,
      whatsappMessage: titleVal ? `Hi R4X Sensi, I would like to buy the ${titleVal} (${prev.price || '$9.99'}).` : ""
    }));
  };

  // Pre-fill WhatsApp price helper when Price changes
  const handlePriceChange = (e) => {
    const priceVal = e.target.value;
    setForm(prev => ({
      ...prev,
      price: priceVal,
      whatsappMessage: prev.title ? `Hi R4X Sensi, I would like to buy the ${prev.title} (${priceVal}).` : ""
    }));
  };

  // Login view
  if (!login) {
    return (
      <div className="container" style={{ maxWidth: "450px", marginTop: "40px" }}>
        <div className="glass" style={{ padding: "40px 30px", textAlign: "center" }}>
          
          <img src="/logo.jpg" alt="R4X" style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid #39FF14", objectFit: "cover", marginBottom: "20px" }} />
          
          <h2 className="glow-text" style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
            ADMIN PORTAL
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "30px" }}>
            Authenticate to manage eSports optimization configurations.
          </p>

          {loginError && (
            <div style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#f87171",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "0.9rem"
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input 
              type="email" 
              className="input-glass" 
              placeholder="Username Email" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <input 
              type="password" 
              className="input-glass" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px", gap: "8px" }}>
              <FaUnlockAlt /> Authorize
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="container">
      
      {/* HEADER */}
      <div className="glass" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 30px",
        marginBottom: "40px"
      }}>
        <div>
          <h1 className="glow-text" style={{ fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaTachometerAlt /> ADMIN PANEL
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Active Dashboard for R4X Sensi
          </p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "8px 18px" }}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* DASHBOARD LAYOUT */}
      <div className="admin-layout">
        
        {/* ADD PRODUCT FORM */}
        <div className="glass" style={{ padding: "30px" }}>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.3rem", color: "#fff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaPlus style={{ color: "var(--neon)", fontSize: "1.1rem" }} /> Add Tool Configuration
          </h2>

          {formSuccess && (
            <div style={{
              background: "rgba(57, 255, 20, 0.1)",
              border: "1px solid rgba(57, 255, 20, 0.3)",
              color: "var(--neon)",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "0.9rem"
            }}>
              {formSuccess}
            </div>
          )}

          {formError && (
            <div style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#f87171",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "0.9rem"
            }}>
              {formError}
            </div>
          )}

          <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            
            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Tool Name</label>
              <input 
                type="text" 
                className="input-glass" 
                placeholder="e.g. R4X FPS Boost Pro" 
                value={form.title}
                onChange={handleTitleChange}
                required
                style={{ marginTop: "5px" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Category</label>
                <select 
                  className="input-glass"
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  style={{ marginTop: "5px", cursor: "pointer" }}
                >
                  <option value="Android">Android</option>
                  <option value="iOS">iOS</option>
                  <option value="PC">PC</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Price (with currency)</label>
                <input 
                  type="text" 
                  className="input-glass" 
                  placeholder="e.g. $9.99" 
                  value={form.price}
                  onChange={handlePriceChange}
                  required
                  style={{ marginTop: "5px" }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Image Link / Path</label>
              <input 
                type="text" 
                className="input-glass" 
                value={form.image}
                onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                style={{ marginTop: "5px" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>WhatsApp Checkout Message</label>
              <textarea 
                className="input-glass" 
                placeholder="Pre-filled customer buy message..."
                value={form.whatsappMessage}
                onChange={(e) => setForm(prev => ({ ...prev, whatsappMessage: e.target.value }))}
                required
                rows={2}
                style={{ marginTop: "5px", resize: "none" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Description</label>
              <textarea 
                className="input-glass" 
                placeholder="Details of performance increases..."
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
                style={{ marginTop: "5px", resize: "none" }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", gap: "8px" }} disabled={loading}>
              {loading ? "Adding..." : <><FaPlus /> Add Tool Config</>}
            </button>

          </form>
        </div>

        {/* PRODUCT LIST */}
        <div className="glass" style={{ padding: "30px" }}>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.3rem", color: "#fff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaBoxOpen style={{ color: "var(--neon)", fontSize: "1.1rem" }} /> Active Configurations ({products.length})
          </h2>

          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              No products active in database. Seed data via frontend refresh.
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tools Info</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id}>
                      <td>
                        <div style={{ fontWeight: "700", color: "#fff" }}>{p.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
                          {p.description}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.8rem", fontWeight: "700" }}>{p.category}</span>
                      </td>
                      <td>
                        <span style={{ color: "var(--neon)", fontWeight: "700" }}>{p.price}</span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => handleDeleteProduct(p._id)}
                          style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}