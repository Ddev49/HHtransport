"use client"; // Ce fichier sera un composant Client
import { useSettings } from "@/context/SettingsContext";

export default function InfoBar() {
  const { showInfoBar, infoBar, infoBarColor,infoBarColorText } = useSettings();

  if (!showInfoBar || !infoBar) return null; // 🔥 Ne rien afficher si désactivé

  return (
    <div className="info-bar" style={infoBarColor ?{ backgroundColor: infoBarColor , color:infoBarColorText }:{}}>
      <p>{infoBar}</p>
    </div>
  );
}
