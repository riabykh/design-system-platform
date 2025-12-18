import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: 'none',
        },
        elevation2: {
          boxShadow: 'none',
        },
        elevation3: {
          boxShadow: 'none',
        },
        elevation4: {
          boxShadow: 'none',
        },
      },
    },
  },
})
