/**
 * Estilos para la página Home
 * Usando colores semánticos de globals.css:
 * - chart-1 para destacadas = naranja
 * - chart-4 para causas = verde
 * - chart-2 para links/comunidades = azul
 */

export const homeStyles = {
  container: 'mx-auto flex max-w-6xl flex-col gap-10 overflow-x-hidden lg:gap-14',

  header: {
    wrapper: 'flex flex-col justify-between gap-6 px-1 py-4 md:flex-row md:items-end lg:px-2',
    titleWrapper: 'flex flex-col gap-1.5',
    title: 'text-3xl leading-none font-black tracking-tight text-foreground md:text-5xl',
    subtitle: 'text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-80 md:text-base',
  },

  section: {
    wrapper: 'flex flex-col gap-6 lg:gap-8',
    headerWrapper: 'flex items-center justify-between px-1 lg:px-2',
    featuredIcon: 'flex h-10 w-10 items-center justify-center rounded-2xl bg-chart-1/10 text-chart-1 shadow-inner',
    causesIcon: 'flex h-10 w-10 items-center justify-center rounded-2xl bg-chart-4/10 text-chart-4 shadow-inner',
    title: 'text-xl font-black tracking-tight text-foreground uppercase md:text-2xl',
    viewAllButton:
      'flex items-center gap-2 rounded-xl border border-chart-2/10 px-4 py-2.5 text-[9px] font-black tracking-[0.25em] text-chart-2 uppercase shadow-sm transition-all hover:bg-chart-2/5',
  },

  communities: {
    grid: 'scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0',
    skeleton: 'h-95 min-w-70 rounded-[40px] lg:min-w-0',
    item: 'snap-center',
  },

  causes: {
    wrapper: 'mb-10 flex flex-col gap-6 lg:gap-8',
    grid: 'grid grid-cols-1 gap-6 px-1 md:grid-cols-2 md:px-0 lg:grid-cols-3 lg:gap-8',
    skeleton: 'h-70 rounded-4xl',
  },

  error: {
    wrapper: 'rounded-3xl border border-border/70 bg-muted/40 px-6 py-5 shadow-sm backdrop-blur-sm',
    title: 'text-sm font-black tracking-wide text-foreground',
    text: 'mt-2 text-sm leading-6 text-muted-foreground',
    link: 'mt-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-xs font-bold tracking-wide text-foreground transition-colors hover:bg-muted',
  },
} as const;
