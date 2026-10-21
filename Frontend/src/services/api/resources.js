import { apiClient } from './client.js'

const unwrap = (request) => request.then((response) => response.data.data)
const query = (params) => Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value != null))

export const authApi = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (payload) => unwrap(apiClient.post('/auth/register', payload)),
}

export const fieldsApi = {
  list: (params = {}) => unwrap(apiClient.get('/fields', { params: query(params) })),
  owner: (params = {}) => unwrap(apiClient.get('/owner/fields', { params })),
  detail: (id) => unwrap(apiClient.get(`/fields/${id}`)),
  types: () => unwrap(apiClient.get('/field-types')),
  create: (payload) => unwrap(apiClient.post('/owner/fields', payload)),
  update: (id, payload) => unwrap(apiClient.put(`/owner/fields/${id}`, payload)),
  remove: (id) => unwrap(apiClient.delete(`/owner/fields/${id}`)),
}

export const bookingsApi = {
  mine: (params = {}) => unwrap(apiClient.get('/bookings/my', { params })),
  detail: (id) => unwrap(apiClient.get(`/bookings/${id}`)),
  owner: (params = {}) => unwrap(apiClient.get('/owner/bookings', { params })),
  create: (payload) => unwrap(apiClient.post('/bookings', payload)),
  cancel: (id) => unwrap(apiClient.post(`/bookings/${id}/cancel`)),
  confirm: (id) => unwrap(apiClient.post(`/owner/bookings/${id}/confirm`)),
  reject: (id) => unwrap(apiClient.post(`/owner/bookings/${id}/reject`)),
}

export const usersApi = {
  me: () => unwrap(apiClient.get('/users/me')),
  updateMe: (payload) => unwrap(apiClient.put('/users/me', payload)),
}

export const reviewsApi = {
  field: (id, params = {}) => unwrap(apiClient.get(`/fields/${id}/reviews`, { params })),
  create: (payload) => unwrap(apiClient.post('/reviews', payload)),
}

export const adminApi = {
  statistics: () => unwrap(apiClient.get('/admin/statistics')),
  users: (params = {}) => unwrap(apiClient.get('/admin/users', { params })),
  owners: (params = {}) => unwrap(apiClient.get('/admin/owners', { params })),
  fields: (params = {}) => unwrap(apiClient.get('/admin/fields', { params })),
  bookings: (params = {}) => unwrap(apiClient.get('/admin/bookings', { params })),
  updateUserStatus: (id, status) => unwrap(apiClient.put(`/admin/users/${id}/status`, { status })),
  updateFieldStatus: (id, status) => unwrap(apiClient.put(`/admin/fields/${id}/status`, { status })),
}
