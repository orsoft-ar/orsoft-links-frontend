export interface ApiErrorPayload {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}