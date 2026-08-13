export interface Link {
  id: number;
  linkPageId: number;
  title: string;
  url: string;
  icon: string;
  position: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLinkPayload {
  title: string;
  url: string;
  icon?: string;
}

export interface UpdateLinkPayload {
  title?: string;
  url?: string;
  icon?: string;
  position?: number;
}

export interface PublicLink {
  id: number;
  title: string;
  url: string;
  icon: string;
  position: number;
}