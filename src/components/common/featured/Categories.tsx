import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { LuChevronDown } from 'react-icons/lu';
import { Session } from 'next-auth';
import { Tabs } from '@ark-ui/react';

import { ContentsDataType } from '@/types/api/mongoDB';
import { categoryAtom, featuredAtom } from '@/stores/schedule/featured';
import { selectedScheduleAtom } from '@/stores/schedule';
import CardPlaceHolders from '@/components/common/scheduleCard/CardPlaceHolders';
import Category from './Category';
import * as sectionStyles from './section.css';
import { StreamCategory } from '@/types';

type Categories = Record<StreamCategory, ContentsDataType[]>;

type CategoriesProps = {
  session: Session | null;
};

export default function Categories({ session }: CategoriesProps) {
  const [show] = useAtom(featuredAtom);
  const expand = useMemo(() => show === 'categories', [show]);
  const [selectedData] = useAtom(selectedScheduleAtom);
  const [category] = useAtom(categoryAtom);
  const categories = useMemo<Categories>(() => {
    const categories: Categories = {
      default: [], // just for type check
      live: [],
      anniversary: [],
      relay: [],
      endurance: [],
    };

    selectedData.content.forEach((data) => {
      categories[data.category].push(data);
    });

    return categories;
  }, [selectedData]);

  return (
    <div className={sectionStyles.section} data-show={expand}>
      <div className={sectionStyles.contents}>
        <Category
          key={`category_${category}`}
          contents={categories[category]}
          session={session}
          category={category}
        />
        <CardPlaceHolders />
      </div>
    </div>
  );
}
