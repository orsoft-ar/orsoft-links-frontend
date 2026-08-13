import type { Link } from './link';

export interface LinkPage {
  id: number;
  userId: number;
  username: string;
  title: string;
  description: string | null;
  profileImageUrl: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LinkPageWithLinks extends LinkPage {
  links: Link[];
}

export interface CreateLinkPagePayload {
  username: string;
  title: string;
  description?: string;
  profileImageUrl?: string;
  isPublic?: boolean;
}

export interface UpdateLinkPagePayload {
  username?: string;
  title?: string;
  description?: string;
  profileImageUrl?: string;
  isPublic?: boolean;
}

export interface PublicLinkPage {
  username: string;
  title: string;
  description: string | null;
  profileImageUrl: string | null;
  links: PublicPageLink[];
}

export interface PublicPageLink {
  id: number;
  title: string;
  url: string;
  icon: string;
  position: number;
}