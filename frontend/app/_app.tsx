"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import Layout from './layout';
import { getDesignTokens } from '@/utils/theme/DesignTokens';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, PaletteMode, useMediaQuery } from '@mui/material';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
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
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
