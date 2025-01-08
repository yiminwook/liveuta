import type { PocketUtaDB } from '@/types/pocket-uta';
import { Effect, pipe } from 'effect';
import { openDB } from 'idb';
import {
  CannotConnectIDBError,
  IDBCreateError,
  IDBDeleteError,
  IDBReadError,
  IDBUpdateError,
} from './error';

function connectIDB() {
  return Effect.tryPromise({
    try: () =>
      openDB<PocketUtaDB>('pocket-uta', 1, {
        upgrade(db) {
          db.createObjectStore('groups', { autoIncrement: true });

          const itemsStore = db.createObjectStore('items', { autoIncrement: true });
          itemsStore.createIndex('by-group', 'group');
        },
      }),
    catch: () => new CannotConnectIDBError(),
  });
}

function createGroup(name: string) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.put('groups', name),
        catch: () => new IDBCreateError(),
      }),
    ),
  );
}

function readGroups() {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.getAll('groups'),
        catch: () => new IDBReadError(),
      }),
    ),
  );
}

function updateGroupName(key: number, name: string) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.put('groups', name, key),
        catch: () => new IDBUpdateError(),
      }),
    ),
  );
}

function clearGroup(key: number) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: async () => {
          const tx = db.transaction(['items'], 'readwrite');
          const items = tx.objectStore('items');

          for await (const cursor of items) {
            if (cursor.value.group === key) {
              await cursor.delete();
            }
            await tx.done;
          }
        },
        catch: () => new IDBUpdateError(),
      }),
    ),
  );
}

function deleteGroup(key: number) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: async () => {
          const tx = db.transaction(['groups', 'items'], 'readwrite');

          await tx.objectStore('groups').delete(key);

          const items = tx.objectStore('items');
          for await (const cursor of items) {
            if (cursor.value.group === key) {
              await cursor.delete();
            }
          }

          await tx.done;
        },
        catch: () => new IDBDeleteError(),
      }),
    ),
  );
}

function createItem(group: number, channelId: string) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.put('items', { channelId, group }),
        catch: () => new IDBCreateError(),
      }),
    ),
  );
}

function readAllItems() {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.getAllFromIndex('items', 'by-group'),
        catch: () => new IDBReadError(),
      }),
    ),
  );
}

function readItems(groupKey: number) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.getFromIndex('items', 'by-group', groupKey),
        catch: () => new IDBReadError(),
      }),
    ),
  );
}

function updateItem(key: number, channelId: string, groupKey: number) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.put('items', { channelId, group: groupKey }, key),
        catch: () => new IDBUpdateError(),
      }),
    ),
  );
}

function deleteItem(key: number) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.delete('items', key),
        catch: () => new IDBDeleteError(),
      }),
    ),
  );
}

function totalItems() {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.count('items'),
        catch: () => new IDBReadError(),
      }),
    ),
  );
}

function totalItemsInGroup(groupKey: number) {
  return pipe(
    connectIDB(),
    Effect.flatMap((db) =>
      Effect.tryPromise({
        try: () => db.countFromIndex('items', 'by-group', groupKey),
        catch: () => new IDBReadError(),
      }),
    ),
  );
}

export {
  createGroup,
  readGroups,
  updateGroupName,
  clearGroup,
  deleteGroup,
  createItem,
  readAllItems,
  readItems,
  updateItem,
  deleteItem,
  totalItems,
  totalItemsInGroup,
};
