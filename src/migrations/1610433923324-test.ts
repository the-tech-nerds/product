import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class test1610433923324 implements MigrationInterface {
  name = 'test1610433923324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `Shops` DROP COLUMN `isActive`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `Shops` ADD `isActive` varchar(255) NOT NULL',
    );
  }
}
