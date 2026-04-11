import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/infrastructure/navigation/routes';
import { IconChevronRight, IconLayoutList, IconTargetArrow } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

interface ActionsListProps {
  communityId: string;
  causeId: string;
  actions: { id: string; name: string; description: string }[];
  imageUrl: string;
}

export function ActionsList({ communityId, causeId, actions, imageUrl }: Readonly<ActionsListProps>) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-[#1A2D54] dark:text-white">
          <IconLayoutList size={20} className="text-[#F7941D]" />
          Acciones Sugeridas
        </h3>
        <Badge
          variant="outline"
          className="h-auto border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-neutral-500 uppercase dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
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
                  className="group block overflow-hidden rounded-[28px] border border-neutral-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#F7941D]/30 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-[#F7941D]/50"
                >
                  <div className="relative h-32 overflow-hidden bg-neutral-100">
                    <Image
                      src={imageUrl}
                      alt={action.name}
                      fill
                      sizes="100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="flex flex-col gap-1.5 p-5">
                    <div className="flex items-start">
                      <CardTitle className="text-base font-bold text-[#1A2D54] transition-colors group-hover:text-[#F7941D] dark:text-white">
                        {action.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-1 text-[11px] leading-tight text-neutral-500 dark:text-neutral-400">
                      {action.description}
                    </CardDescription>
                    <div className="mt-3 flex items-center gap-1.5 text-[#40A9FF]">
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
          <Card className="rounded-3xl border-dashed border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
            <CardContent className="p-10 text-center">
              <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
                No hay acciones disponibles actualmente para esta causa.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
