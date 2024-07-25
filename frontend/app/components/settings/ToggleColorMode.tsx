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
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        console.log("Button clicked");
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
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