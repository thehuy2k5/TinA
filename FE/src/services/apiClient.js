const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const REQUEST_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 15000)

export const hasApiConfiguration = Boolean(API_BASE_URL)

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) throw new Error('Chưa cấu hình VITE_API_BASE_URL')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
  const token = localStorage.getItem('tina-access-token')
  try {
    const response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
    if (!response.ok) {
      const message = await response.text()
      throw new Error(message || `API trả về lỗi ${response.status}`)
    }
    if (response.status === 204) return null
    return response.json()
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('API phản hồi quá thời gian cho phép')
    throw error
  } finally {
    clearTimeout(timeout)
  }
}

export function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export function unwrapItem(payload) {
  return payload?.data && !Array.isArray(payload.data) ? payload.data : payload
}
