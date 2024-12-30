import { generateVideoUrl } from '@/libraries/youtube/url';
import { STAT_MAPPER, TContentsData } from '@/types/api/mongoDB';
import { ActionIcon, Badge, Card, Text, Tooltip } from '@mantine/core';
import variable from '@variable';
import FasStar from '~icons/fa-solid/star.jsx';
import IonPerson from '~icons/ion/person.jsx';
import IonPlus from '~icons/ion/plus.jsx';
import MsOpenInNew from '~icons/material-symbols/open-in-new.jsx';
import MdiBlock from '~icons/mdi/block.jsx';
import TbBellRingingFilled from '~icons/tabler/bellRingingFilled.jsx';
import CopyButton from '../button/CopyButton';
import css from './Card.module.scss';
import CardImage from './CardImage';

type SliderCardProps = {
  content: TContentsData & { isFavorite: boolean };
  isFavorite?: boolean;
  addAlarm?: (item: TContentsData) => void;
  openNewTab?: (item: TContentsData) => void;
  addMultiView?: (item: TContentsData) => void;
  toggleFavorite?: (item: TContentsData) => void;
  addBlock?: (item: TContentsData) => void;
  copy?: (item: TContentsData) => void;
};

export default function SliderCard({
  content,
  isFavorite = false,
  addAlarm,
  openNewTab,
  addMultiView,
  toggleFavorite,
  addBlock,
}: SliderCardProps) {
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
    <Card className={css.sliderCard} padding="xs" shadow="xs" withBorder>
      <Card.Section>
        <CardImage content={content} />
        <Badge
          className={css.status}
          size="md"
          data-status={STAT_MAPPER[content.isStream]}
          color={variable.thirdColorDefault}
          leftSection={content.isStream === 'TRUE' && <IonPerson color="#fff" />}
        >
          {content.isStream === 'TRUE'
            ? new Intl.NumberFormat('kr', { notation: 'compact' })
                .format(content.viewer)
                .toLowerCase()
            : STAT_MAPPER[content.isStream]}
        </Badge>
      </Card.Section>

      <Text fw={500} className={css.channelNm} mt="xs">
        {content.channelName}
      </Text>

      <Text size="sm" c="dimmed" className={css.title} mt="xs">
        {content.title}
      </Text>

      <div className={css.navBox}>
        <div>
          <Tooltip label="알림설정" position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickAlarm}>
              <TbBellRingingFilled color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="멀티뷰추가" position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickAddMultiView}>
              <IonPlus color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={`즐겨찾기 ${isFavorite ? '해제' : '추가'}`} position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickFavorite}>
              <FasStar color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="채널블럭" position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickBlock}>
              <MdiBlock color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="새로열기" position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickNewTab}>
              <MsOpenInNew color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip>
          <CopyButton value={generateVideoUrl(content.videoId)} />
        </div>
      </div>
    </Card>
  );
}
