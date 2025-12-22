import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Injectable } from '@nestjs/common';
import { Administrator } from 'apps/admin/src/administrator/model/domain/model/administrator';
import { AdministratorRepositoryPort } from 'apps/admin/src/administrator/model/domain/ports/output/administrator.repository.port';

@Injectable()
export class AdministratorRepositoryAdapter extends AdministratorRepositoryPort {
  findByEmail(
    email: string,
  ): Promise<Either<RepositoryException, Administrator>> {
    this.items.forEach((admin) => {
      if (admin.email === email) {
        return Promise.resolve(right(admin));
      }
    });
    return Promise.resolve(
      left(new EntityNotFoundException('Administrator', email)),
    );
  }
}
