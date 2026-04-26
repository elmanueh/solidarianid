'use client';

import { CauseCard } from '@/components/cause-card';
import { CommunityCard } from '@/components/community-card';
import { FavoritesBrowseModal } from '@/components/favorites-browse-modal';
import { FavoritesSection } from '@/components/favorites-section';
import { type FavoriteCause, type FavoriteCommunity, useFavoritesData } from '@/hooks/use-favorites-data';
import { useAppSelector } from '@/features/redux/redux-hook';
import { IconHeart, IconUsers } from '@tabler/icons-react';
import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ModalState = {
  query: string;
  visibleCount: number;
  scrollTop: number;
  pageScrollY: number;
};

type ModalSectionKey = 'communities' | 'causes' | null;

const INITIAL_MODAL_STATE: ModalState = {
  query: '',
  visibleCount: 6,
  scrollTop: 0,
  pageScrollY: 0,
};

const CHUNK_SIZE = 6;

const normalizeText = (value: string): string => value.trim().toLocaleLowerCase();

export default function FavoritesPage() {
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);
  const { communitiesState, causesState } = useFavoritesData(currentUserId);
  const [activeModal, setActiveModal] = useState<ModalSectionKey>(null);
  const [modalStates, setModalStates] = useState<Record<'communities' | 'causes', ModalState>>({
    communities: INITIAL_MODAL_STATE,
    causes: INITIAL_MODAL_STATE,
  });
  const communitiesCarouselRef = useRef<HTMLDivElement | null>(null);
  const causesCarouselRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  const activeModalState = activeModal ? modalStates[activeModal] : INITIAL_MODAL_STATE;
  const modalItems = activeModal === 'communities' ? communitiesState.items : causesState.items;
  const filteredModalItems = useMemo(() => {
    const normalizedQuery = normalizeText(activeModalState.query);

    if (!normalizedQuery) {
      return modalItems;
    }

    return modalItems.filter(item => normalizeText(item.name).includes(normalizedQuery));
  }, [activeModalState.query, modalItems]);
  const visibleModalItems = useMemo(
    () => filteredModalItems.slice(0, activeModalState.visibleCount),
    [activeModalState.visibleCount, filteredModalItems]
  );

  useEffect(() => {
    if (!activeModal) {
      return;
    }

    const container = modalScrollRef.current;

    if (!container) {
      return;
    }

    requestAnimationFrame(() => {
      container.scrollTop = modalStates[activeModal].scrollTop;
      window.scrollTo(0, modalStates[activeModal].pageScrollY);
    });
  }, [activeModal, modalStates]);

  useEffect(() => {
    if (!activeModal) {
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

      setModalStates(previous => {
        const currentState = previous[activeModal];
        const nextVisibleCount = Math.min(currentState.visibleCount + CHUNK_SIZE, filteredModalItems.length);

        if (nextVisibleCount === currentState.visibleCount) {
          return previous;
        }

        return {
          ...previous,
          [activeModal]: {
            ...currentState,
            visibleCount: nextVisibleCount,
          },
        };
      });
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeModal, filteredModalItems.length]);

  const updateModalState = useCallback(
    (section: Exclude<ModalSectionKey, null>, updater: (state: ModalState) => ModalState) => {
      setModalStates(previous => ({
        ...previous,
        [section]: updater(previous[section]),
      }));
    },
    []
  );

  const handleOpenModal = useCallback(
    (section: Exclude<ModalSectionKey, null>) => {
      updateModalState(section, state => ({
        ...state,
        visibleCount: Math.max(state.visibleCount, CHUNK_SIZE),
        pageScrollY: window.scrollY,
      }));
      setActiveModal(section);
    },
    [updateModalState]
  );

  const handleCloseModal = useCallback(() => {
    if (!activeModal) {
      return;
    }

    const container = modalScrollRef.current;

    updateModalState(activeModal, state => ({
      ...state,
      scrollTop: container?.scrollTop ?? state.scrollTop,
      pageScrollY: window.scrollY,
    }));
    setActiveModal(null);
  }, [activeModal, updateModalState]);

  const handleSearchChange = useCallback(
    (value: string) => {
      if (!activeModal) {
        return;
      }

      updateModalState(activeModal, state => ({
        ...state,
        query: value,
        visibleCount: CHUNK_SIZE,
        scrollTop: 0,
      }));

      const container = modalScrollRef.current;
      if (container) {
        container.scrollTop = 0;
      }
    },
    [activeModal, updateModalState]
  );

  const scrollCarousel = useCallback((ref: RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    const container = ref.current;

    if (!container) {
      return;
    }

    const offset = Math.max(container.clientWidth * 0.8, 280);
    container.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  }, []);

  const favoritesIntroLoading = !currentUserId || communitiesState.loading || causesState.loading;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 overflow-x-hidden pb-12 lg:gap-14">
      <header className="flex flex-col gap-3 px-1 py-4 lg:px-2">
        <p className="text-xs font-bold tracking-[0.35em] text-muted-foreground uppercase">Panel de impacto</p>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">Mis Favoritos</h1>
          <p className="text-sm font-bold tracking-[0.25em] text-muted-foreground uppercase md:text-base">
            Comunidades y causas que sigues
          </p>
        </div>
      </header>

      <FavoritesSection
        title="Mis Comunidades"
        icon={<IconUsers size={24} />}
        accentClassName="bg-chart-2/10 text-chart-2"
        items={communitiesState.items}
        loading={favoritesIntroLoading && communitiesState.items.length === 0}
        error={communitiesState.error}
        emptyMessage="Todavía no eres miembro de ninguna comunidad."
        carouselRef={communitiesCarouselRef}
        onViewMore={() => handleOpenModal('communities')}
        onScrollLeft={() => scrollCarousel(communitiesCarouselRef, 'left')}
        onScrollRight={() => scrollCarousel(communitiesCarouselRef, 'right')}
        renderCard={(community, index) => <CommunityCard community={community} index={index} />}
      />

      <FavoritesSection
        title="Mis Causas"
        icon={<IconHeart size={24} />}
        accentClassName="bg-chart-5/10 text-chart-5"
        items={causesState.items}
        loading={favoritesIntroLoading && causesState.items.length === 0}
        error={causesState.error}
        emptyMessage="Todavía no sigues ninguna causa."
        carouselRef={causesCarouselRef}
        onViewMore={() => handleOpenModal('causes')}
        onScrollLeft={() => scrollCarousel(causesCarouselRef, 'left')}
        onScrollRight={() => scrollCarousel(causesCarouselRef, 'right')}
        renderCard={(cause, index) => (
          <div className="[&_[data-cause-id]]:hidden">
            <CauseCard cause={cause} index={index} />
          </div>
        )}
      />

      <FavoritesBrowseModal
        open={activeModal !== null}
        section={activeModal}
        query={activeModalState.query}
        items={filteredModalItems}
        visibleItems={visibleModalItems}
        scrollRef={modalScrollRef}
        onQueryChange={handleSearchChange}
        onOpenChange={open => (!open ? handleCloseModal() : undefined)}
        renderCard={(item, index) =>
          activeModal === 'communities' ? (
            <CommunityCard key={item.id} community={item as FavoriteCommunity} index={index} />
          ) : (
            <div key={item.id} className="[&_[data-cause-id]]:hidden">
              <CauseCard cause={item as FavoriteCause} index={index} />
            </div>
          )
        }
      />
    </div>
  );
}
