'use client'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { API_BASE_URL, UPDATE_USER_ENDPOINT } from "@/utils/constants";
import { getDesignTokens } from "@/utils/theme/DesignTokens";
import { useUser } from "@/utils/user/UserContext";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface ToggleColorModeProviderProps {
  children: ReactNode;
}

export const ToggleColorModeProvider = ({ children }: ToggleColorModeProviderProps) => {
  const {user, setUser} = useUser();
  const [mode, setMode] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('colorMode') as 'light' | 'dark' | null;
      const initialMode = user?.preferences.darkModePref || storedMode || 'light';
      setMode(initialMode);
    }
  }, [user]);

  const updateUserPreference = async (mode: 'light' | 'dark') => {
    if (!user) {
      console.error('No user found');
      return;
    }

    const updatedUser = { ...user, preferences: { ...user.preferences, darkModePref: mode }};

    const response = await fetch(`${API_BASE_URL}${UPDATE_USER_ENDPOINT}${user.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
      setMode(result.user.preferences.darkModePref);
    } else {
      console.error('Failed to update user preference');
    }
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        updateUserPreference(newMode);
      },
    }),
    [mode, user]
  );

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode || 'light')),
    [mode]
  );

  if (mode === null) {
    return null;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
