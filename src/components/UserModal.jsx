import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, CircularProgress } from '@mui/material';

export function UserModal({ open, onClose, onSubmit, data, onChange, isEditing, loading }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Name" name="name" value={data.name} onChange={onChange} required fullWidth size="small" autoFocus />
            <TextField label="Email" name="email" type="email" value={data.email} onChange={onChange} required fullWidth size="small" />
            <TextField label="Phone" name="phone" value={data.phone} onChange={onChange} fullWidth size="small" />
            <TextField label="Website" name="website" value={data.website} onChange={onChange} fullWidth size="small" />
            <TextField label="City" name="city" value={data.city} onChange={onChange} fullWidth size="small" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : (isEditing ? 'Update' : 'Add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}