import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import type { ReactNode, RefObject } from 'react';

const PREVIEW_SIZE = 4;

type FavoritesSectionProps<T extends { id: string }> = {
  title: string;
  icon: ReactNode;
  accentClassName: string;
  items: T[];
  loading: boolean;
  error: string | null;
  emptyMessage: string;
  carouselRef: RefObject<HTMLDivElement | null>;
  onViewMore: () => void;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  renderCard: (item: T, index: number) => ReactNode;
};

export function FavoritesSection<T extends { id: string }>({
  title,
  icon,
  accentClassName,
  items,
  loading,
  error,
  emptyMessage,
  carouselRef,
  onViewMore,
  onScrollLeft,
  onScrollRight,
  renderCard,
}: Readonly<FavoritesSectionProps<T>>) {
  const previewItems = items.slice(0, PREVIEW_SIZE);

  return (
    <section className="flex flex-col gap-6 lg:gap-8">
      <div className="flex items-center justify-between gap-4 px-1 lg:px-2">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-inner ${accentClassName}`}>
            {icon}
          </div>
          <h2 className="text-2xl font-black tracking-tight text-foreground uppercase md:text-3xl">{title}</h2>
        </div>

        <button
          type="button"
          onClick={onViewMore}
          disabled={items.length === 0 && !loading}
          className="flex cursor-pointer items-center gap-2 rounded-2xl border border-chart-2/10 px-4 py-2.5 text-[10px] font-black tracking-[0.25em] text-chart-2 uppercase shadow-sm transition-all hover:bg-chart-2/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ver más <IconChevronRight size={14} />
        </button>
      </div>

      {loading ? (
        <div className="px-1 text-sm text-muted-foreground lg:px-2">Cargando...</div>
      ) : error ? (
        <div className="px-1 text-sm font-semibold text-destructive lg:px-2">{error}</div>
      ) : items.length === 0 ? (
        <div className="px-1 text-sm text-muted-foreground lg:px-2">{emptyMessage}</div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={onScrollLeft}
            className="absolute top-1/2 left-0 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background shadow-lg transition hover:bg-muted lg:flex"
            aria-label={`Desplazar ${title.toLowerCase()} a la izquierda`}
          >
            <IconChevronLeft size={22} />
          </button>

          <div
            ref={carouselRef}
            className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 py-10 lg:mx-0 lg:px-12 lg:py-12"
          >
            {previewItems.map((item, index) => (
              <div key={item.id} className="min-w-[280px] snap-center md:min-w-[340px] lg:min-w-[360px]">
                {renderCard(item, index)}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onScrollRight}
            className="absolute top-1/2 right-0 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background shadow-lg transition hover:bg-muted lg:flex"
            aria-label={`Desplazar ${title.toLowerCase()} a la derecha`}
          >
            <IconChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}
