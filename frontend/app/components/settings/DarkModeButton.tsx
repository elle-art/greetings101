import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './ToggleColorMode';

const DarkModeButton = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  
  return (
    <Box
      sx={{
        display: 'flex',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 1,
        mt: 3,
        border: '2px solid white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
      onClick={colorMode.toggleColorMode}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default DarkModeButton;