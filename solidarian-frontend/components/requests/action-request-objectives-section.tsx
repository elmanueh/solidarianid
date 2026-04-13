'use client';

import { RequestSectionCard } from '@/components/requests/request-section-card';
import { Button, Input, Textarea } from '@/components/ui';
import { IconPlus, IconTarget, IconX } from '@tabler/icons-react';
import { useState } from 'react';

interface ActionRequestObjectiveForm {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

function createEmptyObjective(): ActionRequestObjectiveForm {
  return {
    name: '',
    description: '',
    quantity: 1,
    unit: '',
  };
}

interface ActionRequestObjectivesSectionProps {
  objectives: ActionRequestObjectiveForm[];
  onChange: (objectives: ActionRequestObjectiveForm[]) => void;
  isSubmitting?: boolean;
}

export default function ActionRequestObjectivesSection({
  objectives,
  onChange,
  isSubmitting = false,
}: Readonly<ActionRequestObjectivesSectionProps>) {
  const [newObjective, setNewObjective] = useState(createEmptyObjective);

  const addObjective = () => {
    const objective = {
      name: newObjective.name.trim(),
      description: newObjective.description.trim(),
      quantity: newObjective.quantity,
      unit: newObjective.unit.trim(),
    };

    if (!objective.name || !objective.description || !objective.unit) return;

    onChange([...objectives, objective]);
    setNewObjective(createEmptyObjective());
  };

  const removeObjective = (index: number) => {
    onChange(objectives.filter((_, objectiveIndex) => objectiveIndex !== index));
  };

  return (
    <RequestSectionCard
      title={`Objetivos medibles (${objectives.length} añadidos) *`}
      description="Necesitas al menos un objetivo. Usa esta sección para convertir la idea en metas claras y cuantificables."
    >
      <div className="flex flex-col gap-1">
        {objectives.map((objective, index) => (
          <div
            key={`${objective.name || 'objective'}-${index}`}
            className="mb-4 flex items-start gap-3 rounded-2xl border border-border bg-background p-4 shadow-sm"
          >
            <IconTarget className="mt-1 shrink-0 text-emerald-600" size={20} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{objective.name}</p>
              <p className="text-xs text-muted-foreground">{objective.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Meta: {objective.quantity} {objective.unit}
              </p>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon-xs"
              disabled={isSubmitting}
              onClick={() => removeObjective(index)}
              aria-label={`Eliminar objetivo ${index + 1}`}
              className={`cursor-pointer`}
            >
              <IconX />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-border bg-muted/30 p-4">
        <Input
          value={newObjective.name}
          onChange={event => setNewObjective(current => ({ ...current, name: event.target.value }))}
          disabled={isSubmitting}
          placeholder="Ej. Repartir alimentos"
        />
        <Textarea
          value={newObjective.description}
          onChange={event => setNewObjective(current => ({ ...current, description: event.target.value }))}
          disabled={isSubmitting}
          placeholder="Explica qué se quiere conseguir con este objetivo"
          className="min-h-24"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <Input
            type="number"
            min={1}
            value={newObjective.quantity}
            onChange={event => setNewObjective(current => ({ ...current, quantity: Number(event.target.value) }))}
            disabled={isSubmitting}
            placeholder="Ej. 50"
          />
          <Input
            value={newObjective.unit}
            onChange={event => setNewObjective(current => ({ ...current, unit: event.target.value }))}
            disabled={isSubmitting}
            placeholder="Ej. personas, kg, cajas"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          disabled={isSubmitting}
          onClick={addObjective}
          className="mx-auto cursor-pointer gap-2 px-3 text-emerald-600"
        >
          <IconPlus />
          Agregar objetivo
        </Button>
      </div>
    </RequestSectionCard>
  );
}
