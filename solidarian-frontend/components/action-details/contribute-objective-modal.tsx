'use client';

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/components/ui';
import { GetActionResult } from '@/features/actions/api/graphql/actions.documents';
import { useState } from 'react';
import { toast } from 'sonner';

interface ContributeObjectiveModalProps {
  objectiveIndex: number;
  objective: GetActionResult['action']['objectives'][number];
  onClose: () => void;
  onContribute: (objectiveIndex: number, contributeValue: number) => void;
}

export default function ContributeObjectiveModal({
  objectiveIndex,
  objective,
  onClose,
  onContribute,
}: Readonly<ContributeObjectiveModalProps>) {
  const [contributeValue, setContributeValue] = useState(0);
  const remaining = Math.max(0, objective.quantity - objective.currentAmount);

  const handleContribute = () => {
    if (contributeValue <= 0) {
      toast.error('Por favor, introduce una cantidad positiva.');
      return;
    }

    if (objective.currentAmount + contributeValue > objective.quantity) {
      toast.error('La cantidad introducida excede el objetivo', {
        description: `Solo quedan disponibles ${remaining} ${objective.unit}.`,
      });
      return;
    }

    onContribute(objectiveIndex, contributeValue);
  };

  const handleClose = (isOpen: boolean) => {
    setContributeValue(0);
    if (!isOpen) onClose();
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="top-auto! right-0! bottom-0! left-0! max-w-none! translate-x-0! translate-y-0! rounded-t-3xl border-orange-400/20 p-6 sm:rounded-t-3xl"
      >
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-muted" />

        <form
          className="flex flex-col gap-6"
          onSubmit={event => {
            event.preventDefault();
            handleContribute();
          }}
        >
          <DialogHeader>
            <Badge
              variant="outline"
              className="h-auto w-fit border-orange-400/25 text-[10px] font-bold text-orange-500 uppercase"
            >
              Aporte solidario
            </Badge>
            <DialogTitle className="text-xl font-bold">Contribuir al objetivo</DialogTitle>
            <DialogDescription>{objective.name}</DialogDescription>
          </DialogHeader>

          <div className="relative">
            <Input
              type="number"
              onChange={e => setContributeValue(Number(e.target.value))}
              placeholder={`Introduce cantidad (${objective.unit})`}
              className="h-12 rounded-xl pr-16 text-base font-semibold focus-visible:border-orange-400 focus-visible:ring-orange-400/20"
              autoFocus
            />
            <Badge
              variant="outline"
              className="pointer-events-none absolute top-1/2 right-3 h-auto -translate-y-1/2 border-orange-400/25 text-[10px] font-bold text-orange-500"
            >
              {objective.unit}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground">
            Disponible para aportar: <span className="font-bold text-orange-500">{remaining}</span> {objective.unit}
          </p>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 cursor-pointer rounded-xl">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-2 cursor-pointer rounded-xl bg-orange-400 text-white hover:bg-orange-500"
            >
              Confirmar aporte
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
