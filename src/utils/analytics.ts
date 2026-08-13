const GA_ID = 'G-HV14RVT6L3';
const CONSENT_KEY = 'linkorsoft-analytics-consent';

type ConsentValue = 'granted' | 'denied';

function gtag(...args: unknown[]): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).dataLayer?.push(args);
}

function hasScript(): boolean {
  return document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`) !== null;
}

function loadScript(): void {
  if (hasScript()) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function getConsent(): ConsentValue | null {
  const raw = localStorage.getItem(CONSENT_KEY);
  return raw === 'granted' || raw === 'denied' ? raw : null;
}

export function applyConsent(value: ConsentValue): void {
  localStorage.setItem(CONSENT_KEY, value);

  if (value === 'granted') {
    delete (window as unknown as Record<string, unknown>)['ga-disable-' + GA_ID];
    loadScript();
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
    gtag('config', GA_ID);
  } else {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }
}

export function initAnalytics(): void {
  const consent = getConsent();
  if (consent === null) return;
  applyConsent(consent);
}