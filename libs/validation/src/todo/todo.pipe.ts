import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Type,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// export interface ArgumentMetadata {
//   type: 'body' | 'query' | 'param' | 'custom';
//   metatype?: Type<unknown>; --> 元类型 如String
//   data?: string; --> @Query(data)
// }

@Injectable()
export class TodoValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.shouldValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log(errors);
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private shouldValidate(metatype: Type<unknown>): boolean {
    const types: Type<unknown>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
