'use client';

import { PreferencesCardHeader } from '@/components/preferences/preferences-card-header';
import { type DurationKey, PreferencesDuration } from '@/components/preferences/preferences-duration';
import { OdsId } from '@/features/causes/constants/ods.constants';
import { setPreferences } from '@/features/preferences/api/preferences';
import { useAppSelector } from '@/features/redux/redux-hook';
import { ROUTES } from '@/features/routes';
import { usePwa } from '@/hooks/pwa/use-pwa';
import { defineStepper } from '@stepperize/react';
import {
  IconBell,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconLayoutGrid,
  IconTarget,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { PreferencesButton } from './preferences-button';
import { type CauseKey, PreferencesCategory } from './preferences-category';
import { PreferencesNotification } from './preferences-notification';
import { PreferencesOds } from './preferences-ods';

type StepId = 'category' | 'duration' | 'ods' | 'notifications';

const { useStepper } = defineStepper(
  {
    id: 'category',
    title: 'Categorías',
    description: '¿Qué causas te interesan más?',
    icon: <IconLayoutGrid size={18} />,
  },
  {
    id: 'duration',
    title: 'Duración',
    description: '¿Cuánto tiempo quieres dedicar?',
    icon: <IconCalendar size={18} />,
  },
  {
    id: 'ods',
    title: 'Ods Preferidos',
    description: 'Objetivos de Desarrollo Sostenible',
    icon: <IconTarget size={18} />,
  },
  {
    id: 'notifications',
    title: 'Notificaciones',
    description: 'Alertas de Impacto Social',
    icon: <IconBell size={18} />,
  }
);

export function PreferencesStepper() {
  const stepper = useStepper();
  const stepOrder: StepId[] = ['category', 'duration', 'ods', 'notifications'];
  const currentId = stepper.state.current.data.id as StepId;
  const currentStepIndex = stepOrder.indexOf(currentId);
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const router = useRouter();
  const pwa = usePwa();

  const [formPreferences, setFormPreferences] = useState<{
    preferredCategories: CauseKey[];
    preferredSDGs: OdsId[];
    durationPreferences: DurationKey[];
    notificationsEnabled: boolean;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const preferences = useMemo(
    () =>
      formPreferences ?? {
        preferredCategories: currentUser?.preferences.preferredCategories || [],
        preferredSDGs: currentUser?.preferences.preferredSDGs || [],
        durationPreferences: currentUser?.preferences.durationPreferences || [],
        notificationsEnabled: currentUser?.preferences.notificationsEnabled ?? true,
      },
    [currentUser, formPreferences]
  );

  const handleSavePreferences = async () => {
    if (isSaving) {
      return;
    }

    if (!currentUser) {
      toast.error('No se pudo guardar tus preferencias', {
        description: 'Usuario no autenticado.',
      });
      return;
    }

    const initialNotificationsEnabled = currentUser.preferences.notificationsEnabled ?? true;

    try {
      setIsSaving(true);

      if (preferences.notificationsEnabled !== initialNotificationsEnabled) {
        if (preferences.notificationsEnabled) {
          const permission = pwa.permission === 'granted' ? pwa.permission : await pwa.requestNotificationPermission();

          if (permission !== 'granted') {
            throw new Error('Debes permitir las notificaciones para activarlas.');
          }

          await pwa.subscribe();
        } else {
          await pwa.unsubscribe();
        }
      }

      await setPreferences(
        {
          preferredCategories: preferences.preferredCategories,
          durationPreferences: preferences.durationPreferences,
          preferredSDGs: preferences.preferredSDGs,
          notificationsEnabled: preferences.notificationsEnabled,
        },
        currentUser!.id
      );

      toast.success('Preferencias guardadas correctamente.');
      router.push(ROUTES.app.profile);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ocurrio un error inesperado.';

      toast.error('No se pudieron guardar tus preferencias', {
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="flex items-center justify-center gap-3">
        {stepOrder.map((stepId, i) => (
          <div
            key={stepId}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === currentStepIndex
                ? 'w-8 bg-preferences-primary'
                : i < currentStepIndex
                  ? 'w-2 bg-success'
                  : 'w-2 bg-preferences-border'
            }`}
          />
        ))}
      </div>

      <div className="rounded-[40px] border border-preferences-border bg-preferences-surface p-8 shadow-xl md:p-10">
        <PreferencesCardHeader stepper={stepper} currentId={currentId} />

        <div>
          {stepper.flow.switch({
            category: () => (
              <PreferencesCategory
                categories={preferences.preferredCategories}
                setCategories={preferredCategories =>
                  setFormPreferences(current => ({
                    ...(current ?? preferences),
                    preferredCategories,
                  }))
                }
              />
            ),
            duration: () => (
              <PreferencesDuration
                durations={preferences.durationPreferences}
                setDurations={durationPreferences =>
                  setFormPreferences(current => ({
                    ...(current ?? preferences),
                    durationPreferences,
                  }))
                }
              />
            ),
            ods: () => (
              <PreferencesOds
                ods={preferences.preferredSDGs}
                setOds={preferredSDGs =>
                  setFormPreferences(current => ({
                    ...(current ?? preferences),
                    preferredSDGs,
                  }))
                }
              />
            ),
            notifications: () => (
              <PreferencesNotification
                notificationsEnabled={preferences.notificationsEnabled}
                setNotificationsEnabled={notificationsEnabled =>
                  setFormPreferences(current => ({
                    ...(current ?? preferences),
                    notificationsEnabled,
                  }))
                }
                disabled={isSaving}
              />
            ),
          })}
        </div>

        <hr className="my-10 border-preferences-border" />

        <div className="flex items-center justify-between">
          {!stepper.state.isFirst && (
            <PreferencesButton
              className="text-preferences-muted hover:bg-preferences-panel"
              iconLeft={<IconChevronLeft size={16} />}
              name="Anterior"
              handleAction={() => stepper.navigation.prev()}
            />
          )}

          {stepper.state.isLast ? (
            <PreferencesButton
              name={isSaving ? 'Guardando...' : 'Guardar Cambios'}
              className="bg-success px-8 py-4 tracking-[0.2em] text-white shadow-lg shadow-success/20 hover:bg-green-700 active:scale-95"
              handleAction={handleSavePreferences}
              disabled={isSaving}
            />
          ) : (
            <PreferencesButton
              name="Continuar"
              iconRight={<IconChevronRight size={16} />}
              className="bg-sidebar-primary px-8 py-4 tracking-[0.2em] text-white hover:bg-brand-ink active:scale-95 dark:bg-blue-950"
              handleAction={() => stepper.navigation.next()}
            />
          )}
        </div>
      </div>
    </section>
  );
}
