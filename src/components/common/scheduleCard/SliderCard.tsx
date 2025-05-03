import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { generateChanneImagelUrl, generateVideoUrl } from '@/libraries/youtube/url';
import {
  STREAM_STATUS_MAPPER,
  TChannelDocumentWithoutId,
  TParsedClientContent,
} from '@/types/api/mongoDB';
import FasStar from '@icons/fa-solid/Star';
import IonPerson from '@icons/ion/Person';
import IonPlus from '@icons/ion/PlusRound';
import MsOpenInNew from '@icons/material-symbols/OpenInNew';
import MdiBlock from '@icons/mdi/Block';
import TbBellRingingFilled from '@icons/tabler/BellRingingFilled';
import { ActionIcon, Avatar, Badge, Card, Flex, Text, Tooltip } from '@mantine/core';
import variable from '@variable';
import CopyButton from '../button/CopyButton';
import CardImage from './CardImage';
import css from './SliderCard.module.scss';

type SliderCardProps = {
  content: TParsedClientContent;
  channel: TChannelDocumentWithoutId | undefined;
  isFavorite?: boolean;
  addAlarm?: (item: TParsedClientContent, channel: TChannelDocumentWithoutId | undefined) => void;
  openNewTab?: (item: TParsedClientContent) => void;
  toggleFavorite?: (item: TParsedClientContent) => void;
  addBlock?: (item: TParsedClientContent) => void;
  copy?: (item: TParsedClientContent) => void;
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
  const { t } = useTranslations();

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
          data-status={STREAM_STATUS_MAPPER[content.broadcastStatus]}
          color={variable.thirdColorDefault}
          leftSection={content.broadcastStatus === 'TRUE' && <IonPerson color="#fff" />}
        >
          {content.broadcastStatus === 'TRUE'
            ? new Intl.NumberFormat('kr', { notation: 'compact' })
                .format(content.viewer)
                .toLowerCase()
            : STREAM_STATUS_MAPPER[content.broadcastStatus]}
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

      <div className={css.titleBox}>
        <span className={css.title}>{content.title}</span>
      </div>
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
