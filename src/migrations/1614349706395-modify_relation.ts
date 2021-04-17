import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyRelation1614349706395 implements MigrationInterface {
    name = 'modifyRelation1614349706395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `suppliers` ADD `brandId` int NULL");
        await queryRunner.query("ALTER TABLE `suppliers` ADD CONSTRAINT `FK_b21ebf3ad2491a28d5c5e54283c` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `suppliers` DROP FOREIGN KEY `FK_b21ebf3ad2491a28d5c5e54283c`");
        await queryRunner.query("ALTER TABLE `suppliers` DROP COLUMN `brandId`");
    }

}
