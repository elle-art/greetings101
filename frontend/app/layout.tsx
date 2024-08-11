"use client";
import { usePathname } from "next/navigation";
import { CssBaseline } from "@mui/material";
import React, { useState } from "react";
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import Footer from './layout/footer/page';
import { ToggleColorModeProvider } from "./components/settings/ToggleColorMode";
import { styled, Container, Box } from "@mui/material";
import { UserProvider, useUser } from "@/utils/user/UserContext";
import { CourseProvider } from "@/utils/courses/CourseContext";
import { getUserFromLocalStorage } from "@/utils/user/getUser";

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

const ProfileBkgrd = styled("div")<ProfileBkgrdProps>(({ isProfilePage }) => ({
}));

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isProfilePage = pathname === '/pages/ViewProfile';
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = getUserFromLocalStorage();

  if (!user) {
    return (
      <html lang="en">
        <body>
          <UserProvider>
          <ToggleColorModeProvider>
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
          </ToggleColorModeProvider>
          </UserProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
      <UserProvider>
        <ToggleColorModeProvider>
            <CourseProvider>
            <CssBaseline />
              <MainWrapper className="mainwrapper">
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                onSidebarClose={() => setSidebarOpen(false)}
              />
                <PageWrapper className="page-wrapper">
                  <ProfileBkgrd isProfilePage={isProfilePage} sx={{
                      width: "100%",
                      height: "350px",
                      paddingBottom: "350px",
                      backgroundColor: isProfilePage ? `${user.preferences.pfColor}` : "transparent",
                      boxShadow: isProfilePage ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0',
                  }}>
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
            </CourseProvider>
            </ToggleColorModeProvider>
          </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
