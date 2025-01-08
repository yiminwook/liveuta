import { Data } from 'effect';

export class CannotConnectIDBError extends Data.TaggedClass('CannotConnectIDBError') {}
export class IDBCreateError extends Data.TaggedClass('CreateError') {}
export class IDBReadError extends Data.TaggedClass('ReadError') {}
export class IDBUpdateError extends Data.TaggedClass('UpdateError') {}
export class IDBDeleteError extends Data.TaggedClass('DeleteError') {}
