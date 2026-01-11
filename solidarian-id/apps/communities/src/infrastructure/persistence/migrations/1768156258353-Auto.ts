import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1768156258353 implements MigrationInterface {
  name = 'Auto1768156258353';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_user" ("eventId" character varying NOT NULL, "userId" character varying NOT NULL, "email" character varying, "mobilePhone" character varying, "fullname" character varying NOT NULL, CONSTRAINT "PK_eb84a91a104e413c2ced7ee4934" PRIMARY KEY ("eventId", "userId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_eb84a91a104e413c2ced7ee493" ON "event_user" ("eventId", "userId") `);
    await queryRunner.query(
      `CREATE TABLE "event" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "initialDate" TIMESTAMP WITH TIME ZONE NOT NULL, "actionId" character varying NOT NULL, "placeDirection" character varying NOT NULL, "placeCity" character varying NOT NULL, "placeCountrycode" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "objective_user" ("name" character varying NOT NULL, "actionId" character varying NOT NULL, "userId" character varying NOT NULL, "email" character varying, "mobilePhone" character varying, "fullname" character varying NOT NULL, CONSTRAINT "PK_7538a84f24015b7e8b424a264b6" PRIMARY KEY ("name", "actionId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7538a84f24015b7e8b424a264b" ON "objective_user" ("name", "actionId", "userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "objective" ("name" character varying NOT NULL, "actionId" character varying NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "unit" character varying NOT NULL, "currentAmount" integer NOT NULL, CONSTRAINT "PK_960cdbbf9e380bcfccdc088fdf1" PRIMARY KEY ("name", "actionId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "action" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "causeId" character varying NOT NULL, CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cause" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "initialDate" TIMESTAMP WITH TIME ZONE NOT NULL, "durationDays" integer NOT NULL, "ods" text NOT NULL, "communityId" character varying NOT NULL, CONSTRAINT "PK_7e5e70955edaf3bb0c56d8eeb49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "community" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."community_user_role_enum" AS ENUM('creator', 'admin', 'member')`);
    await queryRunner.query(
      `CREATE TABLE "community_user" ("communityId" character varying NOT NULL, "userId" character varying NOT NULL, "role" "public"."community_user_role_enum" NOT NULL DEFAULT 'member', "joinedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd372ac34825213b0ccb110c859" PRIMARY KEY ("communityId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f9bc5c9c1155949ea5a5af2806" ON "community_user" ("communityId", "userId", "role") `,
    );
    await queryRunner.query(`CREATE TYPE "public"."requests_type_enum" AS ENUM('community', 'cause', 'action')`);
    await queryRunner.query(
      `CREATE TABLE "requests" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "reason" text, "status" character varying NOT NULL, "type" "public"."requests_type_enum" NOT NULL, "user_id" character varying, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "fullName" character varying NOT NULL, "mobilePhone" character varying, "email" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_user" ADD CONSTRAINT "FK_6e3fbcc18ab70b803bb82f8802c" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_user" ADD CONSTRAINT "FK_600a6c0ba1ff979f6bfbce3bfe3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_feac1a9ec183e786269d10844d9" FOREIGN KEY ("actionId") REFERENCES "action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "objective_user" ADD CONSTRAINT "FK_899e10c88c5ebae76d685200cad" FOREIGN KEY ("name", "actionId") REFERENCES "objective"("name","actionId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "objective_user" ADD CONSTRAINT "FK_92c6c338535abf446d8faddecf1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "objective" ADD CONSTRAINT "FK_1ae66f2ebd41ed4a6dfd2b0c4af" FOREIGN KEY ("actionId") REFERENCES "action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "action" ADD CONSTRAINT "FK_df62c1a425c1654f419a005158e" FOREIGN KEY ("causeId") REFERENCES "cause"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cause" ADD CONSTRAINT "FK_ebce3fbf3f5903567419e99e5f7" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "community_user" ADD CONSTRAINT "FK_fab8516524e4728bb788da6a924" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "community_user" ADD CONSTRAINT "FK_7ebd3469ae3f0c64129af3cc6a5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23"`);
    await queryRunner.query(`ALTER TABLE "community_user" DROP CONSTRAINT "FK_7ebd3469ae3f0c64129af3cc6a5"`);
    await queryRunner.query(`ALTER TABLE "community_user" DROP CONSTRAINT "FK_fab8516524e4728bb788da6a924"`);
    await queryRunner.query(`ALTER TABLE "cause" DROP CONSTRAINT "FK_ebce3fbf3f5903567419e99e5f7"`);
    await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_df62c1a425c1654f419a005158e"`);
    await queryRunner.query(`ALTER TABLE "objective" DROP CONSTRAINT "FK_1ae66f2ebd41ed4a6dfd2b0c4af"`);
    await queryRunner.query(`ALTER TABLE "objective_user" DROP CONSTRAINT "FK_92c6c338535abf446d8faddecf1"`);
    await queryRunner.query(`ALTER TABLE "objective_user" DROP CONSTRAINT "FK_899e10c88c5ebae76d685200cad"`);
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_feac1a9ec183e786269d10844d9"`);
    await queryRunner.query(`ALTER TABLE "event_user" DROP CONSTRAINT "FK_600a6c0ba1ff979f6bfbce3bfe3"`);
    await queryRunner.query(`ALTER TABLE "event_user" DROP CONSTRAINT "FK_6e3fbcc18ab70b803bb82f8802c"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TYPE "public"."requests_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f9bc5c9c1155949ea5a5af2806"`);
    await queryRunner.query(`DROP TABLE "community_user"`);
    await queryRunner.query(`DROP TYPE "public"."community_user_role_enum"`);
    await queryRunner.query(`DROP TABLE "community"`);
    await queryRunner.query(`DROP TABLE "cause"`);
    await queryRunner.query(`DROP TABLE "action"`);
    await queryRunner.query(`DROP TABLE "objective"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7538a84f24015b7e8b424a264b"`);
    await queryRunner.query(`DROP TABLE "objective_user"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_eb84a91a104e413c2ced7ee493"`);
    await queryRunner.query(`DROP TABLE "event_user"`);
  }
}
