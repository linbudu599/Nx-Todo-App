import { Module, Provider } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import { TodoItemBase } from '@todoapp/dto';

import { DB_PROVIDER_TOKEN, DBType } from './constants';

const adapter = new FileSync(path.resolve(__dirname, '../../..', 'db.json'));

const db = lowdb(adapter);

db.defaults({
  todos: [
    { id: 1, title: 'Nx', description: 'Use It!' },
    { id: 2, title: 'Angular', description: 'Great Angular' },
  ] as TodoItemBase[],
}).write();

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
