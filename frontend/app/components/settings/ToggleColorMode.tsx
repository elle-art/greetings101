import { Button, createTheme, ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import DarkModeButton from "./DarkModeButton";
import getUserFromLocalStorage from "@/utils/user/getUser";
import { API_BASE_URL, UPDATE_USER_ENDPOINT } from "@/utils/constants";
import { getDesignTokens } from "@/utils/theme/DesignTokens";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface ToggleColorModeProviderProps {
  children: ReactNode;
}

export const ToggleColorModeProvider = ({children}: ToggleColorModeProviderProps) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  console.log('USER: ', user)

  const [mode, setMode] = useState<'light' | 'dark'>(user?.preferences.darkModePref || 'light');
  console.log('USER PREF: ', user?.preferences.darkModePref || 'logged out')


    const updateUserPreference = async (mode: 'light' | 'dark') => {
        if(!user) {
            console.error('No user found,')
        }

        const updatedUser = { ...user, preferences: { ...user.preferences, darkModePref: mode }};
        console.log('new: ', updatedUser)
    
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
          console.log('user1: ', user)
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

 return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};