'use client';

import { Button } from '@/components/ui';
import { JOIN_EVENT_MUTATION, LEAVE_EVENT_MUTATION } from '@/features/actions/api/graphql/actions.documents';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { useAppSelector } from '@/features/redux/redux-hook';
import { useMutation } from '@apollo/client/react';
import { IconCircleCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const EVENT_BUTTON_BY_STATE = {
  past: {
    content: 'Evento finalizado',
    variant: 'outline',
    className: 'bg-muted/60 text-muted-foreground hover:bg-muted/60',
  },
  canJoin: {
    content: 'Unirme al evento',
    variant: 'default',
    className: 'bg-brand-500 text-white hover:bg-brand-500/90',
  },
  canLeave: {
    content: '¡Te has unido!',
    variant: 'outline',
    className: 'border-brand-500/20 bg-brand-500/10 text-brand-500 hover:bg-brand-500/15 hover:text-brand-500',
  },
  loading: {
    content: 'Cargando...',
    variant: 'default',
    className: 'bg-brand-500 text-white hover:bg-brand-500',
  },
} as const;

interface EventJoinButtonProps {
  eventId: string;
  eventName: string;
  initialDate: number;
  assistantIds: string[];
}

export default function EventJoinButton({
  eventId,
  eventName,
  initialDate,
  assistantIds,
}: Readonly<EventJoinButtonProps>) {
  const userId = useAppSelector(state => state.auth.currentUser?.id)!;
  const [joinEventMutation] = useMutation(JOIN_EVENT_MUTATION);
  const [leaveEventMutation] = useMutation(LEAVE_EVENT_MUTATION);
  const [internalState, setInternalState] = useState({
    isJoined: assistantIds.includes(userId),
    isUpdating: true,
    isPastEvent: initialDate <= Date.now(),
  });

  useEffect(() => {
    setInternalState(prev => ({
      ...prev,
      isJoined: assistantIds.includes(userId),
      isUpdating: false,
      isPastEvent: initialDate <= Date.now(),
    }));
  }, [assistantIds, userId, initialDate]);

  const toggleJoinStatus = async () => {
    if (initialDate <= Date.now()) {
      setInternalState(prev => ({ ...prev, isPastEvent: true }));
      toast.error('Este evento ya ha finalizado.');
      return;
    }

    if (internalState.isUpdating) return;
    const nextJoined = !internalState.isJoined;

    setInternalState(prev => ({ ...prev, isJoined: nextJoined, isUpdating: true }));

    try {
      if (nextJoined) {
        await joinEventMutation({ variables: { eventId, userId } });
      } else {
        await leaveEventMutation({ variables: { eventId, userId } });
      }

      toast(nextJoined ? '¡Te has unido al evento!' : 'Has cancelado tu asistencia', {
        description: nextJoined ? `Te esperamos en ${eventName}` : `Ya no estás inscrito en ${eventName}`,
        icon: nextJoined ? <IconCircleCheck className="text-emerald-600" /> : undefined,
      });
    } catch (error) {
      setInternalState(prev => ({ ...prev, isJoined: !nextJoined, isUpdating: false }));
      toast.error(getErrorMessage(error));
    } finally {
      setInternalState(prev => ({ ...prev, isUpdating: false }));
    }
  };

  const buttonStateKey = () => {
    const { isJoined, isUpdating, isPastEvent } = internalState;
    if (isUpdating) return 'loading';
    if (isPastEvent) return 'past';
    if (isJoined) return 'canLeave';
    return 'canJoin';
  };

  const buttonState = EVENT_BUTTON_BY_STATE[buttonStateKey()];

  return (
    <Button
      type="button"
      onClick={toggleJoinStatus}
      variant={buttonState.variant}
      size="lg"
      disabled={internalState.isPastEvent || internalState.isUpdating}
      className={`h-12 w-full cursor-pointer rounded-2xl ${buttonState.className}`}
    >
      {buttonState.content}
    </Button>
  );
}
