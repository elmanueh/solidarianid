import { Button } from '@/components/ui/button';
import { ROUTES } from '@/features/routes';
import { IconBolt, IconHeart, IconHome, IconUsers } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

type RouteNotFoundEntity = 'page' | 'community' | 'cause' | 'action';

const DEFAULT_CONTENT: Record<
  RouteNotFoundEntity,
  {
    title: string;
    description: string;
    actionLabel: string;
    actionHref: (options: { communityId?: string; causeId?: string }) => string;
    icon: typeof IconHome;
    iconClassName: string;
    iconContainerClassName: string;
  }
> = {
  page: {
    title: 'Página no encontrada',
    description:
      'No hemos podido encontrar la página que intentas abrir. Puede que el enlace haya cambiado o que ya no exista.',
    actionLabel: 'Volver al inicio',
    actionHref: () => ROUTES.app.home,
    icon: IconHome,
    iconClassName: 'text-brand-500',
    iconContainerClassName: 'bg-brand-500/10 text-brand-500 ring-brand-500/15',
  },
  community: {
    title: 'Comunidad no encontrada',
    description:
      'No hemos podido encontrar esta comunidad. Es posible que el enlace no sea válido o que ya no esté disponible.',
    actionLabel: 'Explorar comunidades',
    actionHref: () => ROUTES.app.explore,
    icon: IconUsers,
    iconClassName: 'text-brand-500',
    iconContainerClassName: 'bg-brand-500/10 text-brand-500 ring-brand-500/15',
  },
  cause: {
    title: 'Causa no encontrada',
    description:
      'No hemos podido encontrar esta causa dentro de la comunidad. Puede que el enlace no corresponda a esta comunidad.',
    actionLabel: 'Volver a la comunidad',
    actionHref: ({ communityId }) => (communityId ? ROUTES.communities.detail(communityId) : ROUTES.app.explore),
    icon: IconHeart,
    iconClassName: 'text-brand-500',
    iconContainerClassName: 'bg-brand-500/10 text-brand-500 ring-brand-500/15',
  },
  action: {
    title: 'Acción no encontrada',
    description: 'No hemos podido encontrar esta acción dentro de la causa. Puede que el enlace ya no sea válido.',
    actionLabel: 'Volver a la causa',
    actionHref: ({ communityId, causeId }) =>
      communityId && causeId ? ROUTES.communities.causeDetail(communityId, causeId) : ROUTES.app.explore,
    icon: IconBolt,
    iconClassName: 'text-emerald-500',
    iconContainerClassName: 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/15',
  },
};

interface RouteNotFoundProps {
  entity: RouteNotFoundEntity;
  communityId?: string;
  causeId?: string;
}

export default function RouteNotFound({ entity, communityId, causeId }: Readonly<RouteNotFoundProps>) {
  const content = DEFAULT_CONTENT[entity];
  const actionHref = content.actionHref({ communityId, causeId });

  return (
    <main
      data-not-found-screen="true"
      className={'relative flex h-full justify-center overflow-hidden bg-background p-2 sm:p-3 md:p-4'}
    >
      <section
        className={
          'absolute inset-2 bottom-24 overflow-hidden rounded-4xl border border-border bg-background sm:inset-3 sm:bottom-3 md:inset-4'
        }
      >
        <Image
          src="/not-found.gif"
          alt="GIF de fondo"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-70 xl:object-contain"
        />

        <div className={'relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8'}>
          <section className="w-full max-w-lg rounded-4xl border border-border bg-card/80 p-5 text-center text-card-foreground backdrop-blur-xl sm:p-8">
            <div
              className={`mx-auto mb-5 flex size-14 items-center justify-center rounded-full ring-1 ${content.iconContainerClassName}`}
            >
              <content.icon size={30} className={content.iconClassName} />
            </div>

            <h1 className="mt-3 text-3xl font-semibold">{content.title}</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{content.description}</p>

            <div className="mt-8 flex justify-center">
              <Button
                variant="default"
                nativeButton={false}
                render={<Link href={actionHref} aria-label={content.actionLabel} className="contents" />}
                className="h-11 gap-2 rounded-full bg-brand-500 px-5 text-white shadow-lg shadow-brand-500/20 transition-colors hover:bg-brand-500/90"
              >
                <IconHome size={18} />
                {content.actionLabel}
              </Button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
