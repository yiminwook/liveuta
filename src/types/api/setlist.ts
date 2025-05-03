import { Setlist } from '@/libraries/oracledb/setlist/service';

export type GetSetlistRes = {
  message: string;
  data: {
    total: number;
    list: Setlist[];
  };
};

export type DeleteSetlistRes = {
  message: string;
  data: string;
};

/** 권한레벨 */
export const SETLIST_DELETE_LEVEL = 3;
