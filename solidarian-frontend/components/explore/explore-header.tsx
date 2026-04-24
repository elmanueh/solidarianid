import { Button } from '@/components/ui/button';
import { ExploreMode } from '@/features/explore/model/explore.types';
import { cn } from '@/lib/utils';

type ExploreHeaderProps = {
  mode: ExploreMode;
  onModeChange: (mode: ExploreMode) => void;
};

export function ExploreHeader({ mode, onModeChange }: Readonly<ExploreHeaderProps>) {
  return (
    <header className="flex flex-col gap-4 px-1 lg:flex-row lg:items-end lg:justify-between lg:px-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl leading-none font-black tracking-tight text-foreground uppercase md:text-5xl">
          Explorar Impacto
        </h2>
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-80 md:text-base">
          Encuentra comunidades y causas cerca de ti
        </p>
      </div>

      <div
        className="grid h-12 w-full grid-cols-2 rounded-[1.6rem] border border-border bg-muted p-1 shadow-xs sm:w-auto sm:min-w-80"
        role="group"
        aria-label="MODO DE EXPLORACIÓN"
      >
        <Button
          type="button"
          variant="ghost"
          className={cn(
            'h-10 cursor-pointer rounded-[1.2rem] px-4 text-[10px] font-black tracking-[0.18em] uppercase transition-all',
            mode === 'communities'
              ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-pressed={mode === 'communities'}
          onClick={() => onModeChange('communities')}
        >
          COMUNIDADES
        </Button>
        <Button
          type="button"
          variant="ghost"
          className={cn(
            'h-10 cursor-pointer rounded-[1.2rem] px-4 text-[10px] font-black tracking-[0.18em] uppercase transition-all',
            mode === 'causes'
              ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-pressed={mode === 'causes'}
          onClick={() => onModeChange('causes')}
        >
          CAUSAS
        </Button>
      </div>
    </header>
  );
}
