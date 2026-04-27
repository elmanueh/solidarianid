'use client';
import { cn } from '@/lib/utils';
import { IconBell } from '@tabler/icons-react';

interface PreferencesNotificationProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  disabled?: boolean;
}

export function PreferencesNotification({
  notificationsEnabled,
  setNotificationsEnabled,
  disabled = false,
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
            onClick={() => {
              if (disabled) {
                return;
              }

              setNotificationsEnabled(!notificationsEnabled);
            }}
            aria-pressed={notificationsEnabled}
            disabled={disabled}
            className={cn(
              'flex h-12 w-24 cursor-pointer items-center rounded-full p-2 shadow-inner transition-colors duration-500',
              notificationsEnabled ? 'bg-success' : 'bg-preferences-track-off',
              disabled && 'cursor-not-allowed opacity-60'
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
