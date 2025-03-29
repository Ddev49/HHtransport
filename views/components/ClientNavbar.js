"use client";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "@/context/SettingsContext";

const Navbar = () => {
  const { navbarColor } = useSettings();


  return (
    <header class="header" style={navbarColor ?{ backgroundColor: navbarColor }:{}}>
      {/* Logo + Slogan */}
        <div>
            <Link href="/">
              <Image src="/hhlogo2.webp" alt="Logo" className="navbar-logo" />
              <Image src="/hhslogan2.webp" alt="Slogan" className="navbar-logo hidden" />
            </Link>
        </div>
        <input type="checkbox" id="check" />
        <label for="check" class="icons">
          <span id="menu-icon">☰</span>
          <span id="close-icon">✕</span>
        </label>

        {/* Navigation Desktop */}
        <nav className="navbar">
          <Link href="/" style={{ "--i": 0 }}>Accueil</Link>
          <Link href="/formules" style={{ "--i": 1 }}>Formules</Link>
          <Link href="/contact" style={{ "--i": 2 }}>Contact</Link>
          <Link href="/HHTransport" style={{ "--i": 3 }}>Qui somme_nous</Link>
          <Link href="/eco_depot" style={{ "--i": 4 }}>Eco depot</Link>
          <Link href="/blogs" style={{ "--i": 5 }}>Blogs</Link>
        </nav>

        { /* Bouton Hamburger Mobile */}
        
      </header>
  );
}

export default Navbar;
