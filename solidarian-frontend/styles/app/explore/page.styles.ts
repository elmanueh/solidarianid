export const explorePageStyles = {
  container: 'mx-auto flex w-full max-w-6xl flex-col gap-8 pb-10 lg:gap-10',
  header: {
    wrapper: 'flex flex-col gap-4 px-1 lg:flex-row lg:items-end lg:justify-between lg:px-2',
    textWrapper: 'flex flex-col gap-1',
    title: 'text-3xl leading-none font-black tracking-tight text-foreground uppercase md:text-5xl',
    subtitle: 'text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-80 md:text-base',
    modeToggle: {
      wrapper:
        'grid h-12 w-full grid-cols-2 rounded-[1.6rem] border border-border bg-muted p-1 shadow-xs sm:w-auto sm:min-w-80',
      option: 'h-10 rounded-[1.2rem] px-4 text-[10px] font-black tracking-[0.18em] uppercase transition-all',
      optionActive: 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md',
      optionInactive: 'text-muted-foreground hover:text-foreground',
    },
  },
  results: {
    count: 'px-1 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase lg:px-2',
    grid: 'grid grid-cols-1 gap-6 px-1 md:grid-cols-2 lg:grid-cols-3 lg:px-0',
    empty:
      'flex min-h-60 items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 text-center text-sm font-bold text-muted-foreground',
  },
} as const;
