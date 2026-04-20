import { PreferencesStepper } from '@/components/preferences/preferences';
import { PreferencesInfo } from '@/components/preferences/preferences-info';

export default function OnboardingPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Onboarding</h1>
      <p className="mt-2 text-muted-foreground">Pantalla de prueba para onboarding.</p>
      <PreferencesStepper />
      <PreferencesInfo />
    </section>
  );
}
