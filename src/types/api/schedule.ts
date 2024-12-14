import { TContentsDataReturn } from '@/types/api/mongoDB';

export type GetScheduleRes = {
  message: string;
  data: {
    scheduled: TContentsDataReturn;
    live: TContentsDataReturn;
    daily: TContentsDataReturn;
    all: TContentsDataReturn;
  };
};
