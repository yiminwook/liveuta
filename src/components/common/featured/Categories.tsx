import { StreamCategory } from '@/types';
import { TContentsData } from '@/types/api/mongoDB';
import { Session } from 'next-auth';
import { useMemo } from 'react';
import Category from './Category';
import sectionCss from './Section.module.scss';

type Categories = Record<StreamCategory, TContentsData[]>;

type CategoriesProps = {
  session: Session | null;
};

export default function Categories({ session }: CategoriesProps) {
  const categories = useMemo<Categories>(() => {
    const categories: Categories = {
      default: [], // just for type check
      live: [],
      anniversary: [],
      relay: [],
      endurance: [],
    };

    // selectedData.content.forEach((data) => {
    //   categories[data.category].push(data);
    // });

    return categories;
  }, []);

  return (
    // <div className={sectionCss.section} data-show={expand}>
    //   <div className={sectionCss.contents}>
    //     <Category
    //       key={`category_${category}`}
    //       contents={categories[category]}
    //       session={session}
    //       category={category}
    //     />
    //   </div>
    // </div>
    null
  );
}
