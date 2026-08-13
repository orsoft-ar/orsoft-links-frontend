import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError, ApiErrorPayload } from '@/types/apiError';
import { getToken } from '@/utils/token';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const url = error.config?.url ?? '';
      const isAuthCall = url.includes('/auth/login') || url.includes('/auth/register');
      if (!isAuthCall && getToken()) {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }
    return Promise.reject(error);
  },
);

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorPayload>;
    const data = axiosError.response?.data;
    const message = data
      ? Array.isArray(data.message)
        ? data.message.join(' ')
        : data.message
      : axiosError.message || 'Error de conexión con el servidor';
    return new ApiError(axiosError.response?.status ?? 0, message);
  }
  return new ApiError(0, 'Hubo un error inesperado');
}

export default api;