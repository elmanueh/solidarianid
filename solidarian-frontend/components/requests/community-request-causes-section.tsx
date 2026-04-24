'use client';

import { RequestSectionCard } from '@/components/requests/request-section-card';
import { Badge, Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@/components/ui';
import { OdsId, OdsOption } from '@/features/causes/constants/ods.constants';
import { IconCheck, IconChevronDown, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

interface CauseSectionItem {
  name: string;
  description: string;
  ods: OdsId[];
  initialDate: string;
  durationDays: number;
}

interface CauseSectionProps {
  causes: CauseSectionItem[];
  odsOptions: ReadonlyArray<OdsOption>;
  isSubmitting: boolean;
  addCause: () => void;
  removeCause: (index: number) => void;
  updateCause: (index: number, cause: CauseSectionItem) => void;
}

export default function CommunityRequestCausesSection({
  causes,
  odsOptions,
  isSubmitting,
  addCause,
  removeCause,
  updateCause,
}: Readonly<CauseSectionProps>) {
  const [odsSearchByCause, setOdsSearchByCause] = useState<Record<number, string>>({});

  return (
    <RequestSectionCard
      title="Causas de la comunidad *"
      description="Puedes proponer una o varias causas iniciales para la comunidad."
    >
      <div className="flex flex-col gap-5 rounded-2xl border border-dashed border-border bg-muted/30 p-4">
        {causes.map((cause, index) => (
          <div key={`community-cause-${index}`} className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Causa #{index + 1}</p>
              {causes.length > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={isSubmitting}
                  onClick={() => removeCause(index)}
                  className="cursor-pointer text-destructive"
                >
                  <IconTrash size={14} />
                  Eliminar
                </Button>
              ) : null}
            </div>

            <div className="grid gap-3">
              <Input
                id={`community-request-cause-name-${index}`}
                disabled={isSubmitting}
                value={cause.name}
                onChange={event =>
                  updateCause(index, {
                    ...cause,
                    name: event.target.value,
                  })
                }
                placeholder="Nombre de la causa"
              />

              <Textarea
                id={`community-request-cause-description-${index}`}
                disabled={isSubmitting}
                value={cause.description}
                onChange={event =>
                  updateCause(index, {
                    ...cause,
                    description: event.target.value,
                  })
                }
                placeholder="Describe el objetivo de la causa"
                className="min-h-20"
              />

              <div className="grid grid-cols-1 gap-3 lg:items-start xl:grid-cols-2">
                <div className="grid gap-1.5">
                  <label
                    className="text-xs font-semibold text-muted-foreground"
                    htmlFor={`community-request-cause-ods-${index}`}
                  >
                    ODS principales
                  </label>
                  <Popover>
                    <PopoverTrigger
                      type="button"
                      id={`community-request-cause-ods-${index}`}
                      disabled={isSubmitting}
                      className="flex h-auto min-h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm md:m-0"
                    >
                      <span className="line-clamp-1 text-left text-muted-foreground">
                        {cause.ods.length > 0
                          ? `${cause.ods.length} ODS seleccionado${cause.ods.length > 1 ? 's' : ''}`
                          : 'Selecciona uno o varios ODS'}
                      </span>
                      <IconChevronDown size={16} className="text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-(--anchor-width) max-w-[calc(100vw-2rem)] min-w-0 p-4"
                      align="start"
                      sideOffset={6}
                    >
                      <Input
                        value={odsSearchByCause[index] ?? ''}
                        onChange={event =>
                          setOdsSearchByCause(current => ({
                            ...current,
                            [index]: event.target.value,
                          }))
                        }
                        placeholder="Buscar ODS..."
                        className="h-9 w-full"
                      />

                      <div className="mt-2 max-h-72 space-y-1 overflow-y-auto">
                        {odsOptions
                          .filter(odsOption => {
                            const query = (odsSearchByCause[index] ?? '').trim().toLowerCase();
                            if (!query) return true;
                            return (
                              odsOption.label.toLowerCase().includes(query) || odsOption.id.toString().includes(query)
                            );
                          })
                          .map(odsOption => {
                            const isSelected = cause.ods.includes(odsOption.id);

                            return (
                              <button
                                key={odsOption.id}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => {
                                  const nextOds = isSelected
                                    ? cause.ods.filter(currentOds => currentOds !== odsOption.id)
                                    : [...cause.ods, odsOption.id];

                                  updateCause(index, {
                                    ...cause,
                                    ods: nextOds,
                                  });
                                }}
                                className="flex w-full touch-manipulation items-center justify-between rounded-md px-2 py-2 text-left text-xs hover:bg-muted"
                              >
                                <span>{odsOption.label}</span>
                                {isSelected ? <IconCheck size={14} className="text-brand-500" /> : null}
                              </button>
                            );
                          })}
                      </div>
                    </PopoverContent>
                  </Popover>

                  {cause.ods.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {cause.ods.map(selectedOds => {
                        const option = odsOptions.find(odsOption => odsOption.id === selectedOds);
                        return (
                          <Badge
                            key={selectedOds}
                            variant="outline"
                            className="h-auto max-w-full overflow-visible px-2 py-1 text-left text-[11px] leading-snug wrap-break-word whitespace-normal"
                          >
                            {option?.label ?? selectedOds}
                          </Badge>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-1.5">
                  <label
                    className="text-xs font-semibold text-muted-foreground"
                    htmlFor={`community-request-cause-date-${index}`}
                  >
                    Fecha inicio
                  </label>
                  <Input
                    id={`community-request-cause-date-${index}`}
                    type="date"
                    disabled={isSubmitting}
                    value={cause.initialDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={event =>
                      updateCause(index, {
                        ...cause,
                        initialDate: event.target.value,
                      })
                    }
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <label
                  className="text-xs font-semibold text-muted-foreground"
                  htmlFor={`community-request-cause-duration-${index}`}
                >
                  Duracion (dias)
                </label>
                <Input
                  id={`community-request-cause-duration-${index}`}
                  type="number"
                  min={1}
                  disabled={isSubmitting}
                  value={cause.durationDays}
                  onChange={event =>
                    updateCause(index, {
                      ...cause,
                      durationDays: Number(event.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          disabled={isSubmitting}
          onClick={addCause}
          className="mx-auto cursor-pointer gap-2 px-3 text-pink-600"
        >
          <IconPlus />
          Añadir otra causa
        </Button>
      </div>
    </RequestSectionCard>
  );
}
