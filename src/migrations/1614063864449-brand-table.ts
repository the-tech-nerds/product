import {MigrationInterface, QueryRunner} from "typeorm";

export class brandTable1614063864449 implements MigrationInterface {
    name = 'brandTable1614063864449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `brands` (`created_by` int NOT NULL, `updated_by` int NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `supplier_id` int NULL, UNIQUE INDEX `REL_99a66874581b656ee6efed8c0c` (`supplier_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `brands` ADD CONSTRAINT `FK_99a66874581b656ee6efed8c0c6` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brands` DROP FOREIGN KEY `FK_99a66874581b656ee6efed8c0c6`");
        await queryRunner.query("DROP INDEX `REL_99a66874581b656ee6efed8c0c` ON `brands`");
        await queryRunner.query("DROP TABLE `brands`");
    }

}
