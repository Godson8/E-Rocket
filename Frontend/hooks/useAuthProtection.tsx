"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function getTokenFromCookies() {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  if (tokenCookie) {
    const tokenValue = tokenCookie.split("=")[1];
    return tokenValue;
  }

  return null;
}

export function useAuthProtection() {
  const router = useRouter();

  useEffect(() => {
    const token = getTokenFromCookies();

    if (!token) {
      router.push("/login");
    } else {
      // Set the token in Axios headers for all requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return null;
}
