import { generateChanneImagelUrl, generateVideoUrl } from '@/libraries/youtube/url';
import { STREAM_STATUS_MAPPER, TChannelData, TContentData } from '@/types/api/mongoDB';
import FasStar from '@icons/fa-solid/Star';
import IonPerson from '@icons/ion/Person';
import IonPlus from '@icons/ion/PlusRound';
import MsOpenInNew from '@icons/material-symbols/OpenInNew';
import MdiBlock from '@icons/mdi/Block';
import TbBellRingingFilled from '@icons/tabler/BellRingingFilled';
import { ActionIcon, Avatar, Badge, Card, Flex, Text, Tooltip } from '@mantine/core';
import variable from '@variable';
import { useTranslations } from 'next-intl';
import CopyButton from '../button/CopyButton';
import CardImage from './CardImage';
import css from './SliderCard.module.scss';

type SliderCardProps = {
  content: TContentData;
  channel: TChannelData | undefined;
  isFavorite?: boolean;
  addAlarm?: (item: TContentData, channel: TChannelData | undefined) => void;
  openNewTab?: (item: TContentData) => void;
  toggleFavorite?: (item: TContentData) => void;
  addBlock?: (item: TContentData) => void;
  copy?: (item: TContentData) => void;
};

export default function SliderCard({
  content,
  channel,
  isFavorite = false,
  addAlarm,
  openNewTab,
  toggleFavorite,
  addBlock,
}: SliderCardProps) {
  const t = useTranslations();

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

  return (
    <Card className={css.sliderCard} padding="xs" shadow="xs" withBorder>
      <Card.Section>
        <CardImage content={content} />
        <Badge
          className={css.status}
          size="md"
          data-status={STREAM_STATUS_MAPPER[content.isStream]}
          color={variable.thirdColorDefault}
          leftSection={content.isStream === 'TRUE' && <IonPerson color="#fff" />}
        >
          {content.isStream === 'TRUE'
            ? new Intl.NumberFormat('kr', { notation: 'compact' })
                .format(content.viewer)
                .toLowerCase()
            : STREAM_STATUS_MAPPER[content.isStream]}
        </Badge>
      </Card.Section>

      <Flex mt="xs" align="center">
        <Avatar
          display="inline-block"
          mr={5}
          styles={{ root: { verticalAlign: 'text-bottom' } }}
          size="sm"
          src={
            channel?.profile_picture_url
              ? generateChanneImagelUrl(channel.profile_picture_url, { size: 40 })
              : ''
          }
        />
        <Text fw={500} className={css.channelNm} component="span" lineClamp={1}>
          {channel?.name_kor}
        </Text>
      </Flex>

      <Text size="sm" c="dimmed" className={css.title} mt="xs">
        {content.title}
      </Text>

      <div className={css.navBox}>
        <div>
          {/* <Tooltip label={t('home.sliderCard.setNotification')} position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickAlarm}>
              <TbBellRingingFilled color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip> */}
          <Tooltip
            label={`${t('home.sliderCard.favorite')} ${isFavorite ? t('home.sliderCard.remove') : t('home.sliderCard.add')}`}
            position="bottom"
            withArrow
          >
            <ActionIcon variant="transparent" onClick={onClickFavorite}>
              <FasStar color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('home.sliderCard.blockChannel')} position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickBlock}>
              <MdiBlock color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('home.sliderCard.openInNewTab')} position="bottom" withArrow>
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
