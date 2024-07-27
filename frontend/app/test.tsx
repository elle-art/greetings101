// pages/_app.tsx
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme, useMediaQuery } from '@mui/material';
import { createContext, useMemo, useState } from 'react';
import { UserProvider } from '@/utils/user/UserContext'; // Adjust path as necessary
import { ColorModeContext } from './components/settings/ToggleColorMode'; // Adjust path as necessary
import { getDesignTokens } from '@/utils/theme/DesignTokens'; // Adjust path as necessary

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <UserProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserProvider>
  );
}

export default MyApp;
