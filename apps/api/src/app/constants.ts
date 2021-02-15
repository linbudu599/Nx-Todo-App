import { LowdbSync } from 'lowdb';

export const DB_PROVIDER_TOKEN = Symbol('DB_PROVIDER_TOKEN');

export type DBType = LowdbSync<Record<string, ITodoItem[]>>;

export type ITodoItem = {
  titles: string;
  description: string;
};
