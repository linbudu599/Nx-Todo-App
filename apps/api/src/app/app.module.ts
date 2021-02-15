import { Module, Provider } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import { DB_PROVIDER_TOKEN, DBType } from './constants';

const adapter = new FileSync(path.resolve(__dirname, '../../..', 'db.json'));

const db = lowdb(adapter);

db.defaults({ todos: [{ title: 'Nx', description: 'Use It!' }] }).write();

export const LowdbProvider: Provider<DBType> = {
  provide: DB_PROVIDER_TOKEN,
  useValue: db,
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LowdbProvider],
})
export class AppModule {}
