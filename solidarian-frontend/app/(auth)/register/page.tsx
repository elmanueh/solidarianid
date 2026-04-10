'use client';

import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { ROUTES } from '@/features/routes';
import { IconEye, IconEyeOff, IconLogin2 } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Conectar con authService.register
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm sm:max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">SolidarianID</CardTitle>
          <CardDescription>Regístrate con tu nombre de usuario y contraseña</CardDescription>
          <CardAction>
            <Image src="/solidarian-logo.png" alt="SOLIDARIAN" width={80} height={80} className="h-20 w-20" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Pablo Peris Solano"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="username">Nombre de usuario</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="pabloperiss"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <InputGroupAddon align="inline-end">
                    <Button type="button" variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  placeholder="123456789"
                  value={mobilePhone}
                  onChange={e => setMobilePhone(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="city">Ciudad</FieldLabel>
                <Input
                  id="city"
                  type="text"
                  placeholder="Madrid"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="countryCode">Código de país</FieldLabel>
                <Input
                  id="countryCode"
                  type="text"
                  placeholder="ES"
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading}>
                  <IconLogin2 />
                  {isLoading ? 'Registrando...' : 'Registrarse'}
                </Button>

                <FieldDescription className="text-center">
                  ¿Ya tienes cuenta? <Link href={ROUTES.auth.login}>Inicia sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
