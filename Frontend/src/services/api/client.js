import axios from 'axios'

let accessToken = null
const configuredBase = import.meta.env.VITE_API_BASE_URL || '/api'

export function setAccessToken(token) {
  accessToken = token
}

export const apiClient = axios.create({
  baseURL: configuredBase.replace(/\/+$/, ''),
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

apiClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && accessToken) {
      accessToken = null
      window.dispatchEvent(new Event('footballbooking:unauthorized'))
    }
    return Promise.reject(error)
  },
)

export function getErrorMessage(error, fallback = 'Đã có lỗi xảy ra. Vui lòng thử lại.') {
  if (!error?.response) return 'Không kết nối được máy chủ. Hãy kiểm tra backend và kết nối mạng.'
  const { status, data } = error.response
  if (status === 401) return data?.message || 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
  if (status === 403) return data?.message || 'Bạn không có quyền thực hiện thao tác này.'
  if (status === 409) return data?.message || 'Dữ liệu đang xung đột. Vui lòng kiểm tra và thử lại.'
  if (status >= 500) return data?.message || 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.'
  if (data?.errors) return Object.values(data.errors).join(' · ')
  return data?.message || fallback
}
