"use client";

import { useSearchParams } from "next/navigation";

export default function GetToken({ onToken }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  if (token) {
    onToken(token);
  }

  return null; // Ne retourne rien, il sert juste à récupérer le token
}
