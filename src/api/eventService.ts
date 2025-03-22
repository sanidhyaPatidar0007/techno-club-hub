
import apiClient from './apiClient';

export const fetchAllEvents = async () => {
  const response = await apiClient.get('/events');
  return response.data;
};

export const fetchUpcomingEvents = async () => {
  const response = await apiClient.get('/events/upcoming');
  return response.data;
};

export const fetchPastEvents = async () => {
  const response = await apiClient.get('/events/past');
  return response.data;
};

export const fetchEventById = async (id: string) => {
  const response = await apiClient.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData: any) => {
  const response = await apiClient.post('/events', eventData);
  return response.data;
};

export const updateEvent = async (id: string, eventData: any) => {
  const response = await apiClient.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await apiClient.delete(`/events/${id}`);
  return response.data;
};

export const registerForEvent = async (id: string) => {
  const response = await apiClient.post(`/events/${id}/register`);
  return response.data;
};
