import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import { EntitySchema } from 'typeorm';

async function createDataSource(): Promise<DataSource> {
  const configService = new ConfigService(); // Initialize ConfigService

  const entitiesPath = path.join(__dirname, '../../v1');
  const entityFiles = fs
    .readdirSync(entitiesPath)
    .filter((file) => file.endsWith('.entity.ts'));

  const entities = entityFiles.map((file) => {
    const entity = require(path.join(entitiesPath, file));
    return entity.default ? entity.default : entity;
  });

  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: false,
    logging: false,
    entities: entities as (Function | string | EntitySchema<any>)[],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  });
}

export default createDataSource;
