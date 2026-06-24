"use client";

import { useState, useEffect, useRef } from "react";
import { FaTrash, FaEdit, FaSignOutAlt, FaPlus, FaTachometerAlt, FaUnlockAlt, FaBoxOpen, FaTimes } from "react-icons/fa";

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null); // null = adding, string = editing id
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

  const formRef = useRef(null);

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
      if (data.success) setProducts(data.products || []);
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

  // Reset form to add mode
  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", description: "", price: "", category: "Android", image: "/logo.jpg", whatsappMessage: "" });
    setFormSuccess("");
    setFormError("");
  };

  // Load product into form for editing
  const handleEditProduct = (product) => {
    setEditingId(product._id);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image || "/logo.jpg",
      whatsappMessage: product.whatsappMessage
    });
    setFormSuccess("");
    setFormError("");
    // Scroll to form
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  // Submit form: add or update
  const handleSubmitForm = async (e) => {
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
      let res, data;
      if (editingId) {
        // UPDATE existing product
        res = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        data = await res.json();
        if (data.success) {
          setFormSuccess("Product updated successfully!");
          resetForm();
          fetchProducts();
        } else {
          setFormError(data.error || "Failed to update product");
        }
      } else {
        // ADD new product
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        data = await res.json();
        if (data.success) {
          setFormSuccess("Product added successfully!");
          resetForm();
          fetchProducts();
        } else {
          setFormError(data.error || "Failed to add product");
        }
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
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        if (editingId === id) resetForm();
        fetchProducts();
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Auto-fill WhatsApp message on title change
  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setForm(prev => ({
      ...prev,
      title: titleVal,
      whatsappMessage: titleVal
        ? `Hi R4X Sensi, I would like to buy the ${titleVal} (${prev.price || "Rs 9.99"}).`
        : ""
    }));
  };

  // Auto-fill WhatsApp message on price change
  const handlePriceChange = (e) => {
    const priceVal = e.target.value;
    setForm(prev => ({
      ...prev,
      price: priceVal,
      whatsappMessage: prev.title
        ? `Hi R4X Sensi, I would like to buy the ${prev.title} (${priceVal}).`
        : ""
    }));
  };

  // ─── LOGIN VIEW ───────────────────────────────────────────
  if (!login) {
    return (
      <div className="admin-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "20px" }}>
      <div className="container" style={{ maxWidth: "450px", width: "100%", paddingTop: "0" }}>
        <div className="glass" style={{ padding: "40px 30px", textAlign: "center" }}>

          <img src="/logo.jpg" alt="R4X" style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid #39FF14", objectFit: "cover", marginBottom: "20px" }} />

          <h2 className="glow-text" style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
            ADMIN PORTAL
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "30px" }}>
            Authenticate to manage eSports optimization configurations.
          </p>

          {loginError && (
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171", padding: "10px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem" }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input type="email" className="input-glass" placeholder="Username Email" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" className="input-glass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px", gap: "8px" }}>
              <FaUnlockAlt /> Authorize
            </button>
          </form>

        </div>
      </div>
      </div>
    );
  }

  // ─── DASHBOARD VIEW ───────────────────────────────────────
  return (
    <div className="admin-page"><div className="container" style={{ paddingTop: "40px" }}>

      {/* HEADER */}
      <div className="glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 30px", marginBottom: "40px" }}>
        <div>
          <h1 className="glow-text" style={{ fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaTachometerAlt /> ADMIN PANEL
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Active Dashboard for R4X Sensi</p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "8px 18px" }}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="admin-layout">

        {/* ── FORM PANEL ── */}
        <div className="glass" style={{ padding: "30px" }} ref={formRef}>

          {/* Form header with mode indicator */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
              {editingId
                ? <><FaEdit style={{ color: "#60a5fa" }} /> Edit Tool Config</>
                : <><FaPlus style={{ color: "var(--neon)" }} /> Add Tool Config</>
              }
            </h2>
            {editingId && (
              <button
                onClick={resetForm}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "0.85rem" }}
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>

          {/* Edit mode banner */}
          {editingId && (
            <div style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.3)", color: "#60a5fa", padding: "10px 14px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.85rem" }}>
              ✏️ Editing existing product. Click <strong>Update</strong> to save changes, or <strong>Cancel</strong> to discard.
            </div>
          )}

          {formSuccess && (
            <div style={{ background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.3)", color: "var(--neon)", padding: "10px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem" }}>
              {formSuccess}
            </div>
          )}

          {formError && (
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171", padding: "10px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem" }}>
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmitForm} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Tool Name</label>
              <input type="text" className="input-glass" placeholder="e.g. R4X FPS Boost Pro" value={form.title} onChange={handleTitleChange} required style={{ marginTop: "5px" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Category</label>
                <select className="input-glass" value={form.category} onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))} style={{ marginTop: "5px", cursor: "pointer" }}>
                  <option value="Android">Android</option>
                  <option value="iOS">iOS</option>
                  <option value="PC">PC</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Price</label>
                <input type="text" className="input-glass" placeholder="e.g. Rs 9.99" value={form.price} onChange={handlePriceChange} required style={{ marginTop: "5px" }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Image URL / Path</label>
              <input type="text" className="input-glass" value={form.image} onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))} style={{ marginTop: "5px" }} />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>WhatsApp Message</label>
              <textarea className="input-glass" placeholder="Pre-filled customer buy message..." value={form.whatsappMessage} onChange={(e) => setForm(prev => ({ ...prev, whatsappMessage: e.target.value }))} required rows={2} style={{ marginTop: "5px", resize: "none" }} />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Description</label>
              <textarea className="input-glass" placeholder="Details of performance increases..." value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} required rows={3} style={{ marginTop: "5px", resize: "none" }} />
            </div>

            <button
              type="submit"
              className={`btn ${editingId ? "btn-secondary" : "btn-primary"}`}
              style={{ width: "100%", gap: "8px", background: editingId ? "rgba(96,165,250,0.15)" : undefined, color: editingId ? "#60a5fa" : undefined, border: editingId ? "1px solid rgba(96,165,250,0.4)" : undefined }}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                  ? <><FaEdit /> Update Product</>
                  : <><FaPlus /> Add Tool Config</>
              }
            </button>

          </form>
        </div>

        {/* ── PRODUCT TABLE ── */}
        <div className="glass" style={{ padding: "30px" }}>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.2rem", color: "#fff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaBoxOpen style={{ color: "var(--neon)" }} /> Active Configurations ({products.length})
          </h2>

          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              No products active. Visit the store page to seed initial data.
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tool Info</th>
                    <th>Cat.</th>
                    <th>Price</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} style={{ background: editingId === p._id ? "rgba(96,165,250,0.05)" : undefined }}>
                      <td>
                        <div style={{ fontWeight: "700", color: editingId === p._id ? "#60a5fa" : "#fff" }}>{p.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                          {p.description}
                        </div>
                      </td>
                      <td><span style={{ fontSize: "0.8rem", fontWeight: "700" }}>{p.category}</span></td>
                      <td><span style={{ color: "var(--neon)", fontWeight: "700" }}>{p.price ? p.price.replace('$', 'Rs ') : ''}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                          {/* EDIT BUTTON */}
                          <button
                            onClick={() => handleEditProduct(p)}
                            style={{
                              background: editingId === p._id ? "rgba(96,165,250,0.3)" : "rgba(96,165,250,0.1)",
                              border: "1px solid rgba(96,165,250,0.4)",
                              color: "#60a5fa",
                              borderRadius: "6px",
                              padding: "6px 10px",
                              cursor: "pointer",
                              transition: "all 0.2s",
                              fontSize: "0.85rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px"
                            }}
                            title="Edit"
                          >
                            <FaEdit /> Edit
                          </button>
                          {/* DELETE BUTTON */}
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteProduct(p._id)}
                            style={{ padding: "6px 10px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "5px" }}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div></div>
  );
}