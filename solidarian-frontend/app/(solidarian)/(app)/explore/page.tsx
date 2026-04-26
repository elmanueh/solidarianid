'use client';

import { ExploreControls } from '@/components/explore/explore-controls';
import { ExploreFloatingActionButton } from '@/components/explore/explore-floating-action-button';
import { ExploreHeader } from '@/components/explore/explore-header';
import { ExplorePagination } from '@/components/explore/explore-pagination';
import { ExploreResultsGrid } from '@/components/explore/explore-results-grid';
import { Skeleton } from '@/components/ui/skeleton';
import {
  EXPLORE_DEFAULTS,
  ExploreCauseItem,
  ExploreCommunityItem,
  ExploreMode,
  ExplorePaginatedResult,
  ExploreSort,
} from '@/features/explore/model/explore.types';
import { ExploreService } from '@/features/explore/services/explore.service';
import { IconAlertTriangle, IconLoader } from '@tabler/icons-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { OdsId } from '@/features/causes/constants/ods.constants';

const exploreService = new ExploreService();

const emptyCommunitiesResult: ExplorePaginatedResult<ExploreCommunityItem> = {
  items: [],
  total: 0,
  page: EXPLORE_DEFAULTS.page,
  pageSize: EXPLORE_DEFAULTS.pageSize,
  totalPages: 1,
};

const emptyCausesResult: ExplorePaginatedResult<ExploreCauseItem> = {
  items: [],
  total: 0,
  page: EXPLORE_DEFAULTS.page,
  pageSize: EXPLORE_DEFAULTS.pageSize,
  totalPages: 1,
};
export default function ExplorePage() {
  const [mode, setMode] = useState<ExploreMode>(EXPLORE_DEFAULTS.mode);
  const [page, setPage] = useState(EXPLORE_DEFAULTS.page);
  const [sort, setSort] = useState<ExploreSort>(EXPLORE_DEFAULTS.sort);
  const [draftSearch, setDraftSearch] = useState(EXPLORE_DEFAULTS.search);
  const [search, setSearch] = useState(EXPLORE_DEFAULTS.search);
  const [selectedOds, setSelectedOds] = useState<OdsId[]>([]);
  const [communities, setCommunities] = useState<ExplorePaginatedResult<ExploreCommunityItem>>(emptyCommunitiesResult);
  const [causes, setCauses] = useState<ExplorePaginatedResult<ExploreCauseItem>>(emptyCausesResult);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const latestRequestId = useRef(0);

  const query = useMemo(
    () => ({
      page,
      pageSize: EXPLORE_DEFAULTS.pageSize,
      search,
      sort,
      ods: mode === 'causes' ? selectedOds : [],
    }),
    [mode, page, search, sort, selectedOds]
  );

  useEffect(() => {
    let cancelled = false;
    const requestId = latestRequestId.current + 1;
    latestRequestId.current = requestId;

    const loadExploreData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (mode === 'communities') {
          const result = await exploreService.getCommunities(query);

          if (cancelled || latestRequestId.current !== requestId) {
            return;
          }

          setCommunities(result);
          return;
        }

        const result = await exploreService.getCauses(query);

        if (cancelled || latestRequestId.current !== requestId) {
          return;
        }

        setCauses(result);
      } catch (loadError) {
        if (cancelled || latestRequestId.current !== requestId) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el contenido de explore.');

        if (mode === 'communities') {
          setCommunities(emptyCommunitiesResult);
          return;
        }

        setCauses(emptyCausesResult);
      } finally {
        if (!cancelled && latestRequestId.current === requestId) {
          setLoading(false);
        }
      }
    };

    void loadExploreData();

    return () => {
      cancelled = true;
    };
  }, [mode, query]);

  const handleModeChange = (nextMode: ExploreMode) => {
    if (nextMode === mode) {
      return;
    }

    setMode(nextMode);
    setPage(EXPLORE_DEFAULTS.page);

    if (nextMode === 'communities') {
      setSelectedOds([]);
    }
  };

  const handleToggleSort = () => {
    setSort(currentSort => (currentSort === 'name_asc' ? 'name_desc' : 'name_asc'));
    setPage(EXPLORE_DEFAULTS.page);
  };

  const handleSearchCommit = () => {
    const normalizedDraft = draftSearch.trim();
    if (normalizedDraft === search) {
      return;
    }

    setSearch(normalizedDraft);
    setPage(EXPLORE_DEFAULTS.page);
  };

  const handleToggleOds = (ods: OdsId) => {
    setSelectedOds(current => {
      const exists = current.includes(ods);
      const next = exists ? current.filter(item => item !== ods) : [...current, ods];
      return next;
    });
    setPage(EXPLORE_DEFAULTS.page);
  };

  const handleClearOds = () => {
    if (selectedOds.length === 0) {
      return;
    }

    setSelectedOds([]);
    setPage(EXPLORE_DEFAULTS.page);
  };

  const currentTotal = useMemo(
    () => (mode === 'communities' ? communities.total : causes.total),
    [mode, communities, causes]
  );
  const displayedTotal = loading || error ? 0 : currentTotal;
  const currentPageSize = EXPLORE_DEFAULTS.pageSize;
  const hasPagination = !loading && !error && currentTotal > currentPageSize;

  const renderLoadingState = () => (
    <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card px-6 text-center text-sm font-bold text-muted-foreground">
      <IconLoader size={22} className="animate-spin" />
      <p>Cargando resultados...</p>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: currentPageSize }).map((_, index) => (
          <Skeleton key={`explore-skeleton-${index}`} className="h-80 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card px-6 text-center text-sm font-bold text-muted-foreground">
      <IconAlertTriangle size={22} className="text-destructive" />
      <p>{error}</p>
    </div>
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 pb-10 lg:gap-10">
      <ExploreHeader mode={mode} onModeChange={handleModeChange} />

      <ExploreControls
        mode={mode}
        draftSearch={draftSearch}
        sort={sort}
        selectedOds={selectedOds}
        onDraftSearchChange={setDraftSearch}
        onSearchCommit={handleSearchCommit}
        onToggleSort={handleToggleSort}
        onToggleOds={handleToggleOds}
        onClearOds={handleClearOds}
      />

      <p className="px-1 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase lg:px-2">
        Mostrando {displayedTotal} resultados totales
      </p>

      <div className={!hasPagination ? 'pb-6' : undefined}>
        {loading ? (
          renderLoadingState()
        ) : error ? (
          renderErrorState()
        ) : (
          <ExploreResultsGrid mode={mode} communities={communities.items} causes={causes.items} />
        )}
      </div>

      {hasPagination ? (
        <ExplorePagination page={page} setPage={setPage} totalItems={currentTotal} pageSize={currentPageSize} />
      ) : null}

      <ExploreFloatingActionButton />
    </div>
  );
}
