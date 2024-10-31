import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { LuChevronDown } from 'react-icons/lu';
import { Session } from 'next-auth';

import { ContentsDataType } from '@/types/api/mongoDB';
import { selectedFeaturedCategoryAtom, selectedScheduleAtom } from '@/stores/schedule';
import Category from './Category';
import CardPlaceHolders from '../scheduleCard/CardPlaceHolders';

import * as styles from './categories.css';

const CATEGORY_NAME = new Map([
  [1, '라이브'],
  [2, '기념일'],
  [3, '릴레이'],
  [4, '내구'],
]);

type Categories = Record<number, ContentsDataType[]>;

type CategoriesProps = {
  session: Session | null;
  filter: string;
};

export default function Categories({ session, filter }: CategoriesProps) {
  const [fold, setFold] = useState(false);
  const [selectedData] = useAtom(selectedScheduleAtom);
  const [category, setCategory] = useAtom(selectedFeaturedCategoryAtom);
  const categories = useMemo<Categories>(() => {
    const categories: Categories = {
      1: [],
      2: [],
      3: [],
      4: [],
    };

    for (const data of selectedData.content) {
      categories[data.category].push(data);
    }

    return categories;
  }, [selectedData]);
  return (
    <div className={styles.categories}>
      <div style={{ position: 'relative' }}>
        <ul className={styles.categoryTabs}>
          {Array.from(CATEGORY_NAME.entries()).map(([key, value]) => (
            <li key={key}>
              <button
                className={styles.categoryTab}
                onClick={() => setCategory(key)}
                data-selected={category === key}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
        <button className={styles.foldButton} onClick={() => setFold(!fold)} data-fold={fold}>
          <LuChevronDown />
        </button>
      </div>
      <div className={styles.categoryContainer} data-fold={fold}>
        <Category
          key={`category_${category}`}
          contents={categories[category]}
          session={session}
          filter={filter}
          category={category}
        />
        <CardPlaceHolders />
      </div>
    </div>
  );
}
