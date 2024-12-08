'use client';
import { TContentsData } from '@/types/api/mongoDB';
import cx from 'classnames';
import { Session } from 'next-auth';
import { useMemo } from 'react';
import CardDesc from './CardDesc';
import CardImage from './CardImage';
import CardMenu from './CardMenu';
import css from './ScheduleCard.module.scss';

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
export default function ScheduleCard({
  classname,
  session,
  content,
  isFavorite,
  addAlarm,
  openNewTab,
  addMultiView,
  toggleFavorite,
  addBlock,
  showMenu = false,
}: ScheduleCardProps) {
  const addStreamModifier = useMemo(() => {
    let streamModifer: string;

    switch (content.isStream) {
      case 'FALSE':
        streamModifer = 'closed';
        break;
      case 'TRUE':
        streamModifer = 'stream';
        break;
      default:
        streamModifer = '';
    }

    return streamModifer;
  }, [content.isStream]);

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

  return (
    <div className={cx(css.card, addStreamModifier, classname)}>
      <CardImage content={content} />
      <CardDesc session={session} content={content} addStreamModifier={addStreamModifier} />
      {showMenu && (
        <CardMenu
          isFavorite={isFavorite}
          onClickAddMultiView={onClickAddMultiView}
          onClickAlarm={onClickAlarm}
          onClickBlock={onClickBlock}
          onClickFavorite={onClickFavorite}
          onClickNewTab={onClickNewTab}
        />
      )}
    </div>
  );
}
