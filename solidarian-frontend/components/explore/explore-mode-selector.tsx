import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExploreMode } from '@/features/explore/model/explore.types';

type ExploreModesSelectorProps = {
  mode: ExploreMode;
  onModeChange: (mode: ExploreMode) => void;
};

export function ExploreModeSelector({ mode, onModeChange }: Readonly<ExploreModesSelectorProps>) {
  return (
    <Tabs
      value={mode}
      onValueChange={value => {
        if (value === 'communities' || value === 'causes') {
          onModeChange(value);
        }
      }}
      className="w-full sm:w-auto"
    >
      <TabsList className="h-12 w-full rounded-[1.6rem] border border-border shadow-xs sm:min-w-80">
        <TabsTrigger
          value="communities"
          className="rounded-[1.2rem] text-[10px] font-black tracking-[0.18em] uppercase data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground data-active:shadow-md"
        >
          COMUNIDADES
        </TabsTrigger>
        <TabsTrigger
          value="causes"
          className="rounded-[1.2rem] text-[10px] font-black tracking-[0.18em] uppercase data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground data-active:shadow-md"
        >
          CAUSAS
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
