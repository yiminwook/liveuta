import { ContentsDataReturnType } from '@/types/api/mongoDB';

export type GetScheduleRes = {
  message: string;
  data: {
    scheduled: ContentsDataReturnType;
    live: ContentsDataReturnType;
    daily: ContentsDataReturnType;
    all: ContentsDataReturnType;
  };
};
