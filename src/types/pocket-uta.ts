import type { DBSchema } from 'idb';

export interface PocketUtaDB extends DBSchema {
  groups: {
    key: number;
    // name of group
    value: string;
  };
  items: {
    key: number;
    value: {
      // youtube channel id
      channelId: string;
      // key of groups
      group: number;
    };
    indexes: { 'by-group': number };
  };
}
