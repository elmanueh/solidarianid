'use client';

import type { MouseEvent } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type ExplorePaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  pageSize: number;
};

function buildVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}

export function ExplorePagination({ page, setPage, totalItems, pageSize }: Readonly<ExplorePaginationProps>) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;
  const visiblePages = buildVisiblePages(page, totalPages);

  const handleGoToPrevious = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!isFirstPage) {
      setPage(page - 1);
    }
  };

  const handleGoToNext = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!isLastPage) {
      setPage(page + 1);
    }
  };

  return (
    <Pagination className="pt-2">
      <PaginationContent className="gap-3">
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={handleGoToPrevious}
            aria-disabled={isFirstPage}
            className={cn(
              'size-12 cursor-pointer rounded-2xl border border-border bg-card text-muted-foreground shadow-xs hover:bg-muted',
              isFirstPage ? 'pointer-events-none opacity-50' : undefined
            )}
          >
            <IconChevronLeft size={18} />
          </PaginationLink>
        </PaginationItem>

        {visiblePages.map((visiblePage, index) => {
          if (visiblePage === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`page-${visiblePage}`}>
              <PaginationLink
                href="#"
                size="icon"
                isActive={visiblePage === page}
                className={cn(
                  'size-12 cursor-pointer rounded-2xl border border-border text-[12px] font-black shadow-xs',
                  visiblePage === page
                    ? 'border-sidebar-primary bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                onClick={event => {
                  event.preventDefault();
                  setPage(visiblePage);
                }}
              >
                {visiblePage}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={handleGoToNext}
            aria-disabled={isLastPage}
            className={cn(
              'size-12 cursor-pointer rounded-2xl border border-border bg-card text-sidebar-primary shadow-xs hover:bg-muted',
              isLastPage ? 'pointer-events-none opacity-50' : undefined
            )}
          >
            <IconChevronRight size={18} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
