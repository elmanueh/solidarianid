import { Injectable } from '@nestjs/common';
import { Community } from 'apps/communities/src/domain/model/aggregates/community';
import { CommunitiesRepository } from 'apps/communities/src/domain/ports/communities.repository';

@Injectable()
export class CommunitiesRepositoryImpl extends CommunitiesRepository {
  // TODO: Implementar los metodos del repositorio
  getAllCommunitiesSummary(): Promise<Community[]> {
    throw new Error('Method not implemented.');
  }
  save(obj: Community): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Community> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
