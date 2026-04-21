import Link from 'next/link';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

export type SupportCardProps = {
  icon: ReactNode;
  label: string;
  description: string;
  accentClassName: string;
  href?: string;
  className?: string;
};

export function SupportCard({ icon, label, description, accentClassName, href, className }: SupportCardProps) {
  const content = (
    <>
      <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl', accentClassName)}>{icon}</div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-black tracking-tight text-foreground">{label}</span>
        <span className="truncate text-xs font-medium text-muted-foreground">{description}</span>
      </div>
    </>
  );

  const rootClassName = cn(
    'flex h-full w-full flex-col gap-3 rounded-3xl focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none',
    className
  );

  if (href) {
    return (
      <Link href={href} className={rootClassName}>
        {content}
      </Link>
    );
  }

  return (
    <Button type="button" className={rootClassName}>
      {content}
    </Button>
  );
}
