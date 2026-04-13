import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/features/routes';
import { IconChevronRight, IconLayoutList, IconTargetArrow } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

interface ActionsListProps {
  communityId: string;
  causeId: string;
  actions: { id: string; name: string; description: string }[];
  imageUrl: string;
}

export default function ActionsList({ communityId, causeId, actions, imageUrl }: Readonly<ActionsListProps>) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-brand-ink dark:text-foreground">
          <IconLayoutList size={20} className="text-brand-500" />
          Acciones Sugeridas
        </h3>
        <Badge
          variant="outline"
          className="h-auto border-border bg-background px-2.5 py-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
        >
          {actions.length} acciones
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {actions.length > 0 ? (
          actions.map(action => {
            return (
              <article key={action.id}>
                <Link
                  href={ROUTES.communities.actionDetail(communityId, causeId, action.id)}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-500/25 hover:shadow-md"
                >
                  <div className="relative h-32 overflow-hidden bg-muted">
                    <Image
                      src={imageUrl}
                      alt={action.name}
                      fill
                      sizes="100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex flex-col gap-1.5 p-5">
                    <div className="flex items-start">
                      <CardTitle className="text-base font-bold text-brand-ink transition-colors group-hover:text-brand-500 dark:text-foreground">
                        {action.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-1 text-[11px] leading-tight text-muted-foreground">
                      {action.description}
                    </CardDescription>
                    <div className="mt-3 flex items-center gap-1.5 text-brand-500">
                      <IconTargetArrow size={12} />
                      <span className="text-[10px] font-bold tracking-wider uppercase">Ver objetivos</span>
                      <IconChevronRight size={12} className="ml-auto" />
                    </div>
                  </CardContent>
                </Link>
              </article>
            );
          })
        ) : (
          <Card className="rounded-3xl border-dashed border-border bg-card shadow-sm">
            <CardContent className="p-10 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                No hay acciones disponibles actualmente para esta causa.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
