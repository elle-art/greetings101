// app/layout.tsx
"use client";
import useAuth from "@/utils/user/useAuth";
import { getDesignTokens } from "@/utils/theme/DesignTokens";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container, Box, Button, Grid, PaletteMode, createTheme, useMediaQuery } from "@mui/material";
import React, { createContext, useMemo, useState } from "react";
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import Footer from './layout/footer/page';
import { ColorModeContext } from "./_app";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuth();
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

  if (!user) {
    return (
      <html lang="en">
        <body>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={ theme }>
              <CssBaseline/>
              <MainWrapper className="mainwrapper">
                <PageWrapper className="page-wrapper">
                    <Button variant="contained" color="primary" href='pages/Login' sx={{
                      width: '100px',
                      marginLeft: '90%',
                      marginTop: '10px'
                    }}>
                        Sign In!
                      </Button>        
                  <Container
                    sx={{
                      paddingTop: "20px",
                      maxWidth: "1200px",
                      margin: '0 auto',
                    }}
                  >
                    <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
                    <Footer />
                  </Container>
                </PageWrapper>
              </MainWrapper>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={ theme }>
            <CssBaseline/>
            <MainWrapper className="mainwrapper">
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                onSidebarClose={() => setSidebarOpen(false)}
              />
              <PageWrapper className="page-wrapper">
                <Header toggleSidebar={() => setSidebarOpen(true)} />
                <Container
                  sx={{
                    paddingTop: "20px",
                    maxWidth: "1200px",
                    margin: '0 auto',
                  }}
                >
                  <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
                  <Footer />
                </Container>
              </PageWrapper>
            </MainWrapper>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
};

export default RootLayout;
