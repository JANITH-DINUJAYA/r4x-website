"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar completely on the admin portal
  if (pathname.startsWith("/r4x-admin-portal")) {
    return null;
  }

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