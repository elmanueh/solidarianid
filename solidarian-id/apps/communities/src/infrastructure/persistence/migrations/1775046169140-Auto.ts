import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1775046169140 implements MigrationInterface {
  name = 'Auto1775046169140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cause_user" ("causeId" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_7944411ff0f9293259e4c27a633" PRIMARY KEY ("causeId", "userId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_7944411ff0f9293259e4c27a63" ON "cause_user" ("causeId", "userId") `);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`);
    await queryRunner.query(`CREATE TYPE "public"."requests_status_enum" AS ENUM('approved', 'pending', 'rejected')`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "status" "public"."requests_status_enum" NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "cause_user" ADD CONSTRAINT "FK_61248b84682b564af449c4b0ddb" FOREIGN KEY ("causeId") REFERENCES "cause"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cause_user" ADD CONSTRAINT "FK_4fe651b6ac8d674480c650deaef" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cause_user" DROP CONSTRAINT "FK_4fe651b6ac8d674480c650deaef"`);
    await queryRunner.query(`ALTER TABLE "cause_user" DROP CONSTRAINT "FK_61248b84682b564af449c4b0ddb"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."requests_status_enum"`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "status" character varying NOT NULL`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7944411ff0f9293259e4c27a63"`);
    await queryRunner.query(`DROP TABLE "cause_user"`);
  }
}
