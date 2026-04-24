'use client';

import { motion } from 'framer-motion';
import type { UseFormRegister } from 'react-hook-form';

import type { CountryOption, PersonalInfoFieldConfig, PersonalInfoFormValues } from './personal-info.types';

interface PersonalInfoFieldProps {
  field: PersonalInfoFieldConfig;
  register: UseFormRegister<PersonalInfoFormValues>;
  errorMessage?: string;
  disabled: boolean;
  countryOptions: CountryOption[];
  delay: number;
  controlClassName: string;
}

function renderControl(
  field: PersonalInfoFieldConfig,
  register: UseFormRegister<PersonalInfoFormValues>,
  disabled: boolean,
  countryOptions: CountryOption[],
  errorId: string,
  controlClassName: string,
  hasError: boolean
) {
  if (field.type === 'select') {
    return (
      <select
        id={field.key}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        disabled={disabled}
        className={`${controlClassName} appearance-none pr-10`}
        {...register(field.key)}
      >
        <option value="">{field.placeholder}</option>
        {countryOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.value})
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={field.key}
      type={field.type}
      placeholder={field.placeholder}
      aria-invalid={hasError}
      aria-describedby={hasError ? errorId : undefined}
      disabled={disabled}
      className={controlClassName}
      {...register(field.key)}
    />
  );
}

export function PersonalInfoField({
  field,
  register,
  errorMessage,
  disabled,
  countryOptions,
  delay,
  controlClassName,
}: Readonly<PersonalInfoFieldProps>) {
  const errorId = `${field.key}-error`;
  const hasError = Boolean(errorMessage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col gap-2 border-b border-border/60 p-5 last:border-b-0"
    >
      <label
        htmlFor={field.key}
        className="flex items-center gap-3 text-[10px] font-black tracking-[0.22em] text-muted-foreground uppercase"
      >
        <span className="text-muted-foreground">{field.icon}</span>
        {field.label}
      </label>

      {renderControl(field, register, disabled, countryOptions, errorId, controlClassName, hasError)}

      {errorMessage ? (
        <span id={errorId} className="text-xs font-semibold text-destructive">
          {errorMessage}
        </span>
      ) : null}
    </motion.div>
  );
}
