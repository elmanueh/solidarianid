import { Button } from '@/components/ui/button';
import { ROUTES } from '@/features/routes';
import { IconAlertTriangle, IconHome } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

const PAGE_TITLE = 'Página no encontrada';
const PAGE_DESCRIPTION = 'Esta página no existe o ha sido movida. Vuelve al inicio para continuar navegando.';

export default function RouteNotFound() {
  return (
    <main
      data-not-found-screen="true"
      className="relative flex h-full min-h-0 justify-center overflow-hidden bg-background p-2 sm:p-3 md:p-4"
    >
      <section className="absolute inset-2 bottom-24 overflow-hidden rounded-4xl border border-border bg-background sm:inset-3 sm:bottom-3 md:inset-4">
        <Image
          src="/not-found.gif"
          alt="GIF de fondo"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-70 xl:object-contain"
        />

        <div className="relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
          <section className="w-full max-w-lg rounded-4xl border border-border bg-card/80 p-5 text-center text-card-foreground backdrop-blur-xl sm:p-8">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-muted text-warning ring-1 ring-border">
              <IconAlertTriangle size={30} />
            </div>

            <h1 className="mt-3 text-3xl font-semibold">{PAGE_TITLE}</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{PAGE_DESCRIPTION}</p>

            <div className="mt-8 flex justify-center">
              <Button
                variant="default"
                nativeButton={false}
                render={<Link href={ROUTES.app.home} aria-label="Volver al inicio" />}
                className="h-11 gap-2 rounded-full bg-brand-500 px-5 text-white shadow-lg shadow-brand-500/20 transition-colors hover:bg-brand-500/90"
              >
                <IconHome size={18} />
                Volver al inicio
              </Button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
