import logoSolidarian from "@/assets/solidarian-logo.png";
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
} from "@/components/ui";
import { getErrorMessage } from "@/modules/axios/errors.handler";
import { IconEye, IconEyeOff, IconLogin2 } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const user = await authService.register(
      //   fullName,
      //   username,
      //   password,
      //   mobilePhone,
      //   city,
      //   countryCode,
      // );
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm sm:max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">SolidarianID</CardTitle>
          <CardDescription>
            Regístrate con tu nombre de usuario y contraseña
          </CardDescription>
          <CardAction>
            <img src={logoSolidarian} alt="SOLIDARIAN" className="h-20 w-20" />
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
                  onChange={(e) => setFullName(e.target.value)}
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
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <article className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </Button>
                </article>
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  placeholder="123456789"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
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
                  onChange={(e) => setCity(e.target.value)}
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
                  onChange={(e) => setCountryCode(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading}>
                  <IconLogin2 />
                  {isLoading ? "Registrando..." : "Registrarse"}
                </Button>

                <FieldDescription className="text-center">
                  ¿No tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
