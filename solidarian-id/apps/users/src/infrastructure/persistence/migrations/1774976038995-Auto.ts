import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1774976038995 implements MigrationInterface {
  name = 'Auto1774976038995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "checkpoint_projection" ("projection_name" character varying NOT NULL, "commit_position" bigint NOT NULL, "prepare_position" bigint NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_2e1fab232813f13d85aee7d8b29" PRIMARY KEY ("projection_name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_projection" ("id" uuid NOT NULL, "username" character varying NOT NULL, "mobile_phone" character varying NOT NULL, CONSTRAINT "UQ_5692b16de75a4f73074fd4fdf4a" UNIQUE ("username"), CONSTRAINT "UQ_befd85afc941f565a86fa26f297" UNIQUE ("mobile_phone"), CONSTRAINT "PK_a80d3b230fbc1aa477e57e8fa59" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_projection"`);
    await queryRunner.query(`DROP TABLE "checkpoint_projection"`);
  }
}
