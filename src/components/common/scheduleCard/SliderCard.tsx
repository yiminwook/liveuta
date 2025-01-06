import { generateVideoUrl } from '@/libraries/youtube/url';
import { STAT_MAPPER, TContentsData } from '@/types/api/mongoDB';
import FasStar from '@icons/fa-solid/Star';
import IonPerson from '@icons/ion/Person';
import IonPlus from '@icons/ion/PlusRound';
import MsOpenInNew from '@icons/material-symbols/OpenInNew';
import MdiBlock from '@icons/mdi/Block';
import TbBellRingingFilled from '@icons/tabler/BellRingingFilled';
import { ActionIcon, Badge, Card, Text, Tooltip } from '@mantine/core';
import variable from '@variable';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('home.sliderCard');

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
          <Tooltip label={t('setNotification')} position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickAlarm}>
              <TbBellRingingFilled color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('addMultiView')} position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickAddMultiView}>
              <IonPlus color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={`${t('favorite')} ${isFavorite ? t('remove') : t('add')}`}
            position="bottom"
            withArrow
          >
            <ActionIcon variant="transparent" onClick={onClickFavorite}>
              <FasStar color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('blockChannel')} position="bottom" withArrow>
            <ActionIcon variant="transparent" onClick={onClickBlock}>
              <MdiBlock color={variable.thirdColorDefault} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('openInNewTab')} position="bottom" withArrow>
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
