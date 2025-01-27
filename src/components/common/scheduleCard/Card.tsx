'use client';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { STAT_MAPPER, TContentsData } from '@/types/api/mongoDB';
import cx from 'classnames';
import { Session } from 'next-auth';
import { memo } from 'react';
import css from './Card.module.scss';
import CardDesc from './CardDesc';
import CardImage from './CardImage';
import CardMenu from './CardMenu';

type ScheduleCardProps = {
  classname?: string;
  content: TContentsData;
  session: Session | null;
  isFavorite?: boolean;
  addAlarm?: (item: TContentsData) => void;
  openNewTab?: (item: TContentsData) => void;
  addMultiView?: (item: TContentsData) => void;
  toggleFavorite?: (item: TContentsData) => void;
  addBlock?: (item: TContentsData) => void;
  showMenu?: boolean;
};

/** 카드 높이가 항상 일정하도록 해야함!! */
function ScheduleCard_({
  classname,
  content,
  isFavorite,
  addAlarm,
  openNewTab,
  addMultiView,
  toggleFavorite,
  addBlock,
  showMenu = false,
}: ScheduleCardProps) {
  const onClickAddMultiView = () => {
    addMultiView?.(content);
  };
  const onClickAlarm = () => {
    addAlarm?.(content);
  };
  const onClickFavorite = () => {
    toggleFavorite?.(content);
  };
  const onClickNewTab = () => {
    openNewTab?.(content);
  };
  const onClickBlock = () => {
    addBlock?.(content);
  };

  const addStreamModifier = STAT_MAPPER[content.isStream];
  return (
    <div className={cx(css.card, addStreamModifier, classname)}>
      <CardImage content={content} />
      <CardDesc content={content} addStreamModifier={addStreamModifier} />
      {showMenu && (
        <CardMenu
          isFavorite={isFavorite}
          onClickAddMultiView={onClickAddMultiView}
          onClickAlarm={onClickAlarm}
          onClickBlock={onClickBlock}
          onClickFavorite={onClickFavorite}
          onClickNewTab={onClickNewTab}
          copyValue={generateVideoUrl(content.videoId)}
        />
      )}
    </div>
  );
}

const ScheduleCard = memo(ScheduleCard_);
export default ScheduleCard;
