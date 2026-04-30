import { ODS_OPTIONS, OdsId } from '@/features/causes/constants/ods.constants';
import { cn } from '@/lib/utils';

interface PreferencesOdsProps {
  ods: OdsId[];
  setOds: (ods: OdsId[]) => void;
}

export function PreferencesOds({ ods, setOds }: Readonly<PreferencesOdsProps>) {
  const toggleOds = (odsId: OdsId) => {
    if (ods.includes(odsId)) {
      setOds(ods.filter(selected => selected !== odsId));
      return;
    }

    setOds([...ods, odsId]);
  };

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold tracking-widest text-preferences-muted uppercase">
        Selecciona uno o varios ODS ({ods.length})
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ODS_OPTIONS.map(({ id, label }) => {
          const isSelected = ods.includes(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => toggleOds(id)}
              aria-pressed={isSelected}
              className={cn(
                'flex w-full cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all',
                isSelected
                  ? 'border-success bg-success/10 text-preferences-ink shadow-md shadow-success/20'
                  : 'border-preferences-border bg-preferences-surface text-preferences-muted hover:border-success/40 hover:bg-preferences-panel'
              )}
            >
              <span className="text-[10px] font-black tracking-widest uppercase">{`${id}. ${label}`}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
