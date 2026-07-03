import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';

export function LearningNotes() {
  const notes = [
    { title: 'Material-UI Components', desc: 'Used AppBar, Table, Card, Dialog, Snackbar, Chip, Avatar, and more.' },
    { title: 'Theming & Dark Mode', desc: 'Implemented ThemeProvider with custom colors and dark/light mode toggle.' },
    { title: 'CRUD with Async/Await', desc: 'Full CRUD operations (GET, POST, PUT, DELETE) with error handling.' },
    { title: 'Responsive Design', desc: 'Used MUI breakpoints for mobile-first responsive design.' },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>What I Learned</Typography>
      <Grid container spacing={2}>
        {notes.map((n, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <Typography variant="subtitle2" fontWeight={600}>{n.title}</Typography>
              <Typography variant="body2" color="text.secondary">{n.desc}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}