import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1774968224663 implements MigrationInterface {
  name = 'Auto1774968224663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_preferences" ("user_id" uuid NOT NULL, "preferred_sdgs" integer array NOT NULL DEFAULT '{}', "preferred_categories" text array NOT NULL DEFAULT '{}', "duration_preferences" text array NOT NULL DEFAULT '{any}', "notifications_enabled" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_458057fa75b66e68a275647da2e" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_preferences" ADD CONSTRAINT "FK_458057fa75b66e68a275647da2e" FOREIGN KEY ("user_id") REFERENCES "tbl_Usuarios"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_preferences" DROP CONSTRAINT "FK_458057fa75b66e68a275647da2e"`);
    await queryRunner.query(`DROP TABLE "user_preferences"`);
  }
}
