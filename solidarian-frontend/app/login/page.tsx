"use client"

import logoSolidarian from "@/public/solidarian-logo.png"
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
} from "@/components/ui"
import { authService } from "@/features/auth/services/auth.service"
import { getErrorMessage } from "@/features/axios/errors.handler"
import { IconEye, IconEyeOff, IconLogin2 } from "@tabler/icons-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await authService.login(username, password)
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
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Nombre de usuario</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="pabloperiss"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <InputGroupAddon align="inline-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading}>
                  <IconLogin2 />
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>

                <FieldDescription className="text-center">
                  ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
