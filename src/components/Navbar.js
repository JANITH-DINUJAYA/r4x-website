import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">

      <Link href="/" className="nav-brand">
        <img 
          src="/logo.jpg" 
          alt="R4X Logo" 
          className="nav-logo" 
        />
        <span className="nav-title-text">
          R4X <span style={{ color: "#39FF14" }}>SENSI</span>
        </span>
      </Link>

      <div className="nav-links">
        <Link href="/" className="nav-link">
          Home
        </Link>
        
        <Link href="/products" className="nav-link">
          Store
        </Link>

        <Link href="/about" className="nav-link">
          About
        </Link>
      </div>

    </nav>
  );
}