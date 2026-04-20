import { cn } from '@/lib/utils';

export enum CauseKey {
  POVERTY = 'pobreza',
  FOOD = 'alimentación',
  EDUCATION = 'educación',
  HEALTH = 'salud',
  ENVIRONMENT = 'medio ambiente',
  WATER = 'agua potable',
  HUMANITARIAN_AID = 'ayuda humanitaria',
  COMMUNITY_DEVELOPMENT = 'desarrollo comunitario',
  HUMAN_RIGHTS = 'derechos humanos',
  CHILDREN_YOUTH = 'infancia',
  ELDERLY = 'tercera edad',
  GENDER_EQUALITY = 'igualdad de género',
  HOUSING = 'vivienda',
  REFUGEES = 'refugiados',
  DISABILITY = 'discapacidad',
  SUSTAINABLE_DEVELOPMENT = 'desarrollo sostenible',
  EMPLOYMENT = 'empleo',
  CULTURE = 'cultura',
  TECH_INNOVATION = 'tecnología',
}

interface PreferencesCategoryProps {
  categories: CauseKey[];
  setCategories: (categories: CauseKey[]) => void;
}

const categoryEntries = Object.values(CauseKey);

export function PreferencesCategory({ categories, setCategories }: Readonly<PreferencesCategoryProps>) {
  const toggleCategory = (causeCategory: CauseKey) => {
    if (categories.includes(causeCategory)) {
      setCategories(categories.filter(selected => selected !== causeCategory));
      return;
    }

    setCategories([...categories, causeCategory]);
  };

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold tracking-widest text-preferences-muted uppercase">
        Selecciona una o varias categorías ({categories.length})
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categoryEntries.map((categoryValue, index) => {
          const isSelected = categories.includes(categoryValue);

          return (
            <button
              key={categoryValue}
              type="button"
              onClick={() => toggleCategory(categoryValue)}
              aria-pressed={isSelected}
              className={cn(
                'flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all',
                isSelected
                  ? 'border-preferences-primary bg-preferences-primary/10 text-preferences-ink shadow-md shadow-preferences-primary/20'
                  : 'border-preferences-border bg-preferences-surface text-preferences-muted hover:border-preferences-primary/40 hover:bg-preferences-panel'
              )}
            >
              <span className="text-[10px] font-black tracking-widest uppercase">{`${index + 1}. ${categoryValue}`}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
