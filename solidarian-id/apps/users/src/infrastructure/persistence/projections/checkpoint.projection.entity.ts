import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'checkpoint_projection' })
export class CheckpointProjectionEntity {
  @PrimaryColumn({ name: 'projection_name' })
  projectionName: string;

  @Column({ name: 'commit_position', type: 'bigint' })
  commitPosition: string;

  @Column({ name: 'prepare_position', type: 'bigint' })
  preparePosition: string;

  @Column({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
