import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InventoryVariance } from './products/view/inventory-variance.view';
import { VwProductVariance } from './products/view/vw_product_variance.view';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'productdb',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  maxQueryExecutionTime: 100,
  entities: [
    `${__dirname}/**/*.entity{.ts,.js}`,
    InventoryVariance,
    VwProductVariance,
  ],

  // We are using migrations, synchronize should be set to false.
  synchronize: true,
  keepConnectionAlive: true,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: false,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
  // cache: {
  //   type: "redis",
  //   options: {
  //     host: "redis",
  //     port: 6379
  //   }
  // },
  // extra: {
  //   connectionLimit: 100,
  // },
};
export = ormconfig;
