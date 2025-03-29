"use client";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import axios from "axios";

const AdminNavbar = () => {
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
    <header class="header" style={navbarColor ?{ backgroundColor: navbarColor }:{}}>
      <div>
        <Link href="/">
          <Image src="/hhlogo2.webp" alt="Logo" className="navbar-logo" />
        </Link > 
      </div>
      <input type="checkbox" id="check" />
      <label for="check" class="icons">
        <span id="menu-icon">☰</span>
        <span id="close-icon">✕</span>
      </label>

      <nav className="navbar">
        <Link href="/admin" style={{ "--i": 0 }}> Tableau de Bord</Link>
        <Link href="/admin/blogs" style={{ "--i": 1 }}> Gestion des Blogs </Link>
        <Link href="/admin/options" style={{ "--i": 2 }}> Gestion des Options </Link>
        <Link href="/admin/profil" style={{ "--i": 3 }}> Profil</Link>
        <button onClick={handleLogout} className="logout-btn" style={{ "--i": 4 }}>Déconnexion</button>
      </nav>
    </header>
  ) : null;
};

export default AdminNavbar;
