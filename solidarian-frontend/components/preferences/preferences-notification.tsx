import { cn } from '@/lib/utils';
import { IconBell } from '@tabler/icons-react';

interface PreferencesNotificationProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

export function PreferencesNotification({
  notificationsEnabled,
  setNotificationsEnabled,
}: Readonly<PreferencesNotificationProps>) {
  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="rounded-[48px] border border-preferences-border bg-preferences-panel p-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div
            className={cn(
              'flex h-24 w-24 items-center justify-center rounded-full shadow-inner transition-all duration-500',
              notificationsEnabled ? 'bg-success/10 text-success' : 'bg-preferences-subtle text-preferences-muted'
            )}
          >
            <IconBell size={48} className={cn(notificationsEnabled && 'animate-bounce')} />
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-black tracking-widest text-preferences-ink uppercase">
              Notificaciones Globales
            </h4>
            <p className="max-w-[320px] text-[11px] leading-relaxed font-bold tracking-widest text-preferences-muted uppercase">
              Habilita todas las notificaciones de nuevas comunidades, causas y acciones con un solo interruptor.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            aria-pressed={notificationsEnabled}
            className={cn(
              'flex h-12 w-24 items-center rounded-full p-2 shadow-inner transition-colors duration-500',
              notificationsEnabled ? 'bg-success' : 'bg-preferences-track-off'
            )}
          >
            <span
              className={cn(
                'h-8 w-8 rounded-full bg-white shadow-2xl transition-transform duration-500',
                notificationsEnabled ? 'translate-x-12' : 'translate-x-0'
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
