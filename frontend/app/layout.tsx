// app/layout.tsx
"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import Footer from './layout/footer/page';

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

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
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
      </body>
    </html>
  );
};

export default RootLayout;
