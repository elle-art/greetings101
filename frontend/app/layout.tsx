// app/layout.tsx
"use client";
import useAuth from "@/utils/user/useAuth";
import { usePathname } from "next/navigation";
import { getDesignTokens } from "@/utils/theme/DesignTokens";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container, Box, Button, createTheme, useTheme } from "@mui/material";
import React, { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import Footer from './layout/footer/page';
import getUserFromLocalStorage from "@/utils/user/getUser";

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

const userData = getUserFromLocalStorage();
interface ProfileBkgrdProps {
  isProfilePage: boolean;
}
const color = "#32a852"

const ProfileBkgrd = styled("div")<ProfileBkgrdProps>(({ isProfilePage }) => ({
  width: "100%",
  height: "350px",
  paddingBottom: "350px",
  backgroundColor: isProfilePage ? `${color}` : "transparent",
  boxShadow: isProfilePage ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0',
}));

interface RootLayoutProps {
  children: ReactNode;
}

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const RootLayout = ({ children }: RootLayoutProps) => {
  const pathname = usePathname();
  const isProfilePage = pathname === '/pages/ViewProfile';
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuth();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  if (!user) {
    return (
      <html lang="en">
        <body>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MainWrapper className="mainwrapper">
                <PageWrapper className="page-wrapper">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      href='pages/Login' 
                      sx={{
                        width: '100px',
                        marginLeft: '90%',
                        marginTop: '10px'
                      }}
                    >
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
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <MainWrapper className="mainwrapper">
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                onSidebarClose={() => setSidebarOpen(false)}
              />
              <PageWrapper className="page-wrapper">
                <ProfileBkgrd isProfilePage={isProfilePage}>
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
                </ProfileBkgrd>
              </PageWrapper>
            </MainWrapper>
          </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
