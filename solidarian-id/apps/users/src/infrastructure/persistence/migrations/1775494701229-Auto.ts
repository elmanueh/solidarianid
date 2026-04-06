import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1775494701229 implements MigrationInterface {
  name = 'Auto1775494701229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth_refresh_tokens" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "token_hash" character varying(255) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "revoked_at" TIMESTAMP WITH TIME ZONE, "rotated_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_df6893d2063a4ea7bbf1eda31e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_auth_refresh_tokens_user_id" ON "auth_refresh_tokens" ("user_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."UQ_auth_refresh_tokens_user_id"`);
    await queryRunner.query(`DROP TABLE "auth_refresh_tokens"`);
  }
}
