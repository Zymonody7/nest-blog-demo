import { FindOneOptions } from 'typeorm';
declare module 'typeorm' {
  interface FindOneOptions {
    [key: any]: any;
  }
}
