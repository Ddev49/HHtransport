import "../css/login.css";
import { metadataBase, getPageMetadata } from "../metadata";

export async function generateMetadata() {
  return {
    ...getPageMetadata("login"),
    metadataBase,
  };
}

export default function FormuleLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}