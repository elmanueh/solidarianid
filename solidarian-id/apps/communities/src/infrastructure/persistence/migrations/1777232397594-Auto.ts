import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1777232397594 implements MigrationInterface {
  name = 'Auto1777232397594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subscriptions" ("id" uuid NOT NULL, "userId" character varying NOT NULL, "endpoint" character varying NOT NULL, "p256dh" character varying NOT NULL, "auth" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "requestIds" uuid array NOT NULL DEFAULT '{}', "communityFollowedIds" uuid array NOT NULL DEFAULT '{}', "causeFollowedIds" uuid array NOT NULL DEFAULT '{}', CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "subscriptions"`);
  }
}
