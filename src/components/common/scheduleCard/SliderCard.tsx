import { TContentsData } from '@/types/api/mongoDB';
import { ActionIcon, Badge, Card, Text, Tooltip } from '@mantine/core';
import variable from '@variable';
import { BsBroadcast } from 'react-icons/bs';
import { FaPlus, FaStar } from 'react-icons/fa';
import { HiBellAlert } from 'react-icons/hi2';
import { MdBlock, MdOpenInNew } from 'react-icons/md';
import CardImage from './CardImage';
import css from './ScheduleCard.module.scss';

type SliderCardProps = {
  content: TContentsData;
  isFavorite?: boolean;
  addAlarm?: (item: TContentsData) => void;
  openNewTab?: (item: TContentsData) => void;
  addMultiView?: (item: TContentsData) => void;
  toggleFavorite?: (item: TContentsData) => void;
  addBlock?: (item: TContentsData) => void;
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
              <HiBellAlert color={variable.thirdColorDefault} size="1.2rem" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="멀티뷰추가" position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickAddMultiView}>
              <FaPlus color={variable.thirdColorDefault} size="1.2rem" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={`즐겨찾기 ${isFavorite ? '해제' : '추가'}`} position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickFavorite}>
              <FaStar size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="채널블럭" position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickBlock}>
              <MdBlock color={variable.thirdColorDefault} size="1.2rem" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="새로열기" position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickNewTab}>
              <MdOpenInNew color={variable.thirdColorDefault} size="1.2rem" />
            </ActionIcon>
          </Tooltip>
        </div>

        {content.isStream === 'TRUE' && (
          <Badge
            size="sm"
            color={variable.thirdColorDefault}
            leftSection={<BsBroadcast color="#fff" />}
          >
            {content.viewer}
          </Badge>
        )}
      </div>
    </Card>
  );
}
