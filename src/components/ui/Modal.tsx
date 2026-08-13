import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[90vh] w-full flex-col rounded-t-2xl bg-cream p-5 shadow-2xl ring-1 ring-slate/10 sm:max-h-[80vh] sm:max-w-lg sm:rounded-2xl sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-slate/60 transition-colors hover:bg-navy/10 hover:text-slate"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pb-4">{children}</div>
        {footer && <div className="flex justify-end gap-3 pt-1">{footer}</div>}
      </div>
    </div>
  );
}