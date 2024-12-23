import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache';

const getAllChannelDoc = () => {
  'use cache';
  cacheLife('hours');
  cacheTag('channel');
};
