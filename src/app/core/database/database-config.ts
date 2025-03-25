import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'ChatDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'messages',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'messageId', keypath: 'messageId', options: { unique: false } },
        { name: 'content', keypath: 'content', options: { unique: false } },
        { name: 'status', keypath: 'status', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ],
    },
  ],
};
