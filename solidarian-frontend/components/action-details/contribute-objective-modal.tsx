'use client';

import { GetActionResult } from '@/features/actions/api/graphql/actions.documents';
import { useState } from 'react';

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

  const handleContribute = () => {
    if (contributeValue <= 0) {
      alert('Por favor, introduce una cantidad válida');
      return;
    }

    onContribute(objectiveIndex, contributeValue);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-100 bg-foreground/40 backdrop-blur-sm"
        aria-label="Cerrar modal"
      />

      <div className="fixed right-0 bottom-0 left-0 z-101 rounded-t-[40px] border-t border-border bg-card p-8 shadow-2xl">
        <div className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-muted" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-foreground">Contribuir al objetivo</h3>
            <p className="text-sm text-muted-foreground">{objective.name}</p>
          </div>

          <div className="relative">
            <input
              type="number"
              value={contributeValue}
              onChange={e => setContributeValue(Number(e.target.value))}
              placeholder={`Introduce cantidad (${objective.unit})`}
              className="w-full rounded-3xl border border-border bg-background px-6 py-4 text-lg font-bold text-foreground placeholder:text-muted-foreground focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
              autoFocus
            />
            <div className="absolute top-1/2 right-6 -translate-y-1/2 font-bold text-muted-foreground">
              {objective.unit}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl py-4 font-bold text-muted-foreground transition-colors hover:bg-muted/70"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleContribute()}
              className="flex-2 rounded-2xl bg-brand-500 py-4 font-bold text-white shadow-lg shadow-brand-500/20 transition-transform active:scale-95"
            >
              Confirmar aporte
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
