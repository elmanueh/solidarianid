'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ODS_OPTIONS, OdsId } from '@/features/causes/constants/ods.constants';
import { ExploreMode, ExploreSort } from '@/features/explore/model/explore.types';
import { cn } from '@/lib/utils';
import { IconArrowDown, IconArrowUp, IconSearch } from '@tabler/icons-react';
import { KeyboardEvent } from 'react';

type ExploreControlsProps = {
  mode: ExploreMode;
  draftSearch: string;
  sort: ExploreSort;
  selectedOds: OdsId[];
  onDraftSearchChange: (value: string) => void;
  onSearchCommit: () => void;
  onToggleSort: () => void;
  onToggleOds: (ods: OdsId) => void;
  onClearOds: () => void;
};

export function ExploreControls({
  mode,
  draftSearch,
  sort,
  selectedOds,
  onDraftSearchChange,
  onSearchCommit,
  onToggleSort,
  onToggleOds,
  onClearOds,
}: Readonly<ExploreControlsProps>) {
  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    onSearchCommit();
  };

  return (
    <section className="'flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm lg:p-5">
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,60%)_minmax(0,40%)] lg:items-stretch">
        <div className="flex w-full items-stretch gap-0">
          <div className="min-w-0 flex-1">
            <InputGroup className="h-12 rounded-s-[1.6rem] rounded-e-none border-border bg-background shadow-xs ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-chart-2/30 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-chart-2/15">
              <InputGroupAddon>
                <InputGroupText className="text-[11px] font-black tracking-[0.1em] text-muted-foreground uppercase">
                  <IconSearch size={16} />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                className="text-[11px] font-bold tracking-[0.08em] uppercase placeholder:font-bold placeholder:tracking-[0.08em] placeholder:uppercase"
                value={draftSearch}
                onChange={event => onDraftSearchChange(event.target.value)}
                onBlur={onSearchCommit}
                onKeyDown={handleSearchKeyDown}
                placeholder="BUSCAR POR NOMBRE"
                aria-label="BUSCAR POR NOMBRE"
              />
            </InputGroup>
          </div>

          <Button
            type="button"
            className="h-12 rounded-s-none rounded-e-[1.6rem] border border-sidebar-primary/20 bg-sidebar-primary px-5 text-[10px] font-black tracking-[0.18em] text-sidebar-primary-foreground uppercase shadow-md shadow-sidebar-primary/20 hover:bg-sidebar-primary/90"
            onClick={onSearchCommit}
          >
            <IconSearch size={14} />
            BUSCAR
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:min-w-0 lg:justify-end">
          <Button
            type="button"
            variant="outline"
            className={cn(
              'h-12 min-w-42 rounded-[1.6rem] border border-chart-2/20 bg-chart-2/5 px-4 text-[10px] font-black tracking-[0.18em] uppercase shadow-xs hover:bg-chart-2/10',
              sort === 'name_asc' ? 'text-chart-2' : 'text-sidebar-primary'
            )}
            onClick={onToggleSort}
          >
            {sort === 'name_asc' ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />}
            {sort === 'name_asc' ? 'NOMBRE ASC' : 'NOMBRE DES'}
          </Button>

          {mode === 'causes' ? (
            <>
              {selectedOds.length > 0 ? (
                <div className="inline-flex items-stretch">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 min-w-32 rounded-s-[1.3rem] rounded-e-none border border-border bg-background px-3 text-[10px] font-black tracking-[0.14em] text-muted-foreground uppercase shadow-xs hover:bg-muted hover:text-foreground"
                    onClick={onClearOds}
                  >
                    LIMPIAR ODS
                  </Button>
                  <Popover>
                    <PopoverTrigger
                      render={<button type="button" />}
                      className={cn(
                        'h-11 min-w-44 rounded-s-none rounded-e-[1.3rem] border border-chart-2/20 bg-chart-2/5 px-4 text-[10px] font-black tracking-[0.16em] text-chart-2 uppercase shadow-xs hover:bg-chart-2/10',
                        'border-chart-2/20 bg-chart-2/5 text-chart-2'
                      )}
                    >
                      FILTRAR POR ODS ({selectedOds.length})
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-86 rounded-2xl border border-border bg-popover p-3 shadow-md"
                      align="end"
                      sideOffset={8}
                    >
                      <p className="text-[10px] font-black tracking-[0.16em] text-foreground uppercase">
                        OBJETIVOS DE DESARROLLO SOSTENIBLE
                      </p>
                      <div className="mt-2 max-h-64 space-y-1 overflow-auto pr-1">
                        {ODS_OPTIONS.map(option => {
                          const isChecked = selectedOds.includes(option.id);
                          return (
                            <label
                              key={option.id}
                              className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted"
                            >
                              <Checkbox checked={isChecked} onCheckedChange={() => onToggleOds(option.id)} />
                              <span className="text-[10px] font-bold tracking-[0.08em] text-foreground uppercase">
                                ODS {option.id} · {option.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger
                    render={<button type="button" />}
                    className={cn(
                      'h-11 min-w-44 rounded-[1.3rem] border border-border bg-background px-4 text-[10px] font-black tracking-[0.16em] text-muted-foreground uppercase shadow-xs hover:bg-muted',
                      selectedOds.length > 0 ? 'border-chart-2/20 bg-chart-2/5 text-chart-2' : undefined
                    )}
                  >
                    FILTRAR POR ODS
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-86 rounded-2xl border border-border bg-popover p-3 shadow-md"
                    align="end"
                    sideOffset={8}
                  >
                    <p className="text-[10px] font-black tracking-[0.16em] text-foreground uppercase">
                      OBJETIVOS DE DESARROLLO SOSTENIBLE
                    </p>
                    <div className="mt-2 max-h-64 space-y-1 overflow-auto pr-1">
                      {ODS_OPTIONS.map(option => {
                        const isChecked = selectedOds.includes(option.id);
                        return (
                          <label
                            key={option.id}
                            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted"
                          >
                            <Checkbox checked={isChecked} onCheckedChange={() => onToggleOds(option.id)} />
                            <span className="text-[10px] font-bold tracking-[0.08em] text-foreground uppercase">
                              ODS {option.id} · {option.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
