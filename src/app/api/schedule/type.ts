import { ContentsDataReturnType } from '@/type/api/mongoDB';

export type GetScheduleRes = {
  message: string;
  data: {
    scheduled: ContentsDataReturnType;
    live: ContentsDataReturnType;
    daily: ContentsDataReturnType;
    all: ContentsDataReturnType;
  };
};
