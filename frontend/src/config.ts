// Configuración de endpoints del middleware
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const ENDPOINTS = {
  register: '/register',
  login: '/login',
  product: '/products',
  health: '/health'
}

