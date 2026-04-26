import { Button } from '@/components/ui';
import { FavoritesBrowseModal } from '@/components/favorites/favorites-browse-modal';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const PREVIEW_SIZE = 4;
const CHUNK_SIZE = 6;

type ModalState = {
  query: string;
  visibleCount: number;
  scrollTop: number;
  pageScrollY: number;
};

const INITIAL_MODAL_STATE: ModalState = {
  query: '',
  visibleCount: CHUNK_SIZE,
  scrollTop: 0,
  pageScrollY: 0,
};

const normalizeText = (value: string): string => value.trim().toLocaleLowerCase();

type FavoritesSectionProps<T extends { id: string; name: string }> = {
  title: string;
  icon: ReactNode;
  accentClassName: string;
  items: T[];
  loading: boolean;
  error: string | null;
  emptyMessage: string;
  renderCard: (item: T, index: number) => ReactNode;
};

type CarouselItemProps = {
  children: ReactNode;
};

function CarouselItem({ children }: Readonly<CarouselItemProps>) {
  return (
    <div className="w-full max-w-[360px] min-w-[260px] shrink-0 basis-[85%] snap-center sm:basis-[clamp(280px,45vw,360px)] lg:basis-[clamp(280px,32vw,360px)]">
      {children}
    </div>
  );
}

export function FavoritesSection<T extends { id: string; name: string }>({
  title,
  icon,
  accentClassName,
  items,
  loading,
  error,
  emptyMessage,
  renderCard,
}: Readonly<FavoritesSectionProps<T>>) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(INITIAL_MODAL_STATE);
  const previewItems = items.slice(0, PREVIEW_SIZE);
  const filteredModalItems = useMemo(() => {
    const normalizedQuery = normalizeText(modalState.query);

    if (!normalizedQuery) {
      return items;
    }

    return items.filter(item => normalizeText(item.name).includes(normalizedQuery));
  }, [items, modalState.query]);
  const visibleModalItems = useMemo(
    () => filteredModalItems.slice(0, modalState.visibleCount),
    [filteredModalItems, modalState.visibleCount]
  );
  const viewMoreDisabled = items.length === 0 && !loading;
  const carouselNavButtonClassName =
    'absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-background shadow-lg transition hover:bg-muted lg:inline-flex';

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const container = modalScrollRef.current;

    if (!container) {
      return;
    }

    requestAnimationFrame(() => {
      container.scrollTop = modalState.scrollTop;
      window.scrollTo(0, modalState.pageScrollY);
    });
  }, [isModalOpen, modalState.pageScrollY, modalState.scrollTop]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const container = modalScrollRef.current;

    if (!container) {
      return;
    }

    const handleScroll = () => {
      const nearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 80;

      if (!nearBottom) {
        return;
      }

      setModalState(previous => {
        const nextVisibleCount = Math.min(previous.visibleCount + CHUNK_SIZE, filteredModalItems.length);

        if (nextVisibleCount === previous.visibleCount) {
          return previous;
        }

        return {
          ...previous,
          visibleCount: nextVisibleCount,
        };
      });
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [filteredModalItems.length, isModalOpen]);

  const handleViewMore = useCallback(() => {
    setModalState(previous => ({
      ...previous,
      visibleCount: Math.max(previous.visibleCount, CHUNK_SIZE),
      pageScrollY: window.scrollY,
    }));
    setIsModalOpen(true);
  }, []);

  const handleModalOpenChange = useCallback((open: boolean) => {
    if (open) {
      setIsModalOpen(true);
      return;
    }

    const container = modalScrollRef.current;

    setModalState(previous => ({
      ...previous,
      scrollTop: container?.scrollTop ?? previous.scrollTop,
      pageScrollY: window.scrollY,
    }));
    setIsModalOpen(false);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setModalState(previous => ({
      ...previous,
      query: value,
      visibleCount: CHUNK_SIZE,
      scrollTop: 0,
    }));

    const container = modalScrollRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, []);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const container = carouselRef.current;

    if (!container) {
      return;
    }

    const offset = Math.max(container.clientWidth * 0.8, 280);
    container.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  }, []);

  return (
    <>
      <section className="flex flex-col gap-6 lg:gap-8">
        <div className="flex items-center justify-between gap-4 px-1 lg:px-2">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-inner ${accentClassName}`}>
              {icon}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-foreground uppercase md:text-3xl">{title}</h2>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleViewMore}
            disabled={viewMoreDisabled}
            className="rounded-2xl border-chart-2/10 px-4 text-[10px] font-black tracking-[0.25em] text-chart-2 uppercase shadow-sm hover:bg-chart-2/5 hover:text-chart-2 disabled:opacity-40"
          >
            Ver más <IconChevronRight size={14} />
          </Button>
        </div>

        {loading ? (
          <div className="px-1 text-sm text-muted-foreground lg:px-2">Cargando...</div>
        ) : error ? (
          <div className="px-1 text-sm font-semibold text-destructive lg:px-2">{error}</div>
        ) : items.length === 0 ? (
          <div className="px-1 text-sm text-muted-foreground lg:px-2">{emptyMessage}</div>
        ) : (
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              onClick={() => scrollCarousel('left')}
              className={`${carouselNavButtonClassName} left-0`}
              aria-label={`Desplazar ${title.toLowerCase()} a la izquierda`}
            >
              <IconChevronLeft size={22} />
            </Button>

            <div
              ref={carouselRef}
              className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 py-4 lg:mx-0 lg:px-12 lg:py-12"
            >
              {previewItems.map((item, index) => (
                <CarouselItem key={item.id}>{renderCard(item, index)}</CarouselItem>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              onClick={() => scrollCarousel('right')}
              className={`${carouselNavButtonClassName} right-0`}
              aria-label={`Desplazar ${title.toLowerCase()} a la derecha`}
            >
              <IconChevronRight size={22} />
            </Button>
          </div>
        )}
      </section>

      <FavoritesBrowseModal
        open={isModalOpen}
        query={modalState.query}
        items={filteredModalItems}
        visibleItems={visibleModalItems}
        emptyMessage={emptyMessage}
        scrollRef={modalScrollRef}
        onQueryChange={handleSearchChange}
        onOpenChange={handleModalOpenChange}
        renderCard={renderCard}
      />
    </>
  );
}
