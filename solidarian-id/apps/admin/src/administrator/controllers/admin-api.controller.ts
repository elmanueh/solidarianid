import { Controller } from '@nestjs/common';
import { AdminService } from '../model/services/admin.service';

/**
 * Controlador API para administración
 * Maneja las peticiones REST del panel de administración
 */
@Controller('admins')
export class AdminApiController {
  constructor(private readonly adminService: AdminService) {}

  /* ANTONIO: PETICIONES DEL ADMIN PARA LOS DATOS */
}
