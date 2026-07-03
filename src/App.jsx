import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Button, useTheme, useMediaQuery, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Add as AddIcon, People as PeopleIcon, Dashboard as DashboardIcon, Search as SearchIcon } from '@mui/icons-material';

import { lightTheme, darkTheme } from './theme';
import { useUsers } from './hooks/useUsers';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { UserTable } from './components/UserTable';
import { UserModal } from './components/UserModal';
import { LearningNotes } from './components/LearningNotes';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDark, setIsDark] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', city: '' });
  const [submitting, setSubmitting] = useState(false);

  const { users, isLoading, error, success, search, setSearch, fetchUsers, addUser, updateUser, deleteUser } = useUsers();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const stats = [
    { title: 'Total Users', value: users.length, icon: <PeopleIcon />, color: '#1976d2' },
    { title: 'Active Users', value: users.filter(u => u.email).length, icon: <DashboardIcon />, color: '#2e7d32' },
    { title: 'Cities', value: [...new Set(users.map(u => u.city).filter(Boolean))].length, icon: <SearchIcon />, color: '#ed6c02' },
  ];

  const handleOpen = (user = null) => {
    setEditing(user);
    setForm(user ? { name: user.name, email: user.email, phone: user.phone || '', website: user.website || '', city: user.city || '' } : { name: '', email: '', phone: '', website: '', city: '' });
    setModalOpen(true);
  };

  const handleClose = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    const ok = editing ? await updateUser(editing.id, form) : await addUser(form);
    if (ok) handleClose();
    setSubmitting(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Header darkMode={isDark} toggleTheme={() => setIsDark(!isDark)} onRefresh={fetchUsers} loading={isLoading} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="xl">
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>Dashboard</Typography>
              <Typography variant="body1" color="text.secondary">Blessing Ese Oga — Junior Full Stack Developer</Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {stats.map((s, i) => <Grid item xs={12} sm={6} md={4} key={i}><StatsCard {...s} /></Grid>)}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Users</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <TextField size="small" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 180 }} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }} />
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add User</Button>
              </Box>
            </Box>

            <UserTable users={users} page={page} rowsPerPage={rowsPerPage} onPageChange={(_, p) => setPage(p)} onRowsChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} onEdit={handleOpen} onDelete={deleteUser} loading={isLoading} />

            <LearningNotes />
          </Container>
        </Box>
        <UserModal open={modalOpen} onClose={handleClose} onSubmit={handleSubmit} data={form} onChange={handleChange} isEditing={!!editing} loading={submitting} />
      </Box>
    </ThemeProvider>
  );
}

export default App;