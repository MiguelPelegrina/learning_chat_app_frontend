import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'ChatDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'messages',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'content', keypath: 'content', options: { unique: false } },
        ]
    }
  ]
};
