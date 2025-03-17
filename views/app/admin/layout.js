import "../css/admin.css";
import { getAdminMetadata } from "./metadata";

export async function generateMetadata({ params }) {
  const page = params.page || "nodefini"
  return {  
        ...getAdminMetadata(page),
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/favicon-32x32.png",
        },
    };
}

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
