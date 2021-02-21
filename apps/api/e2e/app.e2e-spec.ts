// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, Provider } from '@nestjs/common';
// // import request = require('supertest');

// import { AppModule } from '../src/app/app.module';
// import { AppService } from '../src/app/app.service';

// // import lowdb from 'lowdb';
// // import FileSync from 'lowdb/adapters/FileSync';
// // import path from 'path';
// // import { TodoItemBase } from '@todoapp/dto';

// import { DB_PROVIDER_TOKEN, DBType } from '../src/app/constants';

// // const requestAssertFunction = (
// //   url: string,
// //   data: string,
// //   app: INestApplication
// // ) => request(app.getHttpServer()).get(url).expect(200).expect(data);

// // const adapter = new FileSync(
// //   path.resolve(__dirname, '../../..', 'db-test.json')
// // );

// // const db = lowdb(adapter);

// // db.defaults({
// //   todos: [
// //     { id: 1, title: 'Nx', description: 'Use It!' },
// //     { id: 2, title: 'Angular', description: 'Great Angular' },
// //   ] as TodoItemBase[],
// // }).write();

// // export const LowdbProvider: Provider<DBType> = {
// //   provide: DB_PROVIDER_TOKEN,
// //   useValue: db,
// // };

// describe('api(e2e)', () => {
//   let app: INestApplication;

//   //  beforeAll(async () => {
//   //    const module = await Test.createTestingModule({
//   //      imports: [CatsModule],
//   //    })
//   //      .overrideProvider(CatsService)
//   //      .useValue(catsService)
//   //      .compile();

//   //    app = module.createNestApplication();
//   //    await app.init();
//   //  });

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = module.createNestApplication();
//     await app.init();
//   });

//   it('GET /', () => {
//     // requestAssertFunction('/', '', app);
//   });
// });
