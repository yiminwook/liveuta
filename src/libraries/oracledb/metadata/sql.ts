import 'server-only';

export const GET_ALL_METADATA = 'SELECT * FROM META';

export const UPDATE_METADATA_VALUE = 'UPDATE META SET VALUE = :value WHERE KEY = :key';
