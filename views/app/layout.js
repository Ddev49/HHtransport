import "./css/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InfoBar from "@/components/InfoBar";
import { SettingsProvider} from "@/context/SettingsContext";
import { getPageMetadata } from "./metadata";


export async function generateMetadata() {
  return {
    ...getPageMetadata("home"),
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon-32x32.png",
    },
  };
}


// modele du site ne changera nullpar
export default function RootLayout({ children }) {
  return (
    <SettingsProvider> 
      <html lang="fr">

        <body >
          <InfoBar />
          <Navbar />
          <main className="main-container ">{children}</main>
          <Footer />
        </body>
      </html>
    </SettingsProvider>
  );
}
