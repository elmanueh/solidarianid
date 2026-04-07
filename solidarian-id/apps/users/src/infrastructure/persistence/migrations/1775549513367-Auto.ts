import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1775549513367 implements MigrationInterface {
  name = 'Auto1775549513367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."UQ_auth_refresh_tokens_user_id"`);
    await queryRunner.query(
      `CREATE TABLE "user_preferences" ("user_id" uuid NOT NULL, "preferred_sdgs" integer array NOT NULL DEFAULT '{}', "preferred_categories" text array NOT NULL DEFAULT '{}', "duration_preferences" text array NOT NULL DEFAULT '{any}', "notifications_enabled" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_458057fa75b66e68a275647da2e" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(`ALTER TABLE "auth_refresh_tokens" ADD "device_id" character varying(255)`);
    await queryRunner.query(
      `CREATE INDEX "IDX_auth_refresh_tokens_user_revoked" ON "auth_refresh_tokens" ("user_id", "revoked_at") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_preferences" ADD CONSTRAINT "FK_458057fa75b66e68a275647da2e" FOREIGN KEY ("user_id") REFERENCES "tbl_Usuarios"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_preferences" DROP CONSTRAINT "FK_458057fa75b66e68a275647da2e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_auth_refresh_tokens_user_revoked"`);
    await queryRunner.query(`ALTER TABLE "auth_refresh_tokens" DROP COLUMN "device_id"`);
    await queryRunner.query(`DROP TABLE "user_preferences"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_auth_refresh_tokens_user_id" ON "auth_refresh_tokens" ("user_id") `,
    );
  }
}
