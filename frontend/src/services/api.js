import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    return api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
};

export const batches = {
  getMyBatches: () => api.get('/batches/my'),
  getBatch: (id) => api.get(`/batches/${id}`),
  create: (data) => api.post('/batches', data),
  submitDecision: (id, decision) => api.put(`/batches/${id}/decision?decision=${decision}`),
};

export const engine = {
  getRecommendation: (batchId) => api.get(`/engine/recommend/${batchId}`),
  generateRecommendation: (batchId) => api.post(`/engine/recommend/${batchId}`)
};

export default api;
