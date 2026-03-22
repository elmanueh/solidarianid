"use client"

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
} from "@/components/ui"
import {
  PASSWORD_COMPLEXITY_REGEX,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from "@/features/auth/constants/auth.constants"
import { authService } from "@/features/auth/services/auth.service"
import { getErrorMessage } from "@/features/axios/errors.handler"
import logoSolidarian from "@/public/solidarian-logo.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconEye, IconEyeOff, IconLogin2 } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  username: z
    .string()
    .min(
      USERNAME_MIN_LENGTH,
      `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`
    )
    .max(
      USERNAME_MAX_LENGTH,
      `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`
    )
    .regex(USERNAME_REGEX, "Username must contain only letters and numbers."),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
    )
    .regex(
      PASSWORD_COMPLEXITY_REGEX,
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
    ),
})

type LoginFormData = z.infer<typeof formSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  })

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true)
    try {
      await authService.login(data.username, data.password)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm sm:max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">SolidarianID</CardTitle>
          <CardDescription>
            Inicia sesión con tu nombre de usuario y contraseña
          </CardDescription>
          <CardAction>
            <Image
              src={logoSolidarian}
              alt="SOLIDARIAN"
              width={80}
              height={80}
              className="h-20 w-20"
              loading="eager"
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
                    <FieldLabel htmlFor={field.name}>
                      Nombre de usuario
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      disabled={isLoading}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                        type={showPassword ? "text" : "password"}
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>

            <FieldDescription className="text-center">
              ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
