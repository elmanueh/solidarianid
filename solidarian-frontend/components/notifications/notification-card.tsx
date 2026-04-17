import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Notification, NotificationType } from '@/features/repository/entities/notification';
import { cn, formatNotificationTime } from '@/lib/utils';
import { IconAlertOctagon, IconCircleCheck, IconInfoCircle, IconMistOff } from '@tabler/icons-react';
import Link from 'next/link';
import { type ReactNode } from 'react';

type NotificationCardProps = Notification & {
  className?: string;
};

export function NotificationCard({
  title,
  type,
  message,
  read = false,
  createdAt,
  className,
  link,
}: NotificationCardProps) {
  const visual = getNotificationVisual(type);

  return (
    <Card
      className={cn(
        'rounded-2xl border bg-card shadow-sm transition-all',
        read ? 'border-neutral-100 opacity-80 dark:border-border/70' : 'border-brand-500/20 ring-1 ring-brand-500/5',
        className
      )}
    >
      <Link href={link} className="block">
        <CardHeader className="hidden" />
        <CardContent className="flex items-start gap-4 p-5">
          <div
            className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', visual.containerClassName)}
          >
            {visual.icon}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-sm leading-tight font-bold text-neutral-800 dark:text-foreground">
              {title}
            </CardTitle>
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-medium whitespace-nowrap text-neutral-400">
                {formatNotificationTime(createdAt)}
              </span>
              {!read && <span className="mt-2 h-2 w-2 rounded-full bg-brand-500" />}
            </div>

            <CardDescription className="text-xs leading-relaxed text-neutral-500 dark:text-muted-foreground">
              {message}
            </CardDescription>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

function getNotificationVisual(type: NotificationType): { icon: ReactNode; containerClassName: string } {
  switch (type) {
    case NotificationType.REQUEST_ACCEPTED:
      return {
        icon: <IconCircleCheck className="h-6 w-6 text-emerald-600" />,
        containerClassName: 'bg-emerald-100 dark:bg-emerald-500/20',
      };
    case NotificationType.REQUEST_REJECTED:
      return {
        icon: <IconAlertOctagon className="h-6 w-6 text-rose-600" />,
        containerClassName: 'bg-rose-100 dark:bg-rose-500/20',
      };
    case NotificationType.CAUSE_CREATED:
    case NotificationType.ACTION_CREATED:
      return {
        icon: <IconInfoCircle className="h-6 w-6 text-brand-500" />,
        containerClassName: 'bg-brand-500/10 dark:bg-brand-500/20',
      };
    default:
      return {
        icon: <IconMistOff className="h-6 w-6 text-neutral-500" />,
        containerClassName: 'bg-neutral-100 dark:bg-neutral-800',
      };
  }
}
