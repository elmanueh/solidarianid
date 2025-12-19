import { Controller } from '@nestjs/common';
import { AuthService } from '../model/services/auth.service';

/**
 * Controlador API para autenticación
 * Maneja las peticiones REST de autenticación
 */
@Controller('auth')
export class AuthApiController {
  constructor(private readonly authService: AuthService) {}

  /* FABIÁN: Aquí implementar la lógica de autenticación */
}
