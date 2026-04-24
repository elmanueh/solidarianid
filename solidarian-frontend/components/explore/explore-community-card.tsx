import { ExploreCommunityItem } from '@/features/explore/model/explore.types';
import { ROUTES } from '@/features/routes';
import Image from 'next/image';
import Link from 'next/link';

type ExploreCommunityCardProps = {
  community: ExploreCommunityItem;
};

export function ExploreCommunityCard({ community }: Readonly<ExploreCommunityCardProps>) {
  return (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[34px] border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-chart-2/30 hover:shadow-lg hover:shadow-chart-2/10">
      <Link href={ROUTES.communities.detail(community.id)} className="block cursor-pointer">
        <div className="relative h-44 overflow-hidden md:h-48">
          <Image
            src={community.imageUrl}
            alt={community.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <span className="absolute top-4 left-4 rounded-full border border-border bg-card/95 px-3 py-1 text-[9px] font-black tracking-[0.18em] text-chart-2 uppercase backdrop-blur-sm">
            Comunidad
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="line-clamp-1 text-xl font-black tracking-tight text-foreground">{community.name}</h3>
          <p className="line-clamp-3 text-[11px] leading-relaxed font-bold tracking-wide text-muted-foreground uppercase">
            {community.description}
          </p>
          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <span className="text-[10px] font-black tracking-[0.12em] text-chart-2 uppercase">Ver comunidad</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
