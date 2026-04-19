'use client';

import { RequestFormLayout } from '@/components/requests/request-form-layout';
import { RequestSectionCard } from '@/components/requests/request-section-card';
import { Button, Input, Textarea } from '@/components/ui';
import useCommunityRequestForm from '@/hooks/forms/use-community-request-form';
import { IconPlus, IconTrash } from '@tabler/icons-react';

export default function FavoritesRequestCreatePage() {
  const { handleSubmit, isSubmitting, setValues, values, odsOptions, addCause, removeCause, updateCause } =
    useCommunityRequestForm();

  return (
    <RequestFormLayout variant="community">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <RequestSectionCard
          title="Nombre de la comunidad *"
          description="Elige un nombre claro y representativo para la comunidad."
        >
          <Input
            id="community-request-name"
            disabled={isSubmitting}
            value={values.name}
            onChange={event => setValues(current => ({ ...current, name: event.target.value }))}
            placeholder="Ej: Voluntarios por la Educacion"
          />
        </RequestSectionCard>

        <RequestSectionCard
          title="Descripcion de la comunidad *"
          description="Explica la mision y el impacto que esperas lograr con esta comunidad."
        >
          <Textarea
            id="community-request-description"
            disabled={isSubmitting}
            value={values.description}
            onChange={event => setValues(current => ({ ...current, description: event.target.value }))}
            placeholder="Describe el proposito, a quien ayuda y como se organizara la comunidad."
            className="min-h-24"
          />
        </RequestSectionCard>

        <RequestSectionCard
          title="Causas de la comunidad *"
          description="Puedes proponer una o varias causas iniciales para la comunidad."
        >
          <div className="flex flex-col gap-5">
            {values.causes.map((cause, index) => (
              <div key={`community-cause-${index}`} className="rounded-xl border border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Causa #{index + 1}</p>
                  {values.causes.length > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={isSubmitting}
                      onClick={() => removeCause(index)}
                      className="text-destructive"
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

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <label
                        className="text-xs font-semibold text-muted-foreground"
                        htmlFor={`community-request-cause-ods-${index}`}
                      >
                        ODS principal
                      </label>
                      <select
                        id={`community-request-cause-ods-${index}`}
                        disabled={isSubmitting}
                        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                        value={cause.ods}
                        onChange={event =>
                          updateCause(index, {
                            ...cause,
                            ods: event.target.value as (typeof odsOptions)[number],
                          })
                        }
                      >
                        {odsOptions.map(odsOption => (
                          <option key={odsOption} value={odsOption}>
                            {odsOption}
                          </option>
                        ))}
                      </select>
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
                        onChange={event =>
                          updateCause(index, {
                            ...cause,
                            initialDate: event.target.value,
                          })
                        }
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

            <Button type="button" variant="outline" disabled={isSubmitting} onClick={addCause} className="w-full">
              <IconPlus size={16} />
              Añadir otra causa
            </Button>
          </div>
        </RequestSectionCard>

        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
          {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
        </Button>
      </form>
    </RequestFormLayout>
  );
}
