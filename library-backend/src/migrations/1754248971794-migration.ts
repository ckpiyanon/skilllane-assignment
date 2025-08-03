import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754248971794 implements MigrationInterface {
    name = 'Migration1754248971794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "user_pk" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "user_idx_username" ON "users" ("username") `);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "author" character varying(255) NOT NULL, "isbn" character varying(50) NOT NULL, "publication_year" integer NOT NULL, "cover_image_file_name" character varying(50) NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "book_pk" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "book_idx_isbn" ON "books" ("isbn") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."book_idx_isbn"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP INDEX "public"."user_idx_username"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
