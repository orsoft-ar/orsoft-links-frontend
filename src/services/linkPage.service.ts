import api, { normalizeApiError } from './api';
import type {
  CreateLinkPagePayload,
  LinkPage,
  LinkPageWithLinks,
  UpdateLinkPagePayload,
} from '@/types/linkPage';

export async function getMyPage(): Promise<LinkPageWithLinks> {
  try {
    const { data } = await api.get<LinkPageWithLinks>('/link-pages/me');
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function createPage(payload: CreateLinkPagePayload): Promise<LinkPageWithLinks> {
  try {
    const { data } = await api.post<LinkPageWithLinks>('/link-pages', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function updatePage(payload: UpdateLinkPagePayload): Promise<LinkPage> {
  try {
    const { data } = await api.put<LinkPage>('/link-pages/me', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function deletePage(): Promise<{ deleted: boolean }> {
  try {
    const { data } = await api.delete<{ deleted: boolean }>('/link-pages/me');
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}