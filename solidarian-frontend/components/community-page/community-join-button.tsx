'use client';

import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/features/axios/errors.handler';
import {
  JOIN_COMMUNITY_MUTATION,
  LEAVE_COMMUNITY_MUTATION,
} from '@/features/communities/api/graphql/communities.documents';
import { useAppSelector } from '@/features/redux/redux-hook';
import { cn } from '@/lib/utils';
import { useMutation } from '@apollo/client/react';
import { IconCheck, IconUserPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CommunityJoinButtonProps {
  communityId: string;
  initialIsMember: boolean;
}

export default function CommunityJoinButton({ communityId, initialIsMember }: Readonly<CommunityJoinButtonProps>) {
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);
  const [isMember, setIsMember] = useState(initialIsMember);
  const [joinCommunity, { loading: joiningCommunity }] = useMutation(JOIN_COMMUNITY_MUTATION);
  const [leaveCommunity, { loading: leavingCommunity }] = useMutation(LEAVE_COMMUNITY_MUTATION);
  const isLoading = joiningCommunity || leavingCommunity;

  const handleToggleCommunityMembership = async () => {
    if (isLoading) {
      return;
    }

    if (!currentUserId) {
      toast.error('Debes iniciar sesion para unirte a una comunidad');
      return;
    }

    try {
      if (isMember) {
        const result = await leaveCommunity({
          variables: {
            communityId,
            userId: currentUserId,
          },
        });

        if (result.data?.leaveCommunity) {
          setIsMember(false);
          toast.success('Has dejado la comunidad');
        }
      } else {
        const result = await joinCommunity({
          variables: {
            communityId,
            userId: currentUserId,
          },
        });

        if (result.data?.joinCommunity) {
          setIsMember(true);
          toast.success('Ahora formas parte de esta comunidad');
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Button
      type="button"
      onClick={handleToggleCommunityMembership}
      disabled={isLoading}
      className={cn(
        'h-11 cursor-pointer rounded-full px-5 text-xs font-bold tracking-wider uppercase',
        isMember
          ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          : 'bg-brand-500 text-white hover:bg-brand-ink'
      )}
      variant={isMember ? 'outline' : 'default'}
      aria-label={isMember ? 'Dejar la comunidad' : 'Unirse a la comunidad'}
      aria-busy={isLoading}
    >
      {isMember ? (
        <>
          <IconCheck size={16} />
          Siguiendo
        </>
      ) : (
        <>
          <IconUserPlus size={16} />
          Unirse
        </>
      )}
    </Button>
  );
}
