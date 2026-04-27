import { Badge, Button } from '@/components/ui';
import { FavoritesBrowseModal } from '@/components/favorites/favorites-browse-modal';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { IconChevronRight } from '@tabler/icons-react';
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

        {error ? (
          <div className="px-1 text-sm font-semibold text-destructive lg:px-2">{error}</div>
        ) : items.length === 0 ? (
          <div className="px-1 text-sm text-muted-foreground lg:px-2">{emptyMessage}</div>
        ) : (
          <div className="relative lg:px-12">
            <Carousel opts={{ align: 'start' }}>
              <CarouselContent className="-ml-6 py-4">
                {previewItems.map((item, index) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-[85%] pl-6 sm:basis-[clamp(280px,45vw,360px)] lg:basis-[clamp(280px,32vw,360px)]"
                  >
                    {renderCard(item, index)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                size="icon-lg"
                className="hidden lg:inline-flex"
                aria-label={`Desplazar ${title.toLowerCase()} a la izquierda`}
              />
              <CarouselNext
                size="icon-lg"
                className="hidden lg:inline-flex"
                aria-label={`Desplazar ${title.toLowerCase()} a la derecha`}
              />
            </Carousel>
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
