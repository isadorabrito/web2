const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class  $npmConfigName1701462902893 {
    name = ' $npmConfigName1701462902893'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(50) NOT NULL, "name" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "imageUrl" varchar(255) NOT NULL, "tags" varchar(255), "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "photoId" integer NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "imageUrl" varchar(255) NOT NULL, "tags" varchar(255), "userId" integer NOT NULL, CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_photo"("id", "title", "description", "createdAt", "imageUrl", "tags", "userId") SELECT "id", "title", "description", "createdAt", "imageUrl", "tags", "userId" FROM "photo"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`ALTER TABLE "temporary_photo" RENAME TO "photo"`);
        await queryRunner.query(`CREATE TABLE "temporary_likes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "photoId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_e24989f445c2652f8ebc326667f" FOREIGN KEY ("photoId") REFERENCES "photo" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_likes"("id", "photoId", "userId") SELECT "id", "photoId", "userId" FROM "likes"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`ALTER TABLE "temporary_likes" RENAME TO "likes"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "likes" RENAME TO "temporary_likes"`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "photoId" integer NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "likes"("id", "photoId", "userId") SELECT "id", "photoId", "userId" FROM "temporary_likes"`);
        await queryRunner.query(`DROP TABLE "temporary_likes"`);
        await queryRunner.query(`ALTER TABLE "photo" RENAME TO "temporary_photo"`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "imageUrl" varchar(255) NOT NULL, "tags" varchar(255), "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "photo"("id", "title", "description", "createdAt", "imageUrl", "tags", "userId") SELECT "id", "title", "description", "createdAt", "imageUrl", "tags", "userId" FROM "temporary_photo"`);
        await queryRunner.query(`DROP TABLE "temporary_photo"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
