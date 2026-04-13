'use client';

import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui';
import {
  CITY_MAX_LENGTH,
  CITY_MIN_LENGTH,
  COUNTRY_CODE_LENGTH,
  COUNTRY_CODE_REGEX,
  FULLNAME_MAX_LENGTH,
  FULLNAME_MIN_LENGTH,
  FULLNAME_REGEX,
  PASSWORD_COMPLEXITY_REGEX,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from '@/features/auth/constants/auth.constants';
import { authService } from '@/features/auth/services/auth.service';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconEye, IconEyeOff, IconLogin2 } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countryList from 'react-select-country-list';
import { toast } from 'sonner';
import z from 'zod';

const registerFormSchema = z.object({
  fullName: z
    .string()
    .min(FULLNAME_MIN_LENGTH, `Full name must be at least ${FULLNAME_MIN_LENGTH} characters long.`)
    .max(FULLNAME_MAX_LENGTH, `Full name must not exceed ${FULLNAME_MAX_LENGTH} characters.`)
    .regex(FULLNAME_REGEX, 'Full name must contain only letters and spaces.'),

  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`)
    .max(USERNAME_MAX_LENGTH, `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`)
    .regex(USERNAME_REGEX, 'Username must contain only letters and numbers.'),

  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`)
    .regex(
      PASSWORD_COMPLEXITY_REGEX,
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
    ),

  city: z
    .string()
    .min(CITY_MIN_LENGTH, `City must be at least ${CITY_MIN_LENGTH} characters long.`)
    .max(CITY_MAX_LENGTH, `City must not exceed ${CITY_MAX_LENGTH} characters.`),

  countryCode: z
    .string()
    .length(COUNTRY_CODE_LENGTH, 'Select a country.')
    .regex(COUNTRY_CODE_REGEX, 'Country code must be a valid ISO 3166-1 alpha-2 code (e.g., ES, US, MX).'),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [phoneInputStyle, setPhoneInputStyle] = useState({});
  const [dropdownStyle, setDropdownStyle] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setPhoneInputStyle({
      backgroundColor: 'var(--color-input)',
      color: 'var(--foreground)',
      borderColor: 'var(--border)',
      borderRadius: '1rem',
    });
    setDropdownStyle({
      backgroundColor: 'lightgray',
      color: 'black',
    });
  }, []);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
      city: '',
      countryCode: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    try {
      const cleanPhone = '+' + phone;
      await authService.register(data.username, data.password, data.fullName, cleanPhone, data.city, data.countryCode);
      toast.success('Registro exitoso! Ahora puedes iniciar sesión.');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm sm:max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Crea tu cuenta</CardTitle>
            <CardDescription>Únete a la mayor red de impacto social del mundo</CardDescription>
            <CardAction>
              <Image
                src={'/solidarian-logo.png'}
                alt="SOLIDARIAN"
                width={50}
                height={50}
                style={{ width: 'auto', height: 'auto' }}
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            <form id="registerForm" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="flex flex-col gap-10 sm:flex-row">
                  <div className="flex flex-col gap-5">
                    <Controller
                      name="fullName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Nombre completo</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="text"
                            placeholder="Pablo Peris Solano"
                            aria-invalid={fieldState.invalid}
                            disabled={isLoading}
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              {...field}
                              id={field.name}
                              type={showPassword ? 'text' : 'password'}
                              aria-invalid={fieldState.invalid}
                              disabled={isLoading}
                            />
                            <InputGroupAddon align="inline-end">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                              >
                                {showPassword ? <IconEyeOff /> : <IconEye />}
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    <Controller
                      name="countryCode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>País</FieldLabel>
                          <select
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            disabled={isLoading}
                            className="w-full rounded-xl border bg-input px-2 py-2"
                          >
                            <option value="">Selecciona un país</option>
                            {options.map((option: { value: string; label: string }) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-5">
                    <Controller
                      name="username"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Nombre de usuario</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="text"
                            aria-invalid={fieldState.invalid}
                            disabled={isLoading}
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    <Field>
                      <FieldLabel>Teléfono</FieldLabel>
                      <PhoneInput
                        country="es"
                        value={phone}
                        onChange={value => {
                          setPhone(value);
                        }}
                        inputStyle={phoneInputStyle}
                        buttonStyle={phoneInputStyle}
                        dropdownStyle={dropdownStyle}
                      />
                    </Field>

                    <Controller
                      name="city"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Ciudad</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="text"
                            placeholder="Murcia"
                            aria-invalid={fieldState.invalid}
                            disabled={isLoading}
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>
                </div>
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter>
            <Field>
              <Button type="submit" form="registerForm" disabled={isLoading}>
                <IconLogin2 />
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </Button>

              <FieldDescription className="text-center">
                Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
              </FieldDescription>
            </Field>
          </CardFooter>
        </Card>
      </div>

      <div className="relative hidden text-white lg:block">
        <Image
          src={'/fondo-register.jpeg'}
          alt="Background"
          fill
          sizes="50vw"
          loading="eager"
          className="object-cover blur-xs"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40" />

        <div className="absolute top-4 right-4 flex items-center gap-4">
          <h1 className="font-bold">Solidarian ID</h1>
          <Image
            src={'/solidarian-logo.png'}
            alt="SOLIDARIAN"
            width={48}
            height={48}
            className="bg-gray rounded-2xl border border-gray-500 p-1.5"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <h2 className="max-w-xl text-center text-5xl font-bold">Sé el cambio que quieres ver</h2>
          <p className="max-w-sm text-center text-lg">Crea una cuenta para empezar a ser solidario</p>
        </div>
      </div>
    </div>
  );
}
