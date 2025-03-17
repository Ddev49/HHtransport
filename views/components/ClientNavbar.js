"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navbarColor } = useSettings();


  return (
    <nav className="navbar" style={navbarColor ?{ backgroundColor: navbarColor }:{}}>
      <div className="navbar-container">
        
        {/* Logo + Slogan */}
        <div className="flex items-center space-x-2">
            <a href="/">
              <img src="/hhlogo2.png" alt="Logo" className="navbar-logo" />
              <img src="/hhslogan2.png" alt="Slogan" className="navbar-logo hidden" />
            </a>
        </div>

        {/* Navigation Desktop */}
        <div className="navbar-links">
          <Link href="/" >Accueil</Link>
          <Link href="/formules">Formules</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/HHTransport">Qui somme_nous</Link>
          <Link href="/eco_depot">Eco depot</Link>
          <Link href="/blogs">Blogs</Link>
        </div>
        { /* Bouton Hamburger Mobile */}
        <button 
          className="navbar-hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menu Mobile : Largeur complète, hauteur ajustée */}
      <div className={`navbar-mobile-menu ${isOpen ? "active" : ""}`} style={navbarColor ?{ backgroundColor: navbarColor }:{}}>
          <Link href="/" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link href="/formules" onClick={() => setIsOpen(false)}>Formules</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/HHTransport" onClick={() => setIsOpen(false)}>Qui somme_nous</Link>
          <Link href="/eco_depot" onClick={() => setIsOpen(false)}>Eco depot</Link>
          <Link href="/blogs" onClick={() => setIsOpen(false)}>Blogs</Link>
        </div>
    </nav>
  );
}

export default Navbar;
