export const exploreCardStyles = {
  wrapper:
    'group flex h-full flex-col overflow-hidden rounded-[34px] border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-chart-2/30 hover:shadow-lg hover:shadow-chart-2/10',
  image: {
    wrapper: 'relative h-44 overflow-hidden md:h-48',
    img: 'object-cover transition-transform duration-700 group-hover:scale-105',
    typeBadge:
      'absolute top-4 left-4 rounded-full border border-border bg-card/95 px-3 py-1 text-[9px] font-black tracking-[0.18em] text-chart-2 uppercase backdrop-blur-sm',
  },
  content: {
    wrapper: 'flex flex-1 flex-col gap-3 p-6',
    title: 'line-clamp-1 text-xl font-black tracking-tight text-foreground',
    description: 'line-clamp-3 text-[11px] leading-relaxed font-bold tracking-wide text-muted-foreground uppercase',
    metaRow: 'mt-auto flex items-center justify-between border-t border-border pt-3',
    metaBadge:
      'inline-flex items-center rounded-full border border-chart-4/20 bg-chart-4/10 px-3 py-1 text-[9px] font-black tracking-[0.16em] text-chart-4 uppercase',
    metaBadgesWrap: 'flex flex-wrap items-center gap-1.5',
    actionHint: 'text-[10px] font-black tracking-[0.12em] text-chart-2 uppercase',
  },
} as const;
