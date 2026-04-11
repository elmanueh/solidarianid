'use client';

import { Badge, buttonVariants } from '@/components/ui';
import { ROUTES } from '@/features/routes';
import { cn } from '@/lib/utils';
import { IconArrowLeft, IconBolt, IconBuilding, IconHeart } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';

type RequestFormVariant = 'community' | 'cause' | 'action';

const REQUEST_VARIANTS = {
  community: {
    label: 'Nueva Comunidad',
    icon: IconBuilding,
    iconClassName: 'bg-blue-500/10 text-blue-600',
  },
  cause: {
    label: 'Nueva Causa',
    icon: IconHeart,
    iconClassName: 'bg-pink-500/10 text-pink-600',
  },
  action: {
    label: 'Nueva Acción',
    icon: IconBolt,
    iconClassName: 'bg-emerald-500/10 text-emerald-600',
  },
} as const;

interface RequestFormLayoutProps {
  variant: RequestFormVariant;
  children: ReactNode;
}

export function RequestFormLayout({ variant, children }: Readonly<RequestFormLayoutProps>) {
  const params = useParams<{ communityId?: string; causeId?: string }>();
  const config = REQUEST_VARIANTS[variant];

  const getReturnHref = () => {
    if (variant === 'community') {
      return ROUTES.app.favorites;
    }

    const communityId = typeof params.communityId === 'string' ? params.communityId : undefined;

    if (variant === 'cause') {
      return communityId ? ROUTES.communities.causes(communityId) : ROUTES.app.home;
    }

    const causeId = typeof params.causeId === 'string' ? params.causeId : undefined;

    if (variant === 'action') {
      return communityId && causeId ? ROUTES.communities.causeDetail(communityId, causeId) : ROUTES.app.home;
    }

    return ROUTES.app.home;
  };

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <div className="mx-auto flex w-full flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-start gap-4 rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:px-6 sm:py-5">
          <Link
            href={getReturnHref()}
            aria-label="Volver"
            className={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
          >
            <IconArrowLeft />
          </Link>

          <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-2xl', config.iconClassName)}>
            <config.icon size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">{config.label}</h1>
              <Badge variant="outline" className="h-5 px-2 text-[10px] tracking-[0.3em] uppercase">
                Solicitud
              </Badge>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
