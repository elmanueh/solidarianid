'use client';

import { Button } from '@base-ui/react';
import { IconCheck } from '@tabler/icons-react';

interface PersonalInfoSubmitButtonProps {
  disabled: boolean;
  isSubmitting: boolean;
}

export function PersonalInfoSubmitButton({ disabled, isSubmitting }: Readonly<PersonalInfoSubmitButtonProps>) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-4 text-sm font-bold text-white shadow-sm transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <IconCheck size={18} />
      {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
    </Button>
  );
}
