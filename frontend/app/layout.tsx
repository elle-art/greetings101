"use client";
import { usePathname } from "next/navigation";
import { ThemeProvider, CssBaseline, Button, useTheme } from "@mui/material";
import React, { useState, useContext } from "react";
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import Footer from './layout/footer/page';
import useAuth from "@/utils/user/useAuth";
import getUserFromLocalStorage from "@/utils/user/getUser";
import { ToggleColorModeProvider, ColorModeContext } from "./components/settings/ToggleColorMode";
import { styled, Container, Box } from "@mui/material";
import { getDesignTokens } from "@/utils/theme/DesignTokens";
import { UserProvider } from "@/utils/user/UserContext";

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

interface ProfileBkgrdProps {
  isProfilePage: boolean;
}
const color = "#32a852";

const ProfileBkgrd = styled("div")<ProfileBkgrdProps>(({ isProfilePage }) => ({
  width: "100%",
  height: "350px",
  paddingBottom: "350px",
  backgroundColor: isProfilePage ? `${color}` : "transparent",
  boxShadow: isProfilePage ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0',
}));

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isProfilePage = pathname === '/pages/ViewProfile';
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const userAuth = useAuth();

  if (!userAuth) {
    return (
      <html lang="en">
        <body>
          <ToggleColorModeProvider>
            <UserProvider>
            <CssBaseline />
            <MainWrapper className="mainwrapper">
              <PageWrapper className="page-wrapper">
                <Container
                  sx={{
                    paddingTop: "20px",
                    maxWidth: "1200px",
                    margin: '0 auto',
                  }}
                >
                  <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                    {children}
                  </Box>
                  <Footer />
                </Container>
              </PageWrapper>
            </MainWrapper>
            </UserProvider>
          </ToggleColorModeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <ToggleColorModeProvider>
        <UserProvider>
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
          </UserProvider>
        </ToggleColorModeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
