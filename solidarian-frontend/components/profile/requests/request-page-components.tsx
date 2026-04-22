import { IconFileText, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Button, Skeleton } from '@/components/ui';
import { RequestStatus } from '@/features/communities/constants/requests.model';
import { ROUTES } from '@/features/routes';
import { cn } from '@/lib/utils';

export type RequestFilter = 'all' | RequestStatus;

export type FilterCard = {
  value: RequestFilter;
  label: string;
  helper: string;
  count: number;
  icon: ReactNode;
  accentClassName: string;
  activeClassName: string;
  countClassName: string;
};

type RequestFilterGridProps = {
  cards: FilterCard[];
  onSelect: (filter: RequestFilter) => void;
  selectedFilter: RequestFilter;
};

type EmptyRequestsStateProps = {
  selectedFilter: RequestFilter;
  selectedStatusLabel?: string;
  onClearFilter: () => void;
};

export function RequestFilterGrid({ cards, onSelect, selectedFilter }: RequestFilterGridProps) {
  return (
    <section aria-label="Filtros de solicitudes" className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map(card => {
        const isSelected = selectedFilter === card.value;

        return (
          <button
            key={card.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(card.value)}
            className={cn(
              'group flex min-h-32 cursor-pointer flex-col justify-between rounded-2xl border-2 p-3 text-left transition-all hover:-translate-y-0.5',
              isSelected ? card.activeClassName : 'border-border bg-card'
            )}
          >
            <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">{card.label}</span>

            <div className="mt-6 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <span className={cn('block text-xl font-black tracking-tight sm:text-2xl', card.countClassName)}>
                  {card.count}
                </span>
                <span className="mt-1 block text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                  {card.helper}
                </span>
              </div>

              <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl', card.accentClassName)}>
                {card.icon}
              </div>
            </div>
          </button>
        );
      })}
    </section>
  );
}

export function RequestLoadingGrid() {
  return (
    <section aria-label="Cargando filtros de solicitudes" className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`request-filter-skeleton-${index}`}
          className="rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          <Skeleton className="h-3 w-24 rounded-full" />

          <div className="mt-8 flex items-end justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-3 w-28 rounded-full" />
            </div>
            <Skeleton className="h-10 w-10 rounded-2xl" />
          </div>
        </div>
      ))}
    </section>
  );
}

export function RequestListLoading() {
  return (
    <section aria-label="Cargando solicitudes" className="grid gap-4">
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <IconFileText size={16} className="text-muted-foreground/70" />
          <Skeleton className="h-3 w-40 rounded-full" />
        </div>
        <Skeleton className="h-3 w-16 rounded-full" />
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <RequestCardSkeleton key={`request-card-skeleton-${index}`} />
        ))}
      </div>
    </section>
  );
}

function RequestCardSkeleton() {
  return (
    <div className="rounded-4xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Skeleton className="h-11 w-11 shrink-0 rounded-2xl" />

          <div className="min-w-0 flex-1">
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="mt-3 h-5 w-2/3 rounded-full" />
            <Skeleton className="mt-3 h-4 w-full rounded-full" />
            <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-7 w-24 shrink-0 rounded-full" />
      </div>

      <div className="mt-4 flex gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
        <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-3 w-32 rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-4/5 rounded-full" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-3 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function EmptyRequestsState({ selectedFilter, selectedStatusLabel, onClearFilter }: EmptyRequestsStateProps) {
  const hasStatusLabel = Boolean(selectedStatusLabel?.trim());
  const title =
    selectedFilter === 'all'
      ? 'Todavía no tienes solicitudes'
      : `No hay solicitudes${hasStatusLabel ? ` ${selectedStatusLabel?.trim()}` : ''}`;

  const description =
    selectedFilter === 'all'
      ? 'Cuando envíes una solicitud de comunidad, causa o acción, la verás aquí con su estado de revisión.'
      : 'Prueba con otro filtro o vuelve a ver todas las solicitudes.';

  return (
    <section className="flex flex-col items-center justify-center rounded-4xl border border-border bg-card px-6 py-16 text-center shadow-sm">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground/20 shadow-inner">
        <IconFileText size={40} />
      </div>

      <h2 className="mt-6 text-xl font-extrabold tracking-tight text-brand-ink dark:text-foreground">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed font-medium text-muted-foreground">{description}</p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        {selectedFilter !== 'all' ? (
          <Button
            type="button"
            variant="outline"
            onClick={onClearFilter}
            className="h-12 w-full rounded-2xl border-border bg-card px-5 text-brand-ink hover:bg-muted hover:text-brand-ink sm:w-auto"
          >
            Ver todas
          </Button>
        ) : null}

        <Button
          variant="default"
          nativeButton={false}
          render={<Link href={ROUTES.favorites.requestsCreate} />}
          className="h-12 w-full justify-center gap-2 rounded-2xl bg-brand-500 px-6 text-xs font-black tracking-[0.18em] text-primary-foreground uppercase shadow-xl transition-all hover:shadow-2xl active:scale-95 sm:w-auto sm:text-[10px] sm:tracking-[0.22em]"
        >
          <IconPlus size={18} />
          Crear solicitud
        </Button>
      </div>
    </section>
  );
}
