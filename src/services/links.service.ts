import api, { normalizeApiError } from './api';
import type { Link } from '@/types/link';
import type { CreateLinkPayload, UpdateLinkPayload } from '@/types/link';

export interface ReorderItem {
  id: number;
  position: number;
}

export async function getMyLinks(): Promise<Link[]> {
  try {
    const { data } = await api.get<Link[]>('/link-pages/me/links');
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function createLink(payload: CreateLinkPayload): Promise<Link> {
  try {
    const { data } = await api.post<Link>('/link-pages/me/links', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function updateLink(id: number, payload: UpdateLinkPayload): Promise<Link> {
  try {
    const { data } = await api.put<Link>(`/link-pages/me/links/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function deleteLink(id: number): Promise<{ deleted: boolean }> {
  try {
    const { data } = await api.delete<{ deleted: boolean }>(
      `/link-pages/me/links/${id}`,
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function updateLinkStatus(
  id: number,
  active: boolean,
): Promise<Link> {
  try {
    const { data } = await api.patch<Link>(
      `/link-pages/me/links/${id}/status`,
      { active },
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function reorderLinks(links: ReorderItem[]): Promise<Link[]> {
  try {
    const { data } = await api.put<Link[]>('/link-pages/me/links/reorder', {
      links,
    });
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}