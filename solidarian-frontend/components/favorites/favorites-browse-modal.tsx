'use client';

import { Dialog, DialogContent, Input } from '@/components/ui';
import { IconSearch } from '@tabler/icons-react';
import type { ReactNode, RefObject } from 'react';

type FavoritesBrowseModalProps<T extends { id: string }> = {
  open: boolean;
  query: string;
  items: T[];
  visibleItems: T[];
  emptyMessage: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  onQueryChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  renderCard: (item: T, index: number) => ReactNode;
};

export function FavoritesBrowseModal<T extends { id: string }>({
  open,
  query,
  items,
  visibleItems,
  emptyMessage,
  scrollRef,
  onQueryChange,
  onOpenChange,
  renderCard,
}: Readonly<FavoritesBrowseModalProps<T>>) {
  const modalEmptyMessage = query.trim() ? 'No hay resultados para esa búsqueda.' : emptyMessage;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-6xl gap-0 overflow-hidden rounded-4xl border border-border bg-background p-0 shadow-2xl sm:max-w-6xl">
        <div className="border-b border-border py-5 pr-16 pl-6 md:pr-16 md:pl-8">
          <div className="relative">
            <IconSearch size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-chart-2" />
            <Input
              value={query}
              onChange={event => onQueryChange(event.target.value)}
              placeholder="Buscar por nombre"
              className="h-14 rounded-2xl border-chart-2/20 bg-background pr-4 pl-12 text-base shadow-none focus-visible:ring-chart-2/20"
            />
          </div>
        </div>

        <div ref={scrollRef} className="max-h-[60vh] overflow-y-auto px-6 py-6 md:px-8">
          {items.length === 0 ? (
            <div className="flex min-h-60 items-center justify-center text-center text-muted-foreground">
              {modalEmptyMessage}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleItems.map((item, index) => (
                <div key={item.id}>{renderCard(item, index)}</div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
