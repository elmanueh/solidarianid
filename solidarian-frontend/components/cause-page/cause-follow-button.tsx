'use client';

import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { joinCause, leaveCause } from '@/features/communities/services/communities.client';
import { cn } from '@/lib/utils';
import { IconHeart } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CauseFollowButtonProps {
  causeId: string;
  causeUserIds: readonly string[];
  className?: string;
  onFollowingChange?: (isFollowing: boolean) => void;
}

export default function CauseFollowButton({
  causeId,
  causeUserIds,
  className,
  onFollowingChange,
}: Readonly<CauseFollowButtonProps>) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedUserId, setResolvedUserId] = useState<string | undefined>();

  useEffect(() => {
    try {
      const storedUserId = globalThis.localStorage.getItem('userId');

      if (storedUserId) setResolvedUserId(storedUserId);
    } catch {}
  }, []);

  useEffect(() => {
    setIsFollowing(Boolean(resolvedUserId && causeUserIds.includes(resolvedUserId)));
  }, [causeUserIds, resolvedUserId]);

  const handleFollow = async () => {
    if (!resolvedUserId) {
      toast.info('Inicia sesión para seguir la causa');
      return;
    }

    if (isFollowing) {
      const shouldLeave = globalThis.confirm('¿Quieres dejar de seguir esta causa?');

      if (!shouldLeave) {
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isFollowing) {
        const result = await leaveCause(causeId, resolvedUserId);

        if (result) {
          setIsFollowing(false);
          onFollowingChange?.(false);
          toast.success('Has dejado de seguir esta causa');
        }

        return;
      }

      const result = await joinCause(causeId, resolvedUserId);

      if (result) {
        setIsFollowing(true);
        onFollowingChange?.(true);
        toast.success('Ahora sigues esta causa');
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      const normalizedError = errorMessage.toLowerCase();

      if (normalizedError.includes('already following')) {
        setIsFollowing(true);
        onFollowingChange?.(true);
        toast.info('Ya sigues esta causa');
        return;
      }

      if (normalizedError.includes('not following')) {
        setIsFollowing(false);
        onFollowingChange?.(false);
        toast.info('No sigues esta causa');
        return;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      aria-pressed={isFollowing}
      aria-busy={isLoading}
      aria-label={isFollowing ? 'Dejar de seguir causa' : 'Seguir causa'}
      title={isFollowing ? 'Dejar de seguir causa' : 'Seguir causa'}
      onClick={handleFollow}
      disabled={isLoading}
      className={cn(
        'h-10 w-10 cursor-pointer rounded-full p-0 text-sm font-semibold shadow-sm transition-all active:scale-95',
        isFollowing
          ? 'border-[#7CC342]/20 bg-[#7CC342]/10 text-[#5E8F2D] hover:bg-[#7CC342]/15 dark:border-[#7CC342]/25 dark:bg-[#7CC342]/15 dark:text-[#B9E38D]'
          : 'border-neutral-100 bg-white/70 text-neutral-700 hover:border-neutral-200 hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-900/80',
        className
      )}
    >
      <IconHeart size={18} className={isFollowing ? 'text-[#7CC342]' : 'text-[#F7941D]'} />
    </Button>
  );
}
