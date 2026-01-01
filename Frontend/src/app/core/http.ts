import API_CONFIG from '../config/api.config';


/**
 * Centralized HTTP helper
 * - Uses Fetch API
 * - Prepends backend base URL
 * - Automatically attaches JWT if present
 * - Handles JSON responses & errors
 */

console.log('API_CONFIG:', API_CONFIG);

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('access_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(
    `${API_CONFIG.BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (!response.ok) {
    let errorBody: any = {};
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { message: response.statusText };
    }

    throw errorBody;
  }

  return response.json();
}
