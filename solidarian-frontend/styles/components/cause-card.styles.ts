/**
 * Estilos para CauseCard
 * Usando colores semánticos de globals.css:
 * - chart-4 para causas = verde
 * - chart-5 para favoritos = naranja/rosa
 */

export const causeCardStyles = {
  wrapper:
    'group flex flex-col gap-4 overflow-hidden rounded-4xl border border-border bg-card p-5 shadow-sm dark:shadow-md transition-all hover:border-chart-4/40 hover:shadow-xl hover:shadow-muted/50 dark:hover:shadow-black/20 active:scale-98',

  link: 'flex w-full flex-col gap-4',

  image: {
    wrapper: 'relative h-40 w-full shrink-0 overflow-hidden rounded-3xl border border-border shadow-sm',
    img: 'object-cover transition-transform duration-1000 group-hover:scale-110',
    badgeWrapper: 'absolute bottom-3 left-3 flex items-center gap-2',
    badge:
      'rounded-xl bg-chart-4 px-3 py-1.5 text-[9px] font-black tracking-widest text-primary-foreground uppercase shadow-lg shadow-chart-4/30',
  },

  content: {
    wrapper: 'flex flex-1 flex-col gap-2 px-1',
    title:
      'line-clamp-1 text-base leading-tight font-black tracking-tight text-foreground transition-colors group-hover:text-chart-4',
    footer: 'flex items-center justify-between',
    location: {
      wrapper: 'flex items-center gap-1.5 font-black text-muted-foreground',
      icon: 'text-chart-4',
      text: 'text-[10px] tracking-widest uppercase',
    },
  },

  favoriteButton: {
    base: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-sm transition-all active:scale-90',
    active: 'border-chart-5/20 bg-chart-5/10 text-chart-5',
    inactive: 'border-border bg-muted text-muted-foreground hover:bg-chart-5/10 hover:text-chart-5',
  },
} as const;
