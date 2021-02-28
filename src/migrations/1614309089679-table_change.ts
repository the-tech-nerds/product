import {MigrationInterface, QueryRunner} from "typeorm";

export class tableChange1614309089679 implements MigrationInterface {
    name = 'tableChange1614309089679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brands` DROP FOREIGN KEY `FK_99a66874581b656ee6efed8c0c6`");
        await queryRunner.query("DROP INDEX `REL_99a66874581b656ee6efed8c0c` ON `brands`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE UNIQUE INDEX `REL_99a66874581b656ee6efed8c0c` ON `brands` (`supplier_id`)");
        await queryRunner.query("ALTER TABLE `brands` ADD CONSTRAINT `FK_99a66874581b656ee6efed8c0c6` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
