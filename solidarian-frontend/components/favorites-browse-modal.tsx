'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Input } from '@/components/ui';
import { IconHeart, IconSearch, IconUsers } from '@tabler/icons-react';
import type { ReactNode, RefObject } from 'react';

type FavoritesBrowseModalProps<T extends { id: string }> = {
  open: boolean;
  section: 'communities' | 'causes' | null;
  query: string;
  items: T[];
  visibleItems: T[];
  scrollRef: RefObject<HTMLDivElement | null>;
  onQueryChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  renderCard: (item: T, index: number) => ReactNode;
};

export function FavoritesBrowseModal<T extends { id: string }>({
  open,
  section,
  query,
  items,
  visibleItems,
  scrollRef,
  onQueryChange,
  onOpenChange,
  renderCard,
}: Readonly<FavoritesBrowseModalProps<T>>) {
  const isCommunities = section === 'communities';
  const title = isCommunities ? 'Todas las Comunidades' : 'Todas las Causas';
  const placeholder = isCommunities ? 'Buscar comunidades...' : 'Buscar causas...';
  const emptyMessage = query.trim()
    ? 'No hay resultados para esa búsqueda.'
    : isCommunities
      ? 'No perteneces a ninguna comunidad.'
      : 'No sigues ninguna causa.';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-6xl gap-0 overflow-hidden rounded-[32px] border border-border bg-background p-0 shadow-2xl sm:max-w-6xl">
        <DialogHeader className="border-b border-border px-6 py-5 md:px-8">
          <DialogTitle className="flex items-center gap-3 text-2xl font-black tracking-tight text-foreground">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                isCommunities ? 'bg-chart-2/10 text-chart-2' : 'bg-chart-5/10 text-chart-5'
              }`}
            >
              {isCommunities ? <IconUsers size={22} /> : <IconHeart size={22} />}
            </span>
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Explorar favoritos con búsqueda por nombre e infinite scroll local.
          </DialogDescription>
        </DialogHeader>

        <div className="border-b border-border px-6 py-5 md:px-8">
          <div className="relative">
            <IconSearch size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-chart-2" />
            <Input
              value={query}
              onChange={event => onQueryChange(event.target.value)}
              placeholder={placeholder}
              className="h-14 rounded-2xl border-chart-2/20 bg-background pr-4 pl-12 text-base shadow-none focus-visible:ring-chart-2/20"
            />
          </div>
        </div>

        <div ref={scrollRef} className="max-h-[60vh] overflow-y-auto px-6 py-6 md:px-8">
          {items.length === 0 ? (
            <div className="flex min-h-60 items-center justify-center text-center text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleItems.map((item, index) => renderCard(item, index))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
