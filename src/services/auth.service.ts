import api, { normalizeApiError } from './api';
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '@/types/auth';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}