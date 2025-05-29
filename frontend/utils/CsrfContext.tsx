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
      .then((data) => {
        console.log("Returned CSRF token:", data.csrfToken);
        console.log("document.cookie:", document.cookie);
      })
      .then(() => {
        const token = getCookie("csrftoken");
        setCsrfToken(token);
      });
  }, []);

  return (
    <CsrfContext.Provider value={csrfToken}>{children}</CsrfContext.Provider>
  );
};
