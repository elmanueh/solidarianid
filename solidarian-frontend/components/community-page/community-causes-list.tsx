import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/features/routes';
import { IconChevronRight, IconHeartHandshake } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

interface CommunityCause {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  ods: string[];
}

interface CommunityCausesListProps {
  communityId: string;
  causes: CommunityCause[];
  imageUrl: string;
}

export default function CommunityCausesList({ communityId, causes, imageUrl }: Readonly<CommunityCausesListProps>) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-brand-ink dark:text-foreground">
          <IconHeartHandshake size={20} className="text-brand-500" />
          Causas de la comunidad
        </h3>
        <Badge
          variant="outline"
          className="h-auto border-border bg-background px-2.5 py-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
        >
          {causes.length} causas
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {causes.length > 0 ? (
          causes.map(cause => (
            <article key={cause.id}>
              <Link
                href={ROUTES.communities.causeDetail(communityId, cause.id)}
                className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-500/25 hover:shadow-md"
              >
                <div className="relative h-32 overflow-hidden bg-muted">
                  <Image
                    src={imageUrl}
                    alt={cause.name}
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-col gap-2 p-5">
                  <CardTitle className="text-base font-bold text-brand-ink transition-colors group-hover:text-brand-500 dark:text-foreground">
                    {cause.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-[12px] leading-5 text-muted-foreground">
                    {cause.description}
                  </CardDescription>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-bold tracking-wider text-brand-500 uppercase">
                    <span>{cause.durationDays} dias</span>
                    <span className="inline-flex items-center gap-1">
                      Ver causa
                      <IconChevronRight size={12} />
                    </span>
                  </div>
                </CardContent>
              </Link>
            </article>
          ))
        ) : (
          <Card className="rounded-3xl border-dashed border-border bg-card shadow-sm">
            <CardContent className="p-10 text-center">
              <p className="text-sm font-medium text-muted-foreground">Esta comunidad aun no tiene causas activas.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
