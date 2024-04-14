import { Setlist } from '@/model/oracleDB/setlist/service';

export type GetSetlistRes = {
  message: string;
  data: {
    total: number;
    list: Setlist[];
  };
};
