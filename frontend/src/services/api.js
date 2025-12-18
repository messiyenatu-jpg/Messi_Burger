import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Menu API
export const menuAPI = {
  getAllItems: () => api.get('/menu'),
  getItemsByCategory: (category) => api.get(`/menu/category/${category}`),
  getItemById: (id) => api.get(`/menu/${id}`),
};

// Orders API
export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  updateOrderStatus: (orderId, status) => api.put(`/orders/${orderId}/status`, { status }),
};

export default api;