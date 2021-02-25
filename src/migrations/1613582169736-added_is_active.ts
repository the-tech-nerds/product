import {MigrationInterface, QueryRunner} from "typeorm";

export class addedIsActive1613582169736 implements MigrationInterface {
    name = 'addedIsActive1613582169736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products` ADD `is_active` tinyint NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `is_active`");
    }

}
