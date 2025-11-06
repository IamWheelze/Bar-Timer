import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  bundesland: string;
}

export interface Deadline {
  id: string;
  case_name: string;
  case_number?: string;
  court?: string;
  bundesland: string;
  deadline_type: string;
  procedural_code: string;
  event_date: string;
  deadline_date: string;
  status: string;
  notes?: string;
  created_at: string;
}

export interface DeadlineCalculationInput {
  event_date: string;
  duration_value: number;
  duration_unit: 'days' | 'weeks' | 'months' | 'years';
  bundesland: string;
  deadline_type: string;
  procedural_code: string;
}

export const authAPI = {
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const deadlineAPI = {
  calculate: async (input: DeadlineCalculationInput) => {
    const response = await api.post('/deadlines/calculate', input);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/deadlines', data);
    return response.data;
  },

  getAll: async (status?: string): Promise<{ deadlines: Deadline[] }> => {
    const response = await api.get('/deadlines', { params: { status } });
    return response.data;
  },

  getById: async (id: string): Promise<{ deadline: Deadline }> => {
    const response = await api.get(`/deadlines/${id}`);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/deadlines/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/deadlines/${id}`);
    return response.data;
  },

  complete: async (id: string, notes?: string) => {
    const response = await api.post(`/deadlines/${id}/complete`, { notes });
    return response.data;
  },
};

export default api;
