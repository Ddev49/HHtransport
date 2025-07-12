"use client";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import Link from "next/link";
import axios from "axios";

const Footer = () => {
  const { title,email, phone, address ,footerColor,footerBottomColor} = useSettings();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/settings")
      .then((res) => setSettings(res.data))
      .catch((err) => console.error("Erreur chargement paramètres", err));
  }, []);
  return (
    <footer className="footer"  style={footerColor ?{ backgroundColor: footerColor }:{}}>
      <div className="footer-container">
        {/* Liens rapides */}
        <div className="footer-links">
          <h3>Liens utiles</h3>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/formules">Formules</Link></li>
            <li><Link href="/contact">Contact </Link></li>
            {/* <li><Link href="/HHTransport">Qui sommes-nous</Link></li> */}
            <li><Link href="/eco_depot">Eco Depôt</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>
          </ul>
        </div>

        {/* Nos engagements */}
        <div className="footer-info">
          <h3>Nos engagements</h3>
          <p>- Service client réactif</p>
          <p>- Déménagement sécurisé</p>
          <p>- Respect des délais</p>
          <p>- Solutions adaptées à votre budget</p>
        </div>

        {/* Infos de l'entreprise */}
        <div className="footer-info">
          <h3>{ title ? title : "H&H Transport"}</h3>
          <p>Votre spécialiste en Déménagement et Transports De Marchandises.</p>
          <p><strong>Adresse :</strong> {address ? address : "Angers 49100"}</p>
          <p><strong>Email :</strong> {email ? email : "contact@hh-transports.com"}</p>
          <p><strong>Téléphone :</strong> {phone ? phone : "+33 7 49 89 46 24"}</p>
       </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom" style={footerBottomColor ?{ backgroundColor: footerBottomColor }:{}}>
        <p>&copy; {new Date().getFullYear()} { title ? title : "H&H Transport"} - Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;

