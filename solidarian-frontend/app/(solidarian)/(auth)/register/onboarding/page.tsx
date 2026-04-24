import { PreferencesStepper } from '@/components/preferences/preferences';
import { PreferencesInfo } from '@/components/preferences/preferences-info';
import { PreferencesHeader } from '@/components/preferences/preferences-page-header';

export default function OnboardingPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col justify-center gap-4 p-6">
      <PreferencesHeader />
      <PreferencesStepper />
      <PreferencesInfo />
    </section>
  );
}
