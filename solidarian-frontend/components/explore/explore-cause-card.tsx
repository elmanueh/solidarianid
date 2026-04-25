import { getSortedOds } from '@/features/causes/constants/ods.constants';
import { ExploreCauseItem } from '@/features/explore/model/explore.types';
import { ROUTES } from '@/features/routes';
import Image from 'next/image';
import Link from 'next/link';

type ExploreCauseCardProps = {
  cause: ExploreCauseItem;
};

export function ExploreCauseCard({ cause }: Readonly<ExploreCauseCardProps>) {
  const sortedOds = getSortedOds(cause.ods);

  return (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[34px] border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-chart-2/30 hover:shadow-lg hover:shadow-chart-2/10">
      <Link href={ROUTES.communities.causeDetail(cause.communityId, cause.id)} className="block cursor-pointer">
        <div className="relative h-44 overflow-hidden md:h-48">
          <Image
            src={cause.imageUrl}
            alt={cause.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <span className="absolute top-4 left-4 rounded-full border border-border bg-card/95 px-3 py-1 text-[9px] font-black tracking-[0.18em] text-chart-2 uppercase backdrop-blur-sm">
            Causa
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="line-clamp-1 text-xl font-black tracking-tight text-foreground">{cause.name}</h3>
          <p className="line-clamp-3 text-[11px] leading-relaxed font-bold tracking-wide text-muted-foreground uppercase">
            {cause.description}
          </p>
          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {sortedOds.slice(0, 2).map(ods => (
                <span
                  key={ods.num}
                  className="inline-flex items-center rounded-full border border-chart-4/20 bg-chart-4/10 px-3 py-1 text-[9px] font-black tracking-[0.16em] text-chart-4 uppercase"
                >
                  ODS {ods.num}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-black tracking-[0.12em] text-chart-2 uppercase">Ver causa</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
