import { ExploreModeSelector } from '@/components/explore/explore-mode-selector';
import { SectionHeader } from '@/components/section-header';
import { ExploreMode } from '@/features/explore/model/explore.types';

type ExploreHeaderProps = {
  mode: ExploreMode;
  onModeChange: (mode: ExploreMode) => void;
};

export function ExploreHeader({ mode, onModeChange }: Readonly<ExploreHeaderProps>) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
      <SectionHeader title="Explorar Impacto" subtitle="Encuentra comunidades y causas cerca de ti" />
      <ExploreModeSelector mode={mode} onModeChange={onModeChange} />
    </div>
  );
}
