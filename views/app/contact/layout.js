import "../css/contact.css";
import { metadataBase, getPageMetadata } from "../metadata";

export async function generateMetadata() {
  return {
    ...getPageMetadata("contact"),
    metadataBase,
  };
}

export default function FormuleLayout({ children }) {
  return (
      <>{children}</>
  );
}