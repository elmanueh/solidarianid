import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1775558435504 implements MigrationInterface {
  name = 'Auto1775558435504';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "auth_refresh_tokens" DROP COLUMN "rotated_at"`);
    await queryRunner.query(`ALTER TABLE "auth_refresh_tokens" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "auth_refresh_tokens" ADD "refreshed_at" TIMESTAMP WITH TIME ZONE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "auth_refresh_tokens" DROP COLUMN "refreshed_at"`);
    await queryRunner.query(
      `ALTER TABLE "auth_refresh_tokens" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "auth_refresh_tokens" ADD "rotated_at" TIMESTAMP WITH TIME ZONE`);
  }
}
