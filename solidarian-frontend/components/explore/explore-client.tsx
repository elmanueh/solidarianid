'use client';

import { ExploreControls } from '@/components/explore/explore-controls';
import { ExploreHeader } from '@/components/explore/explore-header';
import { ExplorePagination } from '@/components/explore/explore-pagination';
import { ExploreResultsGrid } from '@/components/explore/explore-results-grid';
import { ExploreService } from '@/features/explore/services/explore.service';
import {
  EXPLORE_DEFAULTS,
  ExploreCauseItem,
  ExploreCommunityItem,
  ExploreMode,
  ExplorePaginatedResult,
  ExploreSort,
} from '@/features/explore/model/explore.types';
import { explorePageStyles } from '@/styles/app/explore/page.styles';
import { useMemo, useState } from 'react';

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

export function ExploreClient() {
  const styles = explorePageStyles;
  const [mode, setMode] = useState<ExploreMode>(EXPLORE_DEFAULTS.mode);
  const [page, setPage] = useState(EXPLORE_DEFAULTS.page);
  const [sort, setSort] = useState<ExploreSort>(EXPLORE_DEFAULTS.sort);
  const [draftSearch, setDraftSearch] = useState(EXPLORE_DEFAULTS.search);
  const [search, setSearch] = useState(EXPLORE_DEFAULTS.search);
  const [selectedOds, setSelectedOds] = useState<string[]>([]);
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

  const communities: ExplorePaginatedResult<ExploreCommunityItem> = useMemo(() => {
    if (mode !== 'communities') {
      return emptyCommunitiesResult;
    }

    return exploreService.getCommunities(query);
  }, [mode, query]);

  const causes: ExplorePaginatedResult<ExploreCauseItem> = useMemo(() => {
    if (mode !== 'causes') {
      return emptyCausesResult;
    }

    return exploreService.getCauses(query);
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

  const handleToggleOds = (ods: string) => {
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
  const currentPageSize = EXPLORE_DEFAULTS.pageSize;
  const hasPagination = currentTotal > currentPageSize;

  return (
    <div className={styles.container}>
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

      <p className={styles.results.count}>Mostrando {currentTotal} resultados totales</p>

      <ExploreResultsGrid mode={mode} communities={communities.items} causes={causes.items} />

      {hasPagination ? (
        <ExplorePagination page={page} setPage={setPage} totalItems={currentTotal} pageSize={currentPageSize} />
      ) : null}
    </div>
  );
}
