import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as mysql from 'mysql';

// tslint:disable-next-line:variable-name
export const TypeOrmConfig = TypeOrmModule.forRootAsync({
  useFactory: (): TypeOrmModuleOptions => {
    const core = {
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      cli: {
        migrationsDir: 'dist/migration',
      },
      migrations: ['dist/migration/*.js'],
    };

    if (process.env.NODE_ENV === 'test') {
      return {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        logging: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrationsTableName: 'migrations',
        cli: {
          migrationsDir: 'src/migration',
        },
        migrations: ['src/migration/*.ts'],
        keepConnectionAlive: true,
      };
    }

    const config = {
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'productdb',
      port: process.env.MYSQL_PORT || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      maxQueryExecutionTime: 10000,
      synchronize: false,
      logging: ['error'],
      keepConnectionAlive: true,
      ...core,
    };

    if (process.env.NODE_ENV === 'development') {
      const conn = mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
      });

      conn.connect((err: any) => {
        if (err) {
          throw new Error(err.message);
        }

        conn.query(
          `CREATE DATABASE IF NOT EXISTS \`${config.database}\``,
          (err2: any) => {
            if (err2) {
              throw new Error(err2.message);
            }

            conn.end();
          },
        );
      });
    }

    return config as TypeOrmModuleOptions;
  },
});
