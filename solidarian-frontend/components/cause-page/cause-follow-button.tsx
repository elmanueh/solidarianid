'use client';

import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { JOIN_CAUSE_MUTATION, LEAVE_CAUSE_MUTATION } from '@/features/causes/api/graphql/causes.documents';
import { useAppSelector } from '@/features/redux/redux-hook';
import { cn } from '@/lib/utils';
import { useMutation } from '@apollo/client/react';
import { IconHeart } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CauseFollowButtonProps {
  causeId: string;
  following: boolean;
}

const causeFollowButtonVariants = {
  following: 'border-brand-500/20 bg-brand-500/10 text-brand-500 hover:bg-brand-500/15',
  notFollowing: 'border-border bg-background text-brand-ink hover:bg-muted',
} as const;

export default function CauseFollowButton({ causeId, following }: Readonly<CauseFollowButtonProps>) {
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);
  const [joinCause, { loading: joiningCause }] = useMutation(JOIN_CAUSE_MUTATION);
  const [leaveCause, { loading: leavingCause }] = useMutation(LEAVE_CAUSE_MUTATION);
  const [isFollowing, setIsFollowing] = useState(following);
  const isLoading = joiningCause || leavingCause;

  const handleFollow = async () => {
    if (!currentUserId) {
      toast.error('Debes iniciar sesion para seguir esta causa');
      return;
    }

    try {
      if (isFollowing) {
        const result = await leaveCause({ variables: { causeId } });
        if (result.data?.leaveCause) {
          setIsFollowing(false);
          toast.success('Has dejado de seguir esta causa');
        }
      } else {
        const result = await joinCause({ variables: { causeId } });
        if (result.data?.joinCause) {
          setIsFollowing(true);
          toast.success('Ahora sigues esta causa');
        }
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
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
        'cursor-pointer rounded-full border shadow-sm transition-colors duration-200 active:scale-95',
        isFollowing ? causeFollowButtonVariants.following : causeFollowButtonVariants.notFollowing
      )}
    >
      <IconHeart size={18} className={isFollowing ? 'text-brand-500' : 'text-brand-ink'} />
    </Button>
  );
}
