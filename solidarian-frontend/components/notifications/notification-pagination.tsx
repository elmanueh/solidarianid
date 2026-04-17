'use client';
import type { MouseEvent } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type NotificationPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
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

export function NotificationPagination({
  page,
  setPage,
  totalItems,
  pageSize,
  isFirstPage,
  isLastPage,
}: NotificationPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
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
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text="Atrás"
            href="#"
            onClick={handleGoToPrevious}
            aria-disabled={isFirstPage}
            className={isFirstPage ? 'pointer-events-none opacity-50' : undefined}
          />
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
                isActive={visiblePage === page}
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
          <PaginationNext
            href="#"
            text="Siguiente"
            onClick={handleGoToNext}
            aria-disabled={isLastPage}
            className={isLastPage ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
