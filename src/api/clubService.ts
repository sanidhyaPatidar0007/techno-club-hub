
import apiClient from './apiClient';

export const fetchAllClubs = async () => {
  const response = await apiClient.get('/clubs');
  return response.data;
};

export const fetchClubById = async (id: string) => {
  const response = await apiClient.get(`/clubs/${id}`);
  return response.data;
};

export const createClub = async (clubData: any) => {
  const response = await apiClient.post('/clubs', clubData);
  return response.data;
};

export const updateClub = async (id: string, clubData: any) => {
  const response = await apiClient.put(`/clubs/${id}`, clubData);
  return response.data;
};

export const deleteClub = async (id: string) => {
  const response = await apiClient.delete(`/clubs/${id}`);
  return response.data;
};

export const addMember = async (clubId: string, userId: string) => {
  const response = await apiClient.post(`/clubs/${clubId}/members`, { userId });
  return response.data;
};

export const removeMember = async (clubId: string, userId: string) => {
  const response = await apiClient.delete(`/clubs/${clubId}/members`, { 
    data: { userId } 
  });
  return response.data;
};
