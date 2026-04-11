/**
 * Estilos para CommunityCard
 * Usando colores semánticos de globals.css (chart-2 para comunidades = azul)
 */

export const communityCardStyles = {
  wrapper:
    'group flex min-w-70 flex-col overflow-hidden rounded-[40px] border border-border bg-card shadow-lg dark:shadow-2xl transition-all hover:border-chart-2/30 hover:shadow-xl hover:shadow-chart-2/10 dark:hover:shadow-chart-2/20 active:scale-95 lg:min-w-0',

  image: {
    wrapper: 'relative h-48 overflow-hidden md:h-56',
    img: 'object-cover transition-transform duration-1000 group-hover:scale-110',
    badge:
      'absolute top-4 left-4 flex items-center gap-2 rounded-2xl border border-border bg-card/95 px-4 py-2 shadow-sm backdrop-blur-md',
    icon: 'text-chart-2',
    text: 'text-[10px] font-black tracking-wider text-foreground uppercase',
  },

  content: {
    wrapper: 'flex flex-col gap-3 p-8',
    title:
      'line-clamp-1 text-lg font-black tracking-tight text-foreground transition-colors group-hover:text-chart-2 lg:text-xl',
    description:
      'line-clamp-2 text-xs leading-relaxed font-bold tracking-wide text-muted-foreground uppercase opacity-80',
  },
} as const;
