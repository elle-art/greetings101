"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL, CSRF_ENDPOINT } from "@/utils/constants/api";

const CsrfContext = createContext<string | null>(null);

export const useCsrfToken = () => useContext(CsrfContext);

export const CsrfProvider = ({ children }: { children: React.ReactNode }) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}${CSRF_ENDPOINT}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCsrfToken(data.csrfToken);
        console.log("CSRF token from API:", data.csrfToken);
      })
      .catch((err) => {
        console.error("Error fetching CSRF token:", err);
      });
  }, []);

  return (
    <CsrfContext.Provider value={csrfToken}>{children}</CsrfContext.Provider>
  );
};
