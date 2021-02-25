import {MigrationInterface, QueryRunner} from "typeorm";

export class init1614284420896 implements MigrationInterface {
    name = 'init1614284420896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `suppliers` (`created_by` int NOT NULL, `updated_by` int NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NULL, `address` text NOT NULL, `phone` text NOT NULL, `email` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `brands` (`created_by` int NOT NULL, `updated_by` int NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `supplier_id` int NULL, UNIQUE INDEX `REL_99a66874581b656ee6efed8c0c` (`supplier_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `products` (`created_by` int NOT NULL, `updated_by` int NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `price` int NOT NULL, `is_active` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `units` (`created_by` int NOT NULL, `updated_by` int NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `shops` (`created_by` int NOT NULL, `updated_by` int NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NULL, `address` text NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `brands` ADD CONSTRAINT `FK_99a66874581b656ee6efed8c0c6` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brands` DROP FOREIGN KEY `FK_99a66874581b656ee6efed8c0c6`");
        await queryRunner.query("DROP TABLE `shops`");
        await queryRunner.query("DROP TABLE `units`");
        await queryRunner.query("DROP TABLE `products`");
        await queryRunner.query("DROP INDEX `REL_99a66874581b656ee6efed8c0c` ON `brands`");
        await queryRunner.query("DROP TABLE `brands`");
        await queryRunner.query("DROP TABLE `suppliers`");
    }

}
