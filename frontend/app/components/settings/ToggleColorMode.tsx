import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import DarkModeButton from "./DarkModeButton";
import getUserFromLocalStorage from "@/utils/user/getUser";
import { API_BASE_URL, UPDATE_USER_ENDPOINT } from "@/utils/constants";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [user, setUser] = useState(getUserFromLocalStorage());

    const updateUserPreference = async (mode: string) => {
        if(!user) {
            console.error('No user found,')
        }

        const updatedUser = { ...user, darkModePref: mode };
    
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
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <DarkModeButton />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }