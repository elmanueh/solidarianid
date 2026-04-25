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
  FieldSeparator,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Separator,
} from '@/components/ui';
import {
  PASSWORD_COMPLEXITY_REGEX,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from '@/features/auth/constants/auth.constants';
import { authService } from '@/features/auth/services/auth.service';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { handleLogin } from '@/features/redux/userSlice';
import { ROUTES } from '@/features/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandGoogle, IconBrandGoogleFilled, IconEye, IconEyeOff, IconLogin2 } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import * as z from 'zod';

const loginFormSchema = z.object({
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`)
    .max(USERNAME_MAX_LENGTH, `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`)
    .regex(USERNAME_REGEX, 'Username must contain only letters and numbers.'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`)
    .regex(
      PASSWORD_COMPLEXITY_REGEX,
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
    ),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    try {
      const user = await authService.login(data.username, data.password);
      dispatch(handleLogin(user));
      router.push(ROUTES.app.home);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  async function onOauthSubmit() {}

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden text-white lg:block">
        <Image
          src={'/fondo-login.jpeg'}
          alt="Background"
          fill
          sizes="50vw"
          loading="eager"
          className="object-cover blur-xs"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40" />

        <div className="absolute m-4 flex items-center gap-4">
          <Image
            src={'/solidarian-logo.png'}
            alt="SOLIDARIAN"
            width={48}
            height={48}
            className="bg-gray rounded-2xl border p-1.5"
          />

          <h1 className="font-bold">Solidarian ID</h1>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <h2 className="max-w-xl text-center text-5xl font-bold">Conectando personas con propósitos reales.</h2>
          <p className="max-w-sm text-center text-lg">
            Únete a la red global donde cada acción cuenta y cada aporte transforma realidades.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm sm:max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Inicia Sesión</CardTitle>
            <CardDescription>Accede a tu panel de impacto social</CardDescription>
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
            <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
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
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter>
            <Field>
              <Button type="submit" form="form-login" disabled={isLoading}>
                <IconLogin2 />
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>

              <FieldSeparator>
                <span>o</span>
              </FieldSeparator>

              <Button type="submit" onSubmit={onOauthSubmit}>
                <IconBrandGoogle stroke={2} />
                Iniciar sesión con Google
              </Button>

              <FieldDescription className="text-center">
                ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
              </FieldDescription>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
