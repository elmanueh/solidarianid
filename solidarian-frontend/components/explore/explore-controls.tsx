'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ODS_OPTIONS } from '@/features/causes/constants/ods.constants';
import { ExploreMode, ExploreSort } from '@/features/explore/model/explore.types';
import { cn } from '@/lib/utils';
import { exploreControlsStyles } from '@/styles/components/explore-controls.styles';
import { IconArrowDown, IconArrowUp, IconSearch } from '@tabler/icons-react';
import { KeyboardEvent } from 'react';

type ExploreControlsProps = {
  mode: ExploreMode;
  draftSearch: string;
  sort: ExploreSort;
  selectedOds: string[];
  onDraftSearchChange: (value: string) => void;
  onSearchCommit: () => void;
  onToggleSort: () => void;
  onToggleOds: (ods: string) => void;
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
  const styles = exploreControlsStyles;

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    onSearchCommit();
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.searchAndButtonRow}>
          <div className={styles.searchWrapper}>
            <InputGroup className={styles.searchInputGroup}>
              <InputGroupAddon>
                <InputGroupText className={styles.searchInputText}>
                  <IconSearch size={16} />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                className={styles.searchInput}
                value={draftSearch}
                onChange={event => onDraftSearchChange(event.target.value)}
                onBlur={onSearchCommit}
                onKeyDown={handleSearchKeyDown}
                placeholder="BUSCAR POR NOMBRE"
                aria-label="BUSCAR POR NOMBRE"
              />
            </InputGroup>
          </div>

          <Button type="button" className={styles.searchButtonInline} onClick={onSearchCommit}>
            <IconSearch size={14} />
            BUSCAR
          </Button>
        </div>

        <div className={styles.actionsRow}>
          <Button
            type="button"
            variant="outline"
            className={cn(styles.sortButton, sort === 'name_asc' ? styles.sortAsc : styles.sortDesc)}
            onClick={onToggleSort}
          >
            {sort === 'name_asc' ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />}
            {sort === 'name_asc' ? 'NOMBRE ASC' : 'NOMBRE DES'}
          </Button>

          {mode === 'causes' ? (
            <>
              {selectedOds.length > 0 ? (
                <div className={styles.odsFilter.compoundWrapper}>
                  <Button
                    type="button"
                    variant="outline"
                    className={styles.odsFilter.clearInlineButton}
                    onClick={onClearOds}
                  >
                    LIMPIAR ODS
                  </Button>
                  <Popover>
                    <PopoverTrigger
                      render={<button type="button" />}
                      className={cn(styles.odsFilter.triggerInline, styles.odsFilter.triggerActive)}
                    >
                      FILTRAR POR ODS ({selectedOds.length})
                    </PopoverTrigger>
                    <PopoverContent className={styles.odsFilter.popover} align="end" sideOffset={8}>
                      <p className={styles.odsFilter.popoverTitle}>OBJETIVOS DE DESARROLLO SOSTENIBLE</p>
                      <div className={styles.odsFilter.popoverList}>
                        {ODS_OPTIONS.map(option => {
                          const isChecked = selectedOds.includes(option.value);
                          return (
                            <label key={option.value} className={styles.odsFilter.popoverItem}>
                              <Checkbox checked={isChecked} onCheckedChange={() => onToggleOds(option.value)} />
                              <span className={styles.odsFilter.popoverLabel}>
                                ODS {option.num} · {option.label}
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
                      styles.odsFilter.trigger,
                      selectedOds.length > 0 ? styles.odsFilter.triggerActive : undefined
                    )}
                  >
                    FILTRAR POR ODS
                  </PopoverTrigger>
                  <PopoverContent className={styles.odsFilter.popover} align="end" sideOffset={8}>
                    <p className={styles.odsFilter.popoverTitle}>OBJETIVOS DE DESARROLLO SOSTENIBLE</p>
                    <div className={styles.odsFilter.popoverList}>
                      {ODS_OPTIONS.map(option => {
                        const isChecked = selectedOds.includes(option.value);
                        return (
                          <label key={option.value} className={styles.odsFilter.popoverItem}>
                            <Checkbox checked={isChecked} onCheckedChange={() => onToggleOds(option.value)} />
                            <span className={styles.odsFilter.popoverLabel}>
                              ODS {option.num} · {option.label}
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
