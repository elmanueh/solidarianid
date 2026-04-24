import { cn } from '@/lib/utils';

export const DURATION_OPTIONS = {
  short_term: {
    label: 'Menos de 30 días',
    helper: 'Ideal para micro-voluntariado',
  },
  medium_term: {
    label: 'Entre 60 y 120 días',
    helper: 'Compromiso equilibrado para generar impacto',
  },
  long_term: {
    label: 'Más de 120 días',
    helper: 'Participacion a largo plazo para un impacto profundo',
  },
  any: {
    label: 'Cualquier duración',
    helper: 'Abierto a todas las oportunidades',
  },
} as const;

export type DurationKey = keyof typeof DURATION_OPTIONS;

interface PreferencesDurationProps {
  durations: DurationKey[];
  setDurations: (durations: DurationKey[]) => void;
}

const durationEntries = Object.entries(DURATION_OPTIONS) as [DurationKey, (typeof DURATION_OPTIONS)[DurationKey]][];

export function PreferencesDuration({ durations, setDurations }: Readonly<PreferencesDurationProps>) {
  const toggleCategory = (durationKey: DurationKey) => {
    if (durations.includes(durationKey)) {
      setDurations(durations.filter(selected => selected !== durationKey));
      return;
    }
    setDurations([...durations, durationKey]);
  };

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold tracking-widest text-preferences-muted uppercase">
        Selecciona la disponibilidad que mejor te representa
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {durationEntries.map(([durationKey, option]) => {
          const isSelected = durations.includes(durationKey);

          return (
            <button
              key={durationKey}
              type="button"
              onClick={() => toggleCategory(durationKey)}
              aria-pressed={isSelected}
              className={cn(
                'w-full cursor-pointer rounded-2xl border px-4 py-4 text-left transition-all',
                isSelected
                  ? 'border-warning bg-warning/10 text-preferences-ink shadow-md shadow-warning/20'
                  : 'border-preferences-border bg-preferences-surface text-preferences-muted hover:border-warning/40 hover:bg-preferences-panel'
              )}
            >
              <p className="text-[10px] font-black tracking-widest uppercase">{option.label}</p>
              <p className="mt-2 text-[10px] font-semibold tracking-wide text-preferences-muted uppercase">
                {option.helper}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
