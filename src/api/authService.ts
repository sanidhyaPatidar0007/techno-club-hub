
import apiClient from './apiClient';

export const register = async (userData: {
  fullName: string;
  email: string;
  password: string;
  club?: string;
}) => {
  const response = await apiClient.post('/users/register', userData);
  
  // Store token in localStorage
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post('/users/login', credentials);
  
  // Store token in localStorage
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const getProfile = async () => {
  const response = await apiClient.get('/users/profile');
  return response.data;
};

export const updateProfile = async (profileData: any) => {
  const response = await apiClient.put('/users/profile', profileData);
  
  // Update stored user info
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

export const registerForEvent = async (eventId: string) => {
  const response = await apiClient.post('/users/events/register', { eventId });
  return response.data;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};
