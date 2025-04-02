'use client';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { STREAM_STATUS_MAPPER, TChannelData, TContentData } from '@/types/api/mongoDB';
import cx from 'classnames';
import { Session } from 'next-auth';
import { memo } from 'react';
import css from './Card.module.scss';
import CardDesc from './CardDesc';
import CardImage from './CardImage';
import CardMenu from './CardMenu';

type ScheduleCardProps = {
  classname?: string;
  content: TContentData;
  channel: TChannelData | undefined;
  session: Session | null;
  isFavorite?: boolean;
  addAlarm?: (item: TContentData, channel?: TChannelData) => void;
  openNewTab?: (item: TContentData) => void;
  toggleFavorite?: (item: TContentData) => void;
  addBlock?: (item: TContentData) => void;
  showMenu?: boolean;
};

/** 카드 높이가 항상 일정하도록 해야함!! */
function ScheduleCard_({
  classname,
  content,
  channel,
  isFavorite,
  addAlarm,
  openNewTab,
  toggleFavorite,
  addBlock,
  showMenu = false,
}: ScheduleCardProps) {
  const onClickAlarm = () => {
    addAlarm?.(content, channel);
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

  const addStreamModifier = STREAM_STATUS_MAPPER[content.isStream];
  return (
    <div className={cx(css.card, addStreamModifier, classname)}>
      <CardImage content={content} />
      <CardDesc content={content} channel={channel} addStreamModifier={addStreamModifier} />
      {showMenu && (
        <CardMenu
          isFavorite={isFavorite}
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
