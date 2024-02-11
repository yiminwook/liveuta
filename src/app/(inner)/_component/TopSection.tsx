import { ContentsDataType, MongoDBAPIReturntype } from '@/type/api/mongoDB';
import PlayerWrap from './player/PlayerWrap';
import * as styles from './topSection.css';

interface TopSectionProps {
  isLoad: boolean;
  contents: ContentsDataType[];
  isMobile: boolean;
  isDesktop: boolean;
  filter: keyof MongoDBAPIReturntype;
}

export default function TopSection({
  filter,
  isLoad,
  isMobile,
  isDesktop,
  contents,
}: TopSectionProps) {
  if (filter !== 'live' || isMobile || isLoad === false) return null;

  return (
    <section className={styles.topSection}>
      <PlayerWrap isDesktop={isDesktop} />
    </section>
  );
}
