import api, { normalizeApiError } from './api';
import type { PublicLinkPage } from '@/types/linkPage';

export async function getPublicPage(username: string): Promise<PublicLinkPage> {
  try {
    const { data } = await api.get<PublicLinkPage>(
      `/public/links/${encodeURIComponent(username)}`,
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}