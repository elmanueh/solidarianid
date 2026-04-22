'use client';

import {
  COUNTRY_CODE_LENGTH,
  COUNTRY_CODE_REGEX,
  FULLNAME_MAX_LENGTH,
  FULLNAME_MIN_LENGTH,
  FULLNAME_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from '@/features/auth/constants/auth.constants';
import { authService, type UpdateUserProfilePayload } from '@/features/auth/services/auth.service';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { useAppDispatch, useAppSelector } from '@/features/redux/redux-hook';
import { updateCurrentUser } from '@/features/redux/userSlice';
import { ROUTES } from '@/features/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAt, IconMapPin, IconPhone, IconUser, IconWorld } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import countryList from 'react-select-country-list';
import { toast } from 'sonner';
import * as z from 'zod';

import { PersonalInfoField } from '@/components/profile/personal-info/personal-info-field';
import { PersonalInfoFormHeader } from '@/components/profile/personal-info/personal-info-form-header';
import { PersonalInfoSubmitButton } from '@/components/profile/personal-info/personal-info-submit-button';
import type {
  CountryOption,
  PersonalInfoFieldConfig,
  PersonalInfoFormValues,
} from '@/components/profile/personal-info/personal-info.types';

const personalInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(FULLNAME_MIN_LENGTH, `El nombre completo debe tener al menos ${FULLNAME_MIN_LENGTH} caracteres.`)
    .max(FULLNAME_MAX_LENGTH, `El nombre completo no puede superar ${FULLNAME_MAX_LENGTH} caracteres.`)
    .regex(FULLNAME_REGEX, 'El nombre completo solo puede contener letras y espacios.'),
  username: z
    .string()
    .trim()
    .min(USERNAME_MIN_LENGTH, `El nombre de usuario debe tener al menos ${USERNAME_MIN_LENGTH} caracteres.`)
    .max(USERNAME_MAX_LENGTH, `El nombre de usuario no puede superar ${USERNAME_MAX_LENGTH} caracteres.`)
    .regex(USERNAME_REGEX, 'El nombre de usuario solo puede contener letras, números, puntos y guiones bajos.'),
  mobilePhone: z
    .string()
    .trim()
    .min(6, 'Introduce un teléfono válido.')
    .max(24, 'El teléfono no puede superar 24 caracteres.')
    .refine(value => value.replace(/\D/g, '').length >= 6, 'Introduce un teléfono válido.'),
  city: z.string().trim().min(1, 'Introduce una ciudad válida.').max(25, 'La ciudad no puede superar 25 caracteres.'),
  countryCode: z
    .string()
    .trim()
    .length(COUNTRY_CODE_LENGTH, 'Selecciona un país válido.')
    .regex(COUNTRY_CODE_REGEX, 'El código de país debe tener dos letras mayúsculas.'),
});

const EMPTY_VALUES: PersonalInfoFormValues = {
  fullName: '',
  username: '',
  mobilePhone: '',
  city: '',
  countryCode: '',
};

const PERSONAL_INFO_FIELDS: PersonalInfoFieldConfig[] = [
  {
    key: 'fullName',
    label: 'Nombre completo',
    type: 'text',
    icon: <IconUser size={18} />,
    placeholder: 'Nombre y apellidos',
  },
  {
    key: 'username',
    label: 'Nombre de usuario',
    type: 'text',
    icon: <IconAt size={18} />,
    placeholder: 'Nombre de usuario único',
  },
  {
    key: 'mobilePhone',
    label: 'Teléfono móvil',
    type: 'tel',
    icon: <IconPhone size={18} />,
    placeholder: '+34 600 000 000',
  },
  {
    key: 'city',
    label: 'Ciudad',
    type: 'text',
    icon: <IconMapPin size={18} />,
    placeholder: 'Murcia',
  },
  {
    key: 'countryCode',
    label: 'Código de país',
    type: 'select',
    icon: <IconWorld size={18} />,
    placeholder: 'Selecciona un país',
  },
];

const FIELD_CONTROL_CLASSNAME =
  'w-full rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm font-semibold text-brand-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-500 focus:bg-card disabled:cursor-not-allowed disabled:opacity-50';

export default function ProfileSettingsPersonalInfoPage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const countryOptions: CountryOption[] = useMemo(() => countryList().getData(), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: EMPTY_VALUES,
    mode: 'onTouched',
  });

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    reset({
      fullName: currentUser.fullName,
      username: currentUser.username,
      mobilePhone: currentUser.mobilePhone,
      city: currentUser.city,
      countryCode: currentUser.countryCode,
    });
  }, [currentUser, reset]);

  const onSubmit = handleSubmit(
    async values => {
      if (!currentUser) {
        toast.error('No se pudo cargar el usuario actual.');
        return;
      }

      const payload: UpdateUserProfilePayload = {
        fullName: values.fullName.trim(),
        username: values.username.trim(),
        mobilePhone: values.mobilePhone.trim(),
        city: values.city.trim(),
        countryCode: values.countryCode.trim().toUpperCase(),
      };

      try {
        await authService.updateUserProfile(currentUser.id, payload);
        dispatch(updateCurrentUser(payload));
        reset(payload);
        toast.success('Información personal actualizada correctamente.');
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    () => {
      toast.error('Revisa los campos marcados.');
    }
  );

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 pb-24 lg:px-6">
      <PersonalInfoFormHeader
        backUrl={ROUTES.app.profile}
        eyebrow="Perfil"
        title="Información personal"
        description="Actualiza los datos públicos de tu cuenta y mantén sincronizada la información que SolidarianID usa para identificarte."
      />

      <motion.form
        onSubmit={onSubmit}
        noValidate
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col gap-6"
      >
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
          {PERSONAL_INFO_FIELDS.map((field, index) => {
            const fieldErrorMessage = errors[field.key]?.message;

            return (
              <PersonalInfoField
                key={field.key}
                field={field}
                register={register}
                errorMessage={fieldErrorMessage}
                disabled={!currentUser || isSubmitting}
                countryOptions={countryOptions}
                delay={index * 0.05}
                controlClassName={FIELD_CONTROL_CLASSNAME}
              />
            );
          })}
        </div>

        <PersonalInfoSubmitButton disabled={!currentUser || !isDirty || isSubmitting} isSubmitting={isSubmitting} />
      </motion.form>
    </section>
  );
}
