import { createTheme } from "@mui/material/styles";
import { DM_Sans } from "next/font/google";
import { PaletteMode, useMediaQuery } from "@mui/material";

export const dm = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Define your design tokens for both light and dark modes
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: "#03c9d7",
            contrastText: "#ffffff"
          },
          secondary: {
            main: "#fb9678",
            contrastText: "#ffffff"
          },            
          background: {
            default: "#fafbfb",
            paper: "#fafbfb",
          },
          text: {
            primary: "#000",
            secondary: "rgba(0,0,0,0.87)",
          },
          action: {
            disabledBackground: "rgba(73,82,88,0.12)",
            hoverOpacity: 0.02,
            hover: "#f6f9fc",
          },
          divider: "#e5eaef",
        }
      : {
          primary: {
            main: "#03a9f4",
            contrastText: "#ffffff"
          },
          secondary: {
            main: "#ff5722",
            contrastText: "#ffffff"
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255,255,255,0.87)",
          },
          action: {
            disabledBackground: "rgba(255,255,255,0.12)",
            hoverOpacity: 0.2,
            hover: "#333333",
          },
          divider: "#333333",
        }),
    success: {
      main: "#00c292",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0bb2fb",
      contrastText: "#ffffff",
    },
    error: {
      main: "#e46a76",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fec90f",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#767e89",
      500: "#5A6A85",
      600: "#2A3547",
    },
  },
  typography: {
    fontFamily: "DM Sans, Helvetica, Arial, sans-serif",
    h1: {
      fontWeight: 500,
      fontSize: "1.875rem",
      lineHeight: "1.5",
    },
    h2: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: "1.5",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.3125rem",
      lineHeight: "1.5",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.125rem",
      lineHeight: "1.5",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: "1.5",
    },
    h6: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: "1.5",
    },
    button: {
      textTransform: "none" as "none",  // Ensure this is a valid TextTransform value
      fontWeight: "400",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: "400",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: "400",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "0px 7px 30px 0px rgba(90, 114, 123, 0.11) !important",
        },
        a: {
          textDecoration: "none",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "0",
          boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "30px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid #e5eaef`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          color: "white",
        },
        filledInfo: {
          color: "white",
        },
        filledError: {
          color: "white",
        },
        filledWarning: {
          color: "white",
        },
        standardSuccess: {
          backgroundColor: "#00c292",
          color: "#ffffff",
        },
        standardError: {
          backgroundColor: "#e46a76",
          color: "#ffffff",
        },
        standardWarning: {
          backgroundColor: "#fec90f",
          color: "#ffffff",
        },
        standardInfo: {
          backgroundColor: "#0bb2fb",
          color: "#ffffff",
        },
        outlinedSuccess: {
          borderColor: "#00c292",
          color: "#00c292",
        },
        outlinedWarning: {
          borderColor: "#fec90f",
          color: "#fec90f",
        },
        outlinedError: {
          borderColor: "#e46a76",
          color: "#e46a76",
        },
        outlinedInfo: {
          borderColor: "#0bb2fb",
          color: "#0bb2fb",
        }
      },
    },
  },
});

