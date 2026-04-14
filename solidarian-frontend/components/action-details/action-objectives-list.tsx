'use client';

import ContributeObjectiveModal from '@/components/action-details/contribute-objective-modal';
import { GetActionResult } from '@/features/actions/api/graphql/actions.documents';
import { IconCircleCheck, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ActionObjectivesListProps {
  objectives: GetActionResult['action']['objectives'];
}

export default function ActionObjectivesList({ objectives: initialObjectives }: Readonly<ActionObjectivesListProps>) {
  const [objectives, setObjectives] = useState(initialObjectives);
  const [selectedObjectiveIndex, setSelectedObjectiveIndex] = useState<number>(-1);

  const selectedObjective = selectedObjectiveIndex >= 0 ? objectives[selectedObjectiveIndex] : null;

  const closeModal = () => setSelectedObjectiveIndex(-1);

  const handleContribute = (objectiveIndex: number, contributeValue: number) => {
    if (!Number.isFinite(contributeValue) || contributeValue <= 0) {
      toast.error('Por favor, introduce una cantidad válida');
      return;
    }

    const targetObjective = objectives[objectiveIndex];

    if (!targetObjective) {
      return;
    }

    const nextCurrent = Math.min(targetObjective.quantity, targetObjective.currentAmount + contributeValue);
    const contributed = nextCurrent - targetObjective.currentAmount;

    // TODO: Aquí iría la lógica real para contribuir al objetivo, con graphql

    setObjectives(previous =>
      previous.map((objective, idx) => (idx === objectiveIndex ? { ...objective, current: nextCurrent } : objective))
    );

    toast.success('¡Gracias por tu aporte!', {
      description: `Has contribuido con ${contributed} ${targetObjective.unit} a ${targetObjective.name}`,
    });

    closeModal();
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {objectives.map((objective, index) => {
          const progress = Math.min(100, (objective.currentAmount / objective.quantity) * 100);
          const remaining = Math.max(0, objective.quantity - objective.currentAmount);

          return (
            <article
              key={`${objective.name}-${index}`}
              className="group overflow-hidden rounded-[28px] border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">
                    Objetivo {index + 1}
                  </span>
                  <h4 className="text-base font-bold text-foreground">{objective.name}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{objective.description}</p>
                </div>

                {remaining > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelectedObjectiveIndex(index)}
                    className="shrink-0 rounded-2xl bg-brand-500/10 p-2.5 text-brand-500 shadow-sm transition-transform hover:bg-brand-500/15 active:scale-90"
                    aria-label={`Contribuir al objetivo ${objective.name}`}
                  >
                    <IconPlus size={20} />
                  </button>
                ) : null}
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">
                    {objective.currentAmount} {objective.unit}
                  </span>
                  <span className="text-foreground">
                    {objective.quantity} {objective.unit}
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-muted/70">
                  <div
                    style={{ width: `${progress}%` }}
                    className="h-full rounded-full bg-linear-to-r from-amber-500 to-amber-300"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <IconCircleCheck
                    size={14}
                    className={progress === 100 ? 'text-emerald-600' : 'text-muted-foreground/30'}
                  />
                  <span className="text-[10px] font-bold tracking-wider uppercase">
                    {Math.round(progress)}% logrado
                  </span>
                </div>

                <span className="text-[10px] font-bold text-amber-600">
                  Quedan {remaining} {objective.unit}
                </span>
              </div>
            </article>
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
