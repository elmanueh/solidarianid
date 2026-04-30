import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1777162030919 implements MigrationInterface {
  name = 'Auto1777162030919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth_refresh_tokens" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "token_hash" character varying(255) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "revoked_at" TIMESTAMP WITH TIME ZONE, "refreshed_at" TIMESTAMP WITH TIME ZONE, "device_id" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_df6893d2063a4ea7bbf1eda31e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_auth_refresh_tokens_user_revoked" ON "auth_refresh_tokens" ("user_id", "revoked_at") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_auth_refresh_tokens_user_revoked"`);
    await queryRunner.query(`DROP TABLE "auth_refresh_tokens"`);
  }
}
