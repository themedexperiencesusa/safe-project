import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/password', passwordData),
};

// Dashboard API
export const dashboardAPI = {
  index: () => api.get('/dashboard'),
  concierge: () => api.get('/dashboard/concierge'),
  marketing: () => api.get('/dashboard/marketing'),
};

// Concierge API
export const conciergeAPI = {
  // Leads
  leads: {
    index: (params) => api.get('/concierge/leads', { params }),
    store: (data) => api.post('/concierge/leads', data),
    show: (id) => api.get(`/concierge/leads/${id}`),
    update: (id, data) => api.put(`/concierge/leads/${id}`, data),
    destroy: (id) => api.delete(`/concierge/leads/${id}`),
    qualify: (id, data) => api.post(`/concierge/leads/${id}/qualify`, data),
    scheduleDiscoveryCall: (id, data) => api.post(`/concierge/leads/${id}/schedule-discovery-call`, data),
    convertToClient: (id, data) => api.post(`/concierge/leads/${id}/convert-to-client`, data),
    addTag: (id, data) => api.post(`/concierge/leads/${id}/tags`, data),
    removeTag: (id, data) => api.delete(`/concierge/leads/${id}/tags`, { data }),
    dashboard: () => api.get('/concierge/leads/dashboard/stats'),
  },

  // Clients
  clients: {
    index: (params) => api.get('/concierge/clients', { params }),
    store: (data) => api.post('/concierge/clients', data),
    show: (id) => api.get(`/concierge/clients/${id}`),
    update: (id, data) => api.put(`/concierge/clients/${id}`, data),
    destroy: (id) => api.delete(`/concierge/clients/${id}`),
    packages: (id) => api.get(`/concierge/clients/${id}/packages`),
    itineraries: (id) => api.get(`/concierge/clients/${id}/itineraries`),
    transactions: (id) => api.get(`/concierge/clients/${id}/transactions`),
    feedback: (id) => api.get(`/concierge/clients/${id}/feedback`),
    loyaltyPoints: (id) => api.get(`/concierge/clients/${id}/loyalty-points`),
    referrals: (id) => api.get(`/concierge/clients/${id}/referrals`),
  },

  // Discovery Calls
  discoveryCalls: {
    index: (params) => api.get('/concierge/discovery-calls', { params }),
    store: (data) => api.post('/concierge/discovery-calls', data),
    show: (id) => api.get(`/concierge/discovery-calls/${id}`),
    update: (id, data) => api.put(`/concierge/discovery-calls/${id}`, data),
    destroy: (id) => api.delete(`/concierge/discovery-calls/${id}`),
    complete: (id, data) => api.post(`/concierge/discovery-calls/${id}/complete`, data),
    reschedule: (id, data) => api.post(`/concierge/discovery-calls/${id}/reschedule`, data),
    cancel: (id, data) => api.post(`/concierge/discovery-calls/${id}/cancel`, data),
  },

  // Itineraries
  itineraries: {
    index: (params) => api.get('/concierge/itineraries', { params }),
    store: (data) => api.post('/concierge/itineraries', data),
    show: (id) => api.get(`/concierge/itineraries/${id}`),
    update: (id, data) => api.put(`/concierge/itineraries/${id}`, data),
    destroy: (id) => api.delete(`/concierge/itineraries/${id}`),
    bookings: (id) => api.get(`/concierge/itineraries/${id}/bookings`),
    addBooking: (id, data) => api.post(`/concierge/itineraries/${id}/bookings`, data),
  },

  // Vendors
  vendors: {
    index: (params) => api.get('/concierge/vendors', { params }),
    store: (data) => api.post('/concierge/vendors', data),
    show: (id) => api.get(`/concierge/vendors/${id}`),
    update: (id, data) => api.put(`/concierge/vendors/${id}`, data),
    destroy: (id) => api.delete(`/concierge/vendors/${id}`),
    bookings: (id) => api.get(`/concierge/vendors/${id}/bookings`),
    availability: (id) => api.get(`/concierge/vendors/${id}/availability`),
  },

  // Packages
  packages: {
    index: (params) => api.get('/concierge/packages', { params }),
    store: (data) => api.post('/concierge/packages', data),
    show: (id) => api.get(`/concierge/packages/${id}`),
    update: (id, data) => api.put(`/concierge/packages/${id}`, data),
    destroy: (id) => api.delete(`/concierge/packages/${id}`),
  },

  // Transactions
  transactions: {
    index: (params) => api.get('/concierge/transactions', { params }),
    store: (data) => api.post('/concierge/transactions', data),
    show: (id) => api.get(`/concierge/transactions/${id}`),
    update: (id, data) => api.put(`/concierge/transactions/${id}`, data),
  },

  // Feedback
  feedback: {
    index: (params) => api.get('/concierge/feedback', { params }),
    store: (data) => api.post('/concierge/feedback', data),
    show: (id) => api.get(`/concierge/feedback/${id}`),
    update: (id, data) => api.put(`/concierge/feedback/${id}`, data),
  },

  // Referrals
  referrals: {
    index: (params) => api.get('/concierge/referrals', { params }),
    store: (data) => api.post('/concierge/referrals', data),
    show: (id) => api.get(`/concierge/referrals/${id}`),
    update: (id, data) => api.put(`/concierge/referrals/${id}`, data),
  },
};

// Marketing API
export const marketingAPI = {
  // Prospects
  prospects: {
    index: (params) => api.get('/marketing/prospects', { params }),
    store: (data) => api.post('/marketing/prospects', data),
    show: (id) => api.get(`/marketing/prospects/${id}`),
    update: (id, data) => api.put(`/marketing/prospects/${id}`, data),
    destroy: (id) => api.delete(`/marketing/prospects/${id}`),
    qualify: (id, data) => api.post(`/marketing/prospects/${id}/qualify`, data),
    convert: (id, data) => api.post(`/marketing/prospects/${id}/convert`, data),
  },

  // Campaigns
  campaigns: {
    index: (params) => api.get('/marketing/campaigns', { params }),
    store: (data) => api.post('/marketing/campaigns', data),
    show: (id) => api.get(`/marketing/campaigns/${id}`),
    update: (id, data) => api.put(`/marketing/campaigns/${id}`, data),
    destroy: (id) => api.delete(`/marketing/campaigns/${id}`),
    activate: (id) => api.post(`/marketing/campaigns/${id}/activate`),
    pause: (id) => api.post(`/marketing/campaigns/${id}/pause`),
    performance: (id) => api.get(`/marketing/campaigns/${id}/performance`),
  },

  // Creative Assets
  creativeAssets: {
    index: (params) => api.get('/marketing/creative-assets', { params }),
    store: (data) => api.post('/marketing/creative-assets', data),
    show: (id) => api.get(`/marketing/creative-assets/${id}`),
    update: (id, data) => api.put(`/marketing/creative-assets/${id}`, data),
    destroy: (id) => api.delete(`/marketing/creative-assets/${id}`),
    upload: (id, data) => api.post(`/marketing/creative-assets/${id}/upload`, data),
  },

  // Media Spend
  mediaSpend: {
    index: (params) => api.get('/marketing/media-spend', { params }),
    store: (data) => api.post('/marketing/media-spend', data),
    show: (id) => api.get(`/marketing/media-spend/${id}`),
    update: (id, data) => api.put(`/marketing/media-spend/${id}`, data),
    destroy: (id) => api.delete(`/marketing/media-spend/${id}`),
  },

  // Performance Reports
  performanceReports: {
    index: (params) => api.get('/marketing/performance-reports', { params }),
    store: (data) => api.post('/marketing/performance-reports', data),
    show: (id) => api.get(`/marketing/performance-reports/${id}`),
    update: (id, data) => api.put(`/marketing/performance-reports/${id}`, data),
    destroy: (id) => api.delete(`/marketing/performance-reports/${id}`),
    generate: (id) => api.post(`/marketing/performance-reports/${id}/generate`),
  },

  // Proposals
  proposals: {
    index: (params) => api.get('/marketing/proposals', { params }),
    store: (data) => api.post('/marketing/proposals', data),
    show: (id) => api.get(`/marketing/proposals/${id}`),
    update: (id, data) => api.put(`/marketing/proposals/${id}`, data),
    destroy: (id) => api.delete(`/marketing/proposals/${id}`),
    send: (id) => api.post(`/marketing/proposals/${id}/send`),
    accept: (id) => api.post(`/marketing/proposals/${id}/accept`),
    reject: (id, data) => api.post(`/marketing/proposals/${id}/reject`, data),
  },

  // Case Studies
  caseStudies: {
    index: (params) => api.get('/marketing/case-studies', { params }),
    store: (data) => api.post('/marketing/case-studies', data),
    show: (id) => api.get(`/marketing/case-studies/${id}`),
    update: (id, data) => api.put(`/marketing/case-studies/${id}`, data),
    destroy: (id) => api.delete(`/marketing/case-studies/${id}`),
    publish: (id) => api.post(`/marketing/case-studies/${id}/publish`),
  },

  // Retainer Contracts
  retainerContracts: {
    index: (params) => api.get('/marketing/retainer-contracts', { params }),
    store: (data) => api.post('/marketing/retainer-contracts', data),
    show: (id) => api.get(`/marketing/retainer-contracts/${id}`),
    update: (id, data) => api.put(`/marketing/retainer-contracts/${id}`, data),
    destroy: (id) => api.delete(`/marketing/retainer-contracts/${id}`),
    sign: (id) => api.post(`/marketing/retainer-contracts/${id}/sign`),
  },
};

// Admin API
export const adminAPI = {
  // Users
  users: {
    index: (params) => api.get('/users', { params }),
    store: (data) => api.post('/users', data),
    show: (id) => api.get(`/users/${id}`),
    update: (id, data) => api.put(`/users/${id}`, data),
    destroy: (id) => api.delete(`/users/${id}`),
    activate: (id) => api.post(`/users/${id}/activate`),
    suspend: (id) => api.post(`/users/${id}/suspend`),
  },

  // Reports
  reports: {
    concierge: (params) => api.get('/reports/concierge', { params }),
    marketing: (params) => api.get('/reports/marketing', { params }),
    financial: (params) => api.get('/reports/financial', { params }),
    performance: (params) => api.get('/reports/performance', { params }),
  },
};

export default api; 