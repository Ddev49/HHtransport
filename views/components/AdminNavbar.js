"use client";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import axios from "axios";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { navbarColor } = useSettings();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Vérifie si le cookie est valide en appelant l'API
        const res = await axios.get("/api/admin/verify-token", { withCredentials: true });

        if (res.data.valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/login");
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push("/login");
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout", {}, { withCredentials: true });
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  if (loading) return null; // Ne pas afficher la navbar tant que la vérification est en cours

  return isAuthenticated ? (
    <nav className="navbar"  style={navbarColor ?{ backgroundColor: navbarColor }:{}}>
      <div className="navbar-container">
        <div className="flex items-center space-x-2">
          <Link  href="/">
            <Image src="/hhlogo2.webp" alt="Logo" className="navbar-logo" />
          </Link > 
       </div>

        <div className="navbar-links">
          <Link href="/admin"> Tableau de Bord</Link>
          <Link href="/admin/blogs"> Gestion des Blogs </Link>
          <Link href="/admin/options"> Gestion des Options </Link>
          <Link href="/admin/profil"> Profil</Link>
          <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
        </div>

        <button className="navbar-hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      <div className={`navbar-mobile-menu ${isOpen ? "active" : ""}`} style={navbarColor ?{ backgroundColor: navbarColor }:{}}>
        <Link href="/admin" onClick={() => setIsOpen(false)}>Tableau de Bord</Link>
        <Link href="/admin/blogs" onClick={() => setIsOpen(false)}>Gestion des Blogs</Link>
        <Link href="/admin/options" onClick={() => setIsOpen(false)}>Gestion des Options</Link>
        <Link href="/admin/profil" onClick={() => setIsOpen(false)}>Profil</Link>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </div>
    </nav>
  ) : null;
};

export default AdminNavbar;
