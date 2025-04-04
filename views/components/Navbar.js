"use client"; // Ce fichier sera un composant Client
import ClientNavbar from "@/components/ClientNavbar";
import AdminNavbar from "@/components/AdminNavbar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  // Liste des pages admin qui ne nécessitent PAS de connexion
  const publicAdminPages = ["/admin/reset-password", "/admin/new-password"];

  // Vérifier si l'utilisateur est sur une page admin publique
  const isPublicAdminPage = publicAdminPages.includes(pathname);
//{isAdminRoute ? <AdminNavbar /> : <ClientNavbar />}
// Fermer le menu mobile à chaque changement de route
  useEffect(() => {
    const checkbox = document.getElementById("check");
    if (checkbox) checkbox.checked = false;
  }, [pathname]);
  return (
    <>
        {isAdminRoute && !isPublicAdminPage ? <AdminNavbar /> : <ClientNavbar />}
    </>
  );
}
