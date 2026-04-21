'use client';

import { Alert, AlertDescription, AlertTitle, Badge, Button, Skeleton } from '@/components/ui';
import { RequestStatus, RequestType } from '@/features/communities/constants/requests.model';
import { ROUTES } from '@/features/routes';
import useUserRequest from '@/hooks/use-user-request';
import { cn } from '@/lib/utils';
import {
  IconAlertCircle,
  IconArrowLeft,
  IconBolt,
  IconBuilding,
  IconCircleCheck,
  IconClock,
  IconFileText,
  IconHeart,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState, type ReactNode } from 'react';

type RequestFilter = 'all' | RequestStatus;

type TypeConfig = {
  label: string;
  icon: ReactNode;
  iconTileClassName: string;
  badgeClassName: string;
};

type StatusConfig = {
  label: string;
  icon: ReactNode;
  badgeClassName: string;
  reasonClassName: string;
  reasonIconClassName: string;
  footerText: string;
  footerTextClassName: string;
};

type FilterCard = {
  value: RequestFilter;
  label: string;
  helper: string;
  count: number;
  icon: ReactNode;
  accentClassName: string;
  activeClassName: string;
  countClassName: string;
};

export default function ProfileSettingsRequestsPage() {
  const [selectedFilter, setSelectedFilter] = useState<RequestFilter>('all');
  const { requests, loading, error } = useUserRequest();

  const stats = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter(request => request.status === RequestStatus.PENDING).length,
      approved: requests.filter(request => request.status === RequestStatus.APPROVED).length,
      rejected: requests.filter(request => request.status === RequestStatus.REJECTED).length,
    }),
    [requests]
  );

  const selectedStatusConfig = selectedFilter === 'all' ? null : getStatusConfig(selectedFilter);

  const filteredRequests = useMemo(() => {
    if (selectedFilter === 'all') {
      return requests;
    }

    return requests.filter(request => request.status === selectedFilter);
  }, [requests, selectedFilter]);

  const filterCards: FilterCard[] = [
    {
      value: 'all',
      label: 'Todas',
      helper: 'Solicitudes en total',
      count: stats.total,
      icon: <IconFileText size={18} />,
      accentClassName: 'bg-brand-ink/10 text-brand-ink',
      activeClassName: 'border-brand-ink bg-brand-ink/5',
      countClassName: 'text-brand-ink dark:text-brand-500',
    },
    {
      value: RequestStatus.PENDING,
      label: 'Pendientes',
      helper: 'En revisión',
      count: stats.pending,
      icon: <IconClock size={18} />,
      accentClassName: 'bg-chart-3/10 text-chart-3',
      activeClassName: 'border-chart-3/30 bg-chart-3/10',
      countClassName: 'text-chart-3',
    },
    {
      value: RequestStatus.APPROVED,
      label: 'Aprobadas',
      helper: 'Validadas',
      count: stats.approved,
      icon: <IconCircleCheck size={18} />,
      accentClassName: 'bg-chart-2/10 text-chart-2',
      activeClassName: 'border-chart-2/30 bg-chart-2/10',
      countClassName: 'text-chart-2',
    },
    {
      value: RequestStatus.REJECTED,
      label: 'Rechazadas',
      helper: 'Con observaciones',
      count: stats.rejected,
      icon: <IconX size={18} />,
      accentClassName: 'bg-destructive/10 text-destructive',
      activeClassName: 'border-destructive/30 bg-destructive/10',
      countClassName: 'text-destructive',
    },
  ];

  const headerSubtitle = loading
    ? 'Cargando tus solicitudes...'
    : stats.total === 0
      ? 'Aún no has enviado ninguna solicitud'
      : selectedFilter === 'all'
        ? `${stats.total} solicitudes registradas`
        : `${filteredRequests.length} solicitudes ${selectedStatusConfig?.label.toLowerCase() ?? ''}`;

  const hasError = Boolean(error);
  const showLoading = loading;
  const showEmptyState = !loading && !hasError && filteredRequests.length === 0;

  return (
    <div className="flex min-h-screen flex-col bg-muted/40 pb-24 text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 px-4 py-6 pt-10 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Button
              variant="ghost"
              size="icon-lg"
              nativeButton={false}
              render={<Link href={ROUTES.app.profile} aria-label="Volver a configuración" />}
              className="size-10 rounded-2xl bg-muted/40 text-muted-foreground shadow-sm transition-all hover:bg-muted hover:text-brand-ink active:scale-95"
            >
              <IconArrowLeft size={20} />
            </Button>

            <div className="min-w-0">
              <p className="text-[10px] font-black tracking-[0.28em] text-muted-foreground uppercase">
                Gestión personal
              </p>
              <h1 className="truncate text-2xl font-black tracking-tight text-brand-ink sm:text-3xl dark:text-foreground">
                Mis solicitudes
              </h1>
              <p className="mt-1 text-xs font-bold tracking-wider text-muted-foreground uppercase">{headerSubtitle}</p>
            </div>
          </div>

          <Button
            variant="default"
            size="icon-lg"
            nativeButton={false}
            render={<Link href={ROUTES.favorites.requestsCreate} aria-label="Crear solicitud" />}
            className="size-12 rounded-2xl bg-brand-500 text-primary-foreground shadow-xl transition-all hover:shadow-2xl active:scale-95"
          >
            <IconPlus size={24} />
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        {showLoading ? (
          <RequestLoadingGrid />
        ) : (
          <RequestFilterGrid cards={filterCards} onSelect={setSelectedFilter} selectedFilter={selectedFilter} />
        )}

        {hasError ? (
          <Alert variant="destructive" className="rounded-4xl border-destructive/20 bg-destructive/5 shadow-sm">
            <IconAlertCircle className="text-destructive" size={20} />
            <AlertTitle className="text-sm font-black tracking-tight text-destructive">
              No se pudieron cargar las solicitudes
            </AlertTitle>
            <AlertDescription className="text-xs leading-relaxed text-muted-foreground">
              Intenta recargar la página o vuelve a entrar en unos segundos.
            </AlertDescription>
          </Alert>
        ) : null}

        {showLoading ? (
          <RequestListLoading />
        ) : showEmptyState ? (
          <EmptyRequestsState selectedFilter={selectedFilter} onClearFilter={() => setSelectedFilter('all')} />
        ) : !hasError ? (
          <section aria-label="Listado de solicitudes" className="grid gap-4">
            <div className="flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2">
                <IconFileText size={16} className="text-muted-foreground/70" />
                <h2 className="text-[10px] font-black tracking-[0.28em] text-muted-foreground uppercase">
                  {selectedFilter === 'all'
                    ? 'Solicitudes recientes'
                    : `Solicitudes ${selectedStatusConfig?.label.toLowerCase() ?? ''}`}
                </h2>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                {filteredRequests.length} resultado{filteredRequests.length === 1 ? '' : 's'}
              </span>
            </div>

            <ul className="grid gap-4">
              {filteredRequests.map((request, index) => {
                const statusConfig = getStatusConfig(request.status);
                const typeConfig = getRequestTypeConfig(request.type);

                return (
                  <motion.li
                    key={request.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="rounded-4xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-border/80 hover:shadow-xl hover:shadow-brand-500/5"
                  >
                    <article className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-3">
                          <div
                            className={cn(
                              'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                              typeConfig.iconTileClassName
                            )}
                          >
                            {typeConfig.icon}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant="outline"
                                className={cn(
                                  'h-7 px-3 text-[10px] font-black tracking-[0.24em] uppercase',
                                  typeConfig.badgeClassName
                                )}
                              >
                                {typeConfig.label}
                              </Badge>
                              <span className="text-[10px] font-black tracking-[0.24em] text-muted-foreground uppercase">
                                Solicitud
                              </span>
                            </div>

                            <h3 className="mt-2 text-base font-black tracking-tight text-brand-ink sm:text-lg dark:text-foreground">
                              {request.name}
                            </h3>

                            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                              {request.description}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className={cn(
                            'h-7 shrink-0 gap-1.5 px-3 text-[10px] font-black tracking-[0.24em] uppercase',
                            statusConfig.badgeClassName
                          )}
                        >
                          {statusConfig.icon}
                          {statusConfig.label}
                        </Badge>
                      </div>

                      {request.reason ? (
                        <div className={cn('mt-4 flex gap-3 rounded-2xl border p-4', statusConfig.reasonClassName)}>
                          <IconAlertCircle
                            size={16}
                            className={cn('mt-0.5 shrink-0', statusConfig.reasonIconClassName)}
                          />
                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                'mb-1 text-[10px] font-black tracking-[0.24em] uppercase',
                                statusConfig.reasonIconClassName
                              )}
                            >
                              {request.status === RequestStatus.REJECTED ? 'Motivo del rechazo' : 'Observación'}
                            </p>
                            <p className="text-xs leading-relaxed text-muted-foreground">{request.reason}</p>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.24em] text-muted-foreground uppercase">
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </div>
                        <span className={cn('text-xs font-semibold', statusConfig.footerTextClassName)}>
                          {statusConfig.footerText}
                        </span>
                      </div>
                    </article>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function RequestFilterGrid({
  cards,
  onSelect,
  selectedFilter,
}: {
  cards: FilterCard[];
  onSelect: (filter: RequestFilter) => void;
  selectedFilter: RequestFilter;
}) {
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
              'group flex min-h-32 flex-col justify-between rounded-2xl border-2 p-3 text-left transition-all hover:-translate-y-0.5',
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

function RequestLoadingGrid() {
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

function RequestListLoading() {
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

function EmptyRequestsState({
  selectedFilter,
  onClearFilter,
}: {
  selectedFilter: RequestFilter;
  onClearFilter: () => void;
}) {
  const selectedStatusConfig = selectedFilter === 'all' ? null : getStatusConfig(selectedFilter);

  const title =
    selectedFilter === 'all'
      ? 'Todavía no tienes solicitudes'
      : `No hay solicitudes ${selectedStatusConfig?.label.toLowerCase() ?? ''}`;

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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {selectedFilter !== 'all' ? (
          <Button
            type="button"
            variant="outline"
            onClick={onClearFilter}
            className="rounded-2xl border-border bg-card text-brand-ink hover:bg-muted hover:text-brand-ink"
          >
            Ver todas
          </Button>
        ) : null}

        <Button
          variant="default"
          nativeButton={false}
          render={<Link href={ROUTES.favorites.requestsCreate} />}
          className="h-12 gap-2 rounded-2xl bg-brand-500 px-6 text-[10px] font-black tracking-[0.22em] text-primary-foreground uppercase shadow-xl transition-all hover:shadow-2xl active:scale-95"
        >
          <IconPlus size={18} />
          Crear solicitud
        </Button>
      </div>
    </section>
  );
}

function getRequestTypeConfig(type: RequestType): TypeConfig {
  switch (type) {
    case RequestType.COMMUNITY:
      return {
        label: 'Comunidad',
        icon: <IconBuilding size={18} />,
        iconTileClassName: 'bg-brand-500/10 text-brand-500',
        badgeClassName: 'border-brand-500/20 bg-brand-500/10 text-brand-500',
      };
    case RequestType.CAUSE:
      return {
        label: 'Causa',
        icon: <IconHeart size={18} />,
        iconTileClassName: 'bg-chart-5/10 text-chart-5',
        badgeClassName: 'border-chart-5/20 bg-chart-5/10 text-chart-5',
      };
    case RequestType.ACTION:
      return {
        label: 'Acción',
        icon: <IconBolt size={18} />,
        iconTileClassName: 'bg-chart-2/10 text-chart-2',
        badgeClassName: 'border-chart-2/20 bg-chart-2/10 text-chart-2',
      };
    default: {
      const exhaustiveCheck: never = type;
      return exhaustiveCheck;
    }
  }
}

function getStatusConfig(status: RequestStatus): StatusConfig {
  switch (status) {
    case RequestStatus.PENDING:
      return {
        label: 'En revisión',
        icon: <IconClock size={16} />,
        badgeClassName: 'border-chart-3/20 bg-chart-3/10 text-chart-3',
        reasonClassName: 'border-border bg-muted/40',
        reasonIconClassName: 'text-muted-foreground',
        footerText: 'Esperando validación del equipo',
        footerTextClassName: 'text-chart-3',
      };
    case RequestStatus.APPROVED:
      return {
        label: 'Aprobadas',
        icon: <IconCircleCheck size={16} />,
        badgeClassName: 'border-chart-2/20 bg-chart-2/10 text-chart-2',
        reasonClassName: 'border-border bg-muted/40',
        reasonIconClassName: 'text-muted-foreground',
        footerText: 'Validada por el equipo',
        footerTextClassName: 'text-chart-2',
      };
    case RequestStatus.REJECTED:
      return {
        label: 'Rechazadas',
        icon: <IconX size={16} />,
        badgeClassName: 'border-destructive/20 bg-destructive/10 text-destructive',
        reasonClassName: 'border-destructive/20 bg-destructive/10',
        reasonIconClassName: 'text-destructive',
        footerText: 'Requiere una nueva versión',
        footerTextClassName: 'text-destructive',
      };
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}
