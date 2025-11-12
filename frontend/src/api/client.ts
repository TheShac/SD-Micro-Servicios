import { API_BASE_URL } from '../config'

type Options = RequestInit & { json?: unknown }

async function request<T>(path: string, options: Options = {}): Promise<{ data?: T; error?: string }> {
  const headers: HeadersInit = { 'Accept': 'application/json', ...(options.headers || {}) }
  let body = options.body
  if (options.json !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(options.json)
  }

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers, body })
    const isJson = res.headers.get('content-type')?.includes('application/json')
    const payload = isJson ? await res.json() : undefined

    if (!res.ok) {
      const msg = (payload as any)?.message || `Error ${res.status}`
      return { error: msg }
    }

    return { data: payload as T }
  } catch (e: any) {
    return { error: e?.message || 'Error de red' }
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, json?: unknown) => request<T>(path, { method: 'POST', json }),
}

