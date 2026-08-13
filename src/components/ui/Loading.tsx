import type { ReactNode } from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate/15 ${className}`}
      role="status"
      aria-label="Cargando"
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-24 w-full" />
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate/20 py-12 text-center">
      {icon && <div className="text-orange">{icon}</div>}
      <h3 className="text-lg font-bold text-navy">{title}</h3>
      {description && <p className="max-w-sm text-sm text-slate/60">{description}</p>}
      {action}
    </div>
  );
}