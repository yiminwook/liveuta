import { ITEMS_PER_PAGE } from '@/constants';

const getPaginationRange = (pageQuery: number): [number, number] => {
  return [(pageQuery - 1) * ITEMS_PER_PAGE, pageQuery * ITEMS_PER_PAGE];
};

export default getPaginationRange;
