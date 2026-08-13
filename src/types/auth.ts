export interface AuthUser {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}