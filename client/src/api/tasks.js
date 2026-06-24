import API from './axios';

export const fetchAllTasks = (search = '', status = 'All') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (status && status !== 'All') params.append('status', status);
  return API.get(`/tasks?${params.toString()}`);
};
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const fetchTalents = () => API.get('/users/talents');
