import { Injectable, Inject } from '@nestjs/common';
import { DB_PROVIDER_TOKEN, DBType } from './constants';

@Injectable()
export class AppService {
  constructor(
    @Inject(DB_PROVIDER_TOKEN)
    private readonly db: DBType
  ) {}

  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  test() {
    console.log(this.db.get('todos').value());
    return { message: 'LowDB Operation Test' };
  }
}
