export const LINK_ICONS = [
  { value: 'globe', label: 'Globe' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'mail', label: 'Email' },
  { value: 'link', label: 'Link' },
  { value: 'store', label: 'Tienda' },
] as const;

export type LinkIconValue = (typeof LINK_ICONS)[number]['value'];