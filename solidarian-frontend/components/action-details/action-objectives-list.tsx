'use client';

import ContributeObjectiveModal from '@/components/action-details/contribute-objective-modal';
import { Badge, Button, Card, CardDescription, CardTitle, Progress } from '@/components/ui';
import { CONTRIBUTE_OBJECTIVE_MUTATION, GetActionResult } from '@/features/actions/api/graphql/actions.documents';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { useAppSelector } from '@/features/redux/redux-hook';
import { useMutation } from '@apollo/client/react';
import { IconCircleCheck, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ActionObjectivesListProps {
  actionId: string;
  objectives: GetActionResult['action']['objectives'];
}

export default function ActionObjectivesList({
  actionId,
  objectives: initialObjectives,
}: Readonly<ActionObjectivesListProps>) {
  const userId = useAppSelector(state => state.auth.currentUser?.id);
  const [objectives, setObjectives] = useState(initialObjectives);
  const [selectedObjectiveIndex, setSelectedObjectiveIndex] = useState(-1);
  const [contributeMutation] = useMutation(CONTRIBUTE_OBJECTIVE_MUTATION);
  const selectedObjective = selectedObjectiveIndex >= 0 ? objectives[selectedObjectiveIndex] : null;

  const closeModal = () => setSelectedObjectiveIndex(-1);

  const handleContribute = async (objectiveIndex: number, contributeValue: number): Promise<void> => {
    const targetObjective = objectives[objectiveIndex];
    if (!targetObjective) return;

    try {
      const mutationResult = await contributeMutation({
        variables: { actionId, objectiveName: targetObjective.name, userId: userId!, amount: contributeValue },
      });

      const updatedObjective = mutationResult.data?.contributeObjective;
      if (!updatedObjective) {
        toast.error('No se pudo actualizar el progreso del objetivo.');
        return;
      }

      const contributed = Math.max(0, updatedObjective.currentAmount - targetObjective.currentAmount);

      setObjectives(previous =>
        previous.map((objective, idx) => (idx === objectiveIndex ? { ...objective, ...updatedObjective } : objective))
      );

      toast.success('¡Gracias por tu aporte!', {
        description: `Has contribuido con ${contributed} ${targetObjective.unit} a ${targetObjective.name}`,
      });

      closeModal();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="space-y-4">
        {objectives.map((objective, index) => {
          const progress = Math.min(100, (objective.currentAmount / objective.quantity) * 100);
          const remaining = Math.max(0, objective.quantity - objective.currentAmount);

          return (
            <Card
              key={`${objective.name}-${index}`}
              className="group gap-4 rounded-3xl border-orange-400/10 p-6 shadow-sm transition-colors hover:border-orange-400/25"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <CardTitle className="text-base font-bold transition-colors group-hover:text-orange-400">
                    {objective.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{objective.description}</CardDescription>
                </div>

                {remaining > 0 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setSelectedObjectiveIndex(index)}
                    className="cursor-pointer rounded-2xl bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 hover:text-orange-500"
                    aria-label={`Contribuir al objetivo ${objective.name}`}
                  >
                    <IconPlus className="size-5" />
                  </Button>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">
                    {objective.currentAmount} {objective.unit}
                  </span>
                  <span>
                    {objective.quantity} {objective.unit}
                  </span>
                </div>

                <Progress
                  value={progress}
                  className="gap-0 **:data-[slot=progress-indicator]:rounded-full **:data-[slot=progress-indicator]:bg-linear-to-r **:data-[slot=progress-indicator]:from-orange-400 **:data-[slot=progress-indicator]:to-orange-200 **:data-[slot=progress-track]:h-3 **:data-[slot=progress-track]:rounded-full **:data-[slot=progress-track]:bg-muted/70"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <IconCircleCheck size={14} className={progress === 100 ? 'text-orange-500' : 'text-orange-400/60'} />
                  <span className="text-[10px] font-bold tracking-wider uppercase">
                    {Math.round(progress)}% logrado
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className="h-auto border-orange-400/25 bg-orange-400/10 px-2 py-0.5 text-[10px] font-bold text-orange-400"
                >
                  Quedan {remaining} {objective.unit}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedObjective && selectedObjectiveIndex >= 0 ? (
        <ContributeObjectiveModal
          objective={selectedObjective}
          objectiveIndex={selectedObjectiveIndex}
          onClose={closeModal}
          onContribute={handleContribute}
        />
      ) : null}
    </>
  );
}
