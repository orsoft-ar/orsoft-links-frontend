import { useState } from 'react';
import { applyConsent, getConsent } from '@/utils/analytics';

export function CookieBanner() {
  const [visible, setVisible] = useState(() => getConsent() === null);

  if (!visible) return null;

  const accept = () => {
    applyConsent('granted');
    setVisible(false);
  };

  const decline = () => {
    applyConsent('denied');
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-navy/10 bg-navy p-4 text-cream shadow-2xl">
        <p className="text-sm leading-relaxed">
          Usamos cookies para medir las visitas y mejorar la experiencia. Necesitamos tu consentimiento
          para activar las analíticas (Google Analytics).
        </p>
        <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={decline}
            className="inline-flex items-center justify-center rounded-xl border border-cream/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Solo lo necesario
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-xl bg-coral px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-coral/30 transition-colors hover:bg-coral/90"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}