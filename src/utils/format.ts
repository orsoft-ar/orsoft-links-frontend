export function formatApiMessage(message: string | string[]): string {
  if (Array.isArray(message)) return message.join(' ');
  return message;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Hubo un error inesperado';
}

export function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}