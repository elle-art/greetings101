import { Button, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Component, createContext, ReactNode, useContext, useMemo, useState } from "react";
import DarkModeButton from "./DarkModeButton";
import getUserFromLocalStorage, { getMode } from "@/utils/user/getUser";
import { API_BASE_URL, UPDATE_USER_ENDPOINT } from "@/utils/constants";
import { getDesignTokens } from "@/utils/theme/DesignTokens";
import Layout from "@/app/layout";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface ToggleColorModeProviderProps {
  children: ReactNode;
}

export const ToggleColorModeProvider = ({children}: ToggleColorModeProviderProps) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  console.log('USER: ', user)
  const pref = getMode();
  console.log('mode: ', pref)

  const [mode, setMode] = useState<'light' | 'dark'>(user?.preferences.darkModePref || localStorage.getItem('colorMode'));
  // console.log('USER PREF: ', user?.preferences.darkModePref || 'logged')


    const updateUserPreference = async (mode: 'light' | 'dark') => {
        if(!user) {
            console.error('No user found,')
        }

        const updatedUser = { ...user, preferences: { ...user.preferences, darkModePref: mode }};
        // console.log('new: ', updatedUser)
    
        const response = await fetch(`${API_BASE_URL}${UPDATE_USER_ENDPOINT}${user.id}`, {
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
      [mode, user],
  );

 const theme = useMemo(
      () => createTheme(getDesignTokens(mode)),
    [mode],
  );

 return theme && (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
  </ColorModeContext.Provider>
  );
};