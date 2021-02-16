import { LowdbSync } from 'lowdb';
import { TodoItemBase } from '@todoapp/dto';

export const DB_PROVIDER_TOKEN = Symbol('DB_PROVIDER_TOKEN');

export type DBType = LowdbSync<Record<string, TodoItemBase[]>>;
