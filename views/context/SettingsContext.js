"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Création du contexte
const SettingsContext = createContext();

// Provider qui charge les paramètres depuis le backend
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    navbarColor: null,
    footerColor: null,
    footerBottomColor: null,
    bodyColor: null,
    title: null,
    infoBar:null,
    infoBarColor:null,
    infoBarColorText:null,
    showInfoBar:null,
    phone: null,
    email: null,
    address: null,
  });
  // Variable d'état pour indiquer si les paramètres sont en cours de chargement
  const [isLoading, setIsLoading] = useState(true);
  // Charger les paramètres au montage du site
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/admin/settings");
        setSettings({
            bodyColor: res.data.colors.body || null,
            navbarColor: res.data.colors.navbar || null,
            footerColor: res.data.colors.footer || null,
            footerBottomColor: res.data.colors.footerBottom || null,
            infoBarColor : res.data.colors.infoBarColor || null,
            infoBarColorText: res.data.colors.infoBarColorText || null,
            title: res.data.title || null,
            phone: res.data.phone || null,
            email: res.data.email || null,
            address: res.data.address || null,
            infoBar: res.data.infoBar || null,
            showInfoBar: res.data.showInfoBar || null,
        });
      } catch (error) {
        /*erreur silencieuse*/
      }
      finally {
        setIsLoading(false);  // Une fois l'appel terminé, on désactive le "chargement"
      }
    };

    fetchSettings();
  }, []);
  if (isLoading) {
    <>{children}</>
  }

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook personnalisé pour accéder aux paramètres
export const useSettings = () => {
  return useContext(SettingsContext);
};
