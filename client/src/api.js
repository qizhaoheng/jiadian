import axios from 'axios';

const API_HOST = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const API_BASE_URL = `http://${API_HOST}:3001/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getIdentifier = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('identifier') || '';
};

export const applianceApi = {
  getAll: () => api.get('/appliances', { params: { identifier: getIdentifier() } }),
  getById: (id) => api.get(`/appliances/${id}`, { params: { identifier: getIdentifier() } }),
  create: (data) => api.post('/appliances', { identifier: getIdentifier(), appliance: data }),
  update: (id, data) => api.put(`/appliances/${id}`, { identifier: getIdentifier(), appliance: data }),
  delete: (id) => api.delete(`/appliances/${id}`, { params: { identifier: getIdentifier() } }),
};

export const planApi = {
  getAll: () => api.get('/plans', { params: { identifier: getIdentifier() } }),
  getById: (id) => api.get(`/plans/${id}`, { params: { identifier: getIdentifier() } }),
  create: (data) => api.post('/plans', { identifier: getIdentifier(), plan: data }),
  update: (id, data) => api.put(`/plans/${id}`, { identifier: getIdentifier(), plan: data }),
  delete: (id) => api.delete(`/plans/${id}`, { params: { identifier: getIdentifier() } }),
};

export const knowledgeApi = {
  get: () => api.get('/knowledge', { params: { identifier: getIdentifier() } }),
};

export const loginApi = {
  login: (identifier) => api.post('/login', { identifier }),
};

export default api;
