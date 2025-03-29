import "./css/globals.css";
import Script from 'next/script';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InfoBar from "@/components/InfoBar";
import { SettingsProvider} from "@/context/SettingsContext";
import { getPageMetadata } from "./metadata";


export async function generateMetadata() {
  return {
    ...getPageMetadata("home"),
    icons: {
      icon: [{ url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' }],
      shortcut: [{ url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' }],
      apple: [{ url: '/hh.png', sizes: '512x512', type: 'image/png' }], // idéalement 180x180 pour Apple
    },
  };
}


// modele du site ne changera nullpar
export default function RootLayout({ children }) {
  return (
    <SettingsProvider> 
      <html lang="fr">
        <head>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-DDWC0VVTSW`} />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-DDWC0VVTSW');
            `}
          </Script>
        </head>
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
