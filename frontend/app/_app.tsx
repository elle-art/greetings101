"use client";
import { createContext, useContext, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import Layout from './layout';
import { getDesignTokens } from '@/utils/theme/DesignTokens';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, PaletteMode, useMediaQuery, useTheme } from '@mui/material';
import { ColorModeContext } from './components/settings/ToggleColorMode';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;