import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const fallbackUsers = [
  { id: 1, name: 'Chioma Okonkwo', email: 'chioma.okonkwo@gmail.com', phone: '+234 803 456 7890', website: 'chioma.dev', city: 'Lagos' },
  { id: 2, name: 'Oluwafemi Adeyemi', email: 'femi.adeyemi@yahoo.com', phone: '+234 902 345 6789', website: 'femi.tech', city: 'Abuja' },
  { id: 3, name: 'Ngozi Eze', email: 'ngozi.eze@outlook.com', phone: '+234 805 234 5678', website: 'ngozi.io', city: 'Port Harcourt' },
];

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=10');
      const data = res.data.map((u, i) => ({
        ...u,
        name: fallbackUsers[i]?.name || u.name,
        phone: fallbackUsers[i]?.phone || u.phone,
        city: fallbackUsers[i]?.city || 'Lagos',
      }));
      setUsers(data);
    } catch {
      setUsers(fallbackUsers);
      setError('Using sample data — API unavailable.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (data) => {
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/users', data);
      const newUser = { ...res.data, id: Date.now(), city: data.city || 'Lagos' };
      setUsers([newUser, ...users]);
      setSuccess('User added!');
      setTimeout(() => setSuccess(''), 3000);
      return true;
    } catch {
      const newUser = { ...data, id: Date.now(), city: data.city || 'Lagos' };
      setUsers([newUser, ...users]);
      setSuccess('User added!');
      setTimeout(() => setSuccess(''), 3000);
      return true;
    }
  };

  const updateUser = async (id, data) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);
      setUsers(users.map((u) => (u.id === id ? { ...u, ...data } : u)));
      setSuccess('User updated!');
      setTimeout(() => setSuccess(''), 3000);
      return true;
    } catch {
      setUsers(users.map((u) => (u.id === id ? { ...u, ...data } : u)));
      setSuccess('User updated!');
      setTimeout(() => setSuccess(''), 3000);
      return true;
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      setSuccess('User deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setUsers(users.filter((u) => u.id !== id));
      setSuccess('User deleted!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const filtered = search.trim()
    ? users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.city?.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  return { users: filtered, isLoading, error, success, search, setSearch, fetchUsers, addUser, updateUser, deleteUser };
}