import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class removeColumWorldFromShops1610434745419
  implements MigrationInterface {
  name = 'removeColumWorldFromShops1610434745419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `Shops` DROP COLUMN `world`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `Shops` ADD `world` text NULL');
  }
}
