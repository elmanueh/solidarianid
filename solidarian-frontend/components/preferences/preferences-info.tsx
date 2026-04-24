import { IconChevronRight } from '@tabler/icons-react';

export function PreferencesInfo() {
  return (
    <div className="mt-4 flex items-start gap-4 rounded-4xl border border-neutral-400 bg-neutral-50 p-6 dark:bg-blue-950">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-preferences-primary/10 text-preferences-primary">
        <IconChevronRight size={20} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-black tracking-widest text-preferences-ink uppercase">
          ¿Por qué configurar esto?
        </span>
        <p className="text-[10px] leading-relaxed font-bold tracking-wider text-neutral-400 uppercase">
          Personalizamos tu feed de causas y comunidades para que veas primero lo que realmente resuena contigo y tus
          valores.
        </p>
      </div>
    </div>
  );
}
