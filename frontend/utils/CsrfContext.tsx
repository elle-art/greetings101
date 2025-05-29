// csrfContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL, CSRF_ENDPOINT } from "@/utils/constants/api";

const CsrfContext = createContext<string | null>(null);

export const useCsrfToken = () => useContext(CsrfContext);

export const CsrfProvider = ({ children }: { children: React.ReactNode }) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${CSRF_ENDPOINT}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("CSRF Token fetched:", data.csrfToken);
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };

    fetchCSRFToken();
  }, []);

  return (
    <CsrfContext.Provider value={csrfToken}>
      {children}
    </CsrfContext.Provider>
  );
};
