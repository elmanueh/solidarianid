import { explorePageStyles } from '@/styles/app/explore/page.styles';
import { ExploreMode } from '@/features/explore/model/explore.types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ExploreHeaderProps = {
  mode: ExploreMode;
  onModeChange: (mode: ExploreMode) => void;
};

export function ExploreHeader({ mode, onModeChange }: Readonly<ExploreHeaderProps>) {
  const styles = explorePageStyles;

  return (
    <header className={styles.header.wrapper}>
      <div className={styles.header.textWrapper}>
        <h2 className={styles.header.title}>Explorar Impacto</h2>
        <p className={styles.header.subtitle}>Encuentra comunidades y causas cerca de ti</p>
      </div>

      <div className={styles.header.modeToggle.wrapper} role="group" aria-label="MODO DE EXPLORACIÓN">
        <Button
          type="button"
          variant="ghost"
          className={cn(
            styles.header.modeToggle.option,
            mode === 'communities' ? styles.header.modeToggle.optionActive : styles.header.modeToggle.optionInactive
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
            styles.header.modeToggle.option,
            mode === 'causes' ? styles.header.modeToggle.optionActive : styles.header.modeToggle.optionInactive
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
