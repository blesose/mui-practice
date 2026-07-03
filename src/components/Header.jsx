import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Tooltip } from '@mui/material';
import { Refresh as RefreshIcon, LightMode, DarkMode } from '@mui/icons-material';

export function Header({ darkMode, toggleTheme, onRefresh, loading }) {
  return (
    <AppBar position="fixed" elevation={0} sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          User Dashboard
        </Typography>
        <Switch checked={darkMode} onChange={toggleTheme} icon={<LightMode />} checkedIcon={<DarkMode />} />
        <Tooltip title="Refresh">
          <IconButton color="inherit" onClick={onRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}