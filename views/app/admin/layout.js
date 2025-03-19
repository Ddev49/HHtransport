import "../css/admin.css";
import { getAdminMetadata } from "./metadata";

export async function generateMetadata({ params }) {
  const page = params.page || "nodefini"
  return {  
        ...getAdminMetadata(page),
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/hh.png",
        },
    };
}

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
