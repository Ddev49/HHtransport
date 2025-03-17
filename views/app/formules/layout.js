import "../css/formule.css";
import { metadataBase, getPageMetadata } from "../metadata";

export async function generateMetadata() {
  return {
    ...getPageMetadata("formules"),
    metadataBase,
  };
}

export default function FormuleLayout({ children }) {
  return (
      <>{children}</>
  );
}