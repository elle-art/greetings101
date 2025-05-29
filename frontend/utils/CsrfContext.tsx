// csrfContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL, CSRF_ENDPOINT } from "@/utils/constants/api";

const CsrfContext = createContext<string | null>(null);

export const useCsrfToken = () => useContext(CsrfContext);

export const CsrfProvider = ({ children }: { children: React.ReactNode }) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  function getCookie(name: string): string | null {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1] ?? null
    );
  }

  useEffect(() => {
    fetch(`${API_BASE_URL}${CSRF_ENDPOINT}`, { credentials: "include" })
      .then((res) => res.json())
      .then((response) => {
        setCsrfToken(response.headers.get("X-CSRFToken"));
        console.log("Fetched CSRF token:", response.headers.get("X-CSRFToken"));
        console.log("document.cookie:", document.cookie);
      })
  }, []);

  return (
    <CsrfContext.Provider value={csrfToken}>{children}</CsrfContext.Provider>
  );
};
