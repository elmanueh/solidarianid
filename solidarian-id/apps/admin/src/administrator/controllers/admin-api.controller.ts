import { AdminService } from '@app/admin/administrator/model/application/services/admin.service';
import { Controller } from '@nestjs/common';

/**
 * Controlador API para administración
 * Maneja las peticiones REST del panel de administración
 */
@Controller('admins')
export class AdminApiController {
  constructor(private readonly adminService: AdminService) {}

  /* ANTONIO: PETICIONES DEL ADMIN PARA LOS DATOS */
}
