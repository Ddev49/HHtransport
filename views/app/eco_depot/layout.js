import "../css/eco_depot.css";
import { metadataBase, getPageMetadata } from "../metadata";

export async function generateMetadata() {
  return {
    ...getPageMetadata("eco_depot"),
    metadataBase,
  };
}

export default function FormuleLayout({ children }) {
  return (
      <>{children}</>
  );
}