import axios from 'axios';

const API_BASE_URL = `/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const applianceApi = {
  getAll: () => api.get('/appliances'),
  getById: (id) => api.get(`/appliances/${id}`),
  create: (data) => api.post('/appliances', data),
  update: (id, data) => api.put(`/appliances/${id}`, data),
  delete: (id) => api.delete(`/appliances/${id}`),
};

export const planApi = {
  getAll: () => api.get('/plans'),
  getById: (id) => api.get(`/plans/${id}`),
  create: (data) => api.post('/plans', data),
  update: (id, data) => api.put(`/plans/${id}`, data),
  delete: (id) => api.delete(`/plans/${id}`),
};

export const knowledgeApi = {
  get: () => api.get('/knowledge'),
};

export default api;
