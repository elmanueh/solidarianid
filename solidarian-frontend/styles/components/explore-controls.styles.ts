export const exploreControlsStyles = {
  wrapper: 'flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm lg:p-5',
  topRow: 'flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,60%)_minmax(0,40%)] lg:items-stretch',
  searchAndButtonRow: 'flex w-full items-stretch gap-0',
  searchWrapper: 'min-w-0 flex-1',
  searchInputGroup:
    'h-12 rounded-e-none rounded-s-[1.6rem] border-border bg-background shadow-xs ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-chart-2/30 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-chart-2/15',
  searchInputText: 'text-[11px] font-black tracking-[0.1em] text-muted-foreground uppercase',
  searchInput:
    'text-[11px] font-bold tracking-[0.08em] uppercase placeholder:font-bold placeholder:tracking-[0.08em] placeholder:uppercase',
  searchButtonInline:
    'h-12 rounded-s-none rounded-e-[1.6rem] border border-sidebar-primary/20 bg-sidebar-primary px-5 text-[10px] font-black tracking-[0.18em] text-sidebar-primary-foreground uppercase shadow-md shadow-sidebar-primary/20 hover:bg-sidebar-primary/90',
  actionsRow: 'flex flex-wrap items-center gap-2 lg:min-w-0 lg:justify-end',
  sortButton:
    'h-12 min-w-42 rounded-[1.6rem] border border-chart-2/20 bg-chart-2/5 px-4 text-[10px] font-black tracking-[0.18em] uppercase shadow-xs hover:bg-chart-2/10',
  sortAsc: 'text-chart-2',
  sortDesc: 'text-sidebar-primary',
  odsFilter: {
    trigger:
      'h-11 min-w-44 rounded-[1.3rem] border border-border bg-background px-4 text-[10px] font-black tracking-[0.16em] text-muted-foreground uppercase shadow-xs hover:bg-muted',
    triggerInline:
      'h-11 min-w-44 rounded-s-none rounded-e-[1.3rem] border border-chart-2/20 bg-chart-2/5 px-4 text-[10px] font-black tracking-[0.16em] text-chart-2 uppercase shadow-xs hover:bg-chart-2/10',
    triggerActive: 'border-chart-2/20 bg-chart-2/5 text-chart-2',
    compoundWrapper: 'inline-flex items-stretch',
    clearInlineButton:
      'h-11 min-w-32 rounded-e-none rounded-s-[1.3rem] border border-border bg-background px-3 text-[10px] font-black tracking-[0.14em] text-muted-foreground uppercase shadow-xs hover:bg-muted hover:text-foreground',
    popover: 'w-86 rounded-2xl border border-border bg-popover p-3 shadow-md',
    popoverTitle: 'text-[10px] font-black tracking-[0.16em] text-foreground uppercase',
    popoverList: 'mt-2 max-h-64 space-y-1 overflow-auto pr-1',
    popoverItem: 'flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted',
    popoverLabel: 'text-[10px] font-bold tracking-[0.08em] text-foreground uppercase',
  },
  helperText: 'text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase lg:pr-1',
} as const;
