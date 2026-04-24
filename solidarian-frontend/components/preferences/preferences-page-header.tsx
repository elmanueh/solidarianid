import Image from 'next/image';

export function PreferencesHeader() {
  return (
    <header className="flex flex-col items-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border p-3 shadow-sm">
        <Image
          src="/solidarian-logo.png"
          alt="SolidarianID"
          className="h-auto w-full object-contain"
          width={24}
          height={24}
        />
      </div>
      <h1 className="mb-2 text-2xl font-black tracking-tighter text-brand-ink uppercase">Bienvenido a SolidarianID</h1>
      <p className="max-w-75 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
        Configura tu perfil de impacto para empezar a transformar el mundo.
      </p>
    </header>
  );
}
