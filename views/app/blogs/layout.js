import "../css/blog.css"
import { metadataBase, getPageMetadata } from "../metadata";

export async function generateMetadata() {
  return {
    ...getPageMetadata("blogs"),
    metadataBase,
  };
}

export default function FormuleLayout({ children }) {
  return (
      <>{children}</>
  );
}