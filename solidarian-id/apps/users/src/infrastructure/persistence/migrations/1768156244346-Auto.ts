import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1768156244346 implements MigrationInterface {
  name = 'Auto1768156244346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tbl_Usuarios" ("Id" uuid NOT NULL, "FullName" character varying NOT NULL, "MobilePhone" character varying NOT NULL, "Username" character varying NOT NULL, "PasswordHash" character varying NOT NULL, "City" character varying NOT NULL, "CountryCode" character varying(2) NOT NULL, CONSTRAINT "UQ_d567e4a674f3cc02c92efa2407c" UNIQUE ("MobilePhone"), CONSTRAINT "UQ_120aab196d9c98bc86e66d46387" UNIQUE ("Username"), CONSTRAINT "PK_d5f9a0542e74e8cc4658f565411" PRIMARY KEY ("Id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tbl_Usuarios"`);
  }
}
