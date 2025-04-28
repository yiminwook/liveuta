import useCachedData from '@/hooks/useCachedData';
import { useSchedule } from '@/hooks/useSchedule';
import { useTranslations } from '@/libraries/i18n/client';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { TScheduleDto } from '@/types/dto';
import { MaterialSymbolsInfoOutline } from '@icons/material-symbols/InfoOutline';
import TablerChevronLeft from '@icons/tabler/ChevronLeft';
import {
  ActionIcon,
  Button,
  ComboboxData,
  Loader,
  Select,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import variable from '@variable';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useMemo, useState } from 'react';
import css from './GridNav.module.scss';
import GridNavItem from './GridNavItem';

type Props = {
  isFlip: boolean;
  onAdd: (url: string) => void;
  onClear: () => void;
  toggleFlip: () => void;
};

export default function GridNav({ onAdd, onClear, isFlip, toggleFlip }: Props) {
  const theme = useMantineTheme();
  const { t } = useTranslations();
  const session = useSession().data;

  const [filter, setFilter] = useState<TScheduleDto['filter']>('live');
  const [newUrl, setNewUrl] = useState('');

  const { blackListMap, channelMap } = useCachedData({ session });
  const { data, isPending } = useSchedule({ enableAutoSync: true });

  const onChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUrl(() => e.target.value);
  };

  const onClickAdd = () => {
    onAdd(newUrl);
    setNewUrl(() => '');
  };

  const onClickAddByListItem = (videoId: string) => {
    onAdd(generateVideoUrl(videoId));
  };

  const onClickClear = () => {
    onClear();
    setNewUrl(() => '');
  };

  const proceedScheduleData = useMemo(() => {
    if (!data) return [];

    const filteredContent = data[filter].filter((content) => {
      const inBlacklist = blackListMap.has(content.channelId);

      let isPassList: boolean;

      // if (scheduleDto.isFavorite) {
      //   isPassList = inWhitelist;
      // } else {
      isPassList = !inBlacklist;
      // }

      let isPassType: boolean;

      // switch (scheduleDto.select) {
      //   case 'stream':
      //     isPassType = !content.isVideo;
      //     break;
      //   case 'video':
      //     isPassType = content.isVideo;
      //     break;
      //   default:
      isPassType = true;
      //     break;
      // }

      return isPassList && isPassType;
    });

    return filteredContent;
  }, [data, blackListMap, filter]);

  const selectItems: ComboboxData = [
    { value: 'scheduled', label: t('schedule.navTab.scheduled') },
    { value: 'live', label: t('schedule.navTab.live') },
    { value: 'daily', label: t('schedule.navTab.daily') },
    { value: 'all', label: t('schedule.navTab.all') },
  ];

  if (isFlip) {
    return (
      <div className={css.wrapper} data-active="false">
        <div className={css.position}>
          <div className={css.header}>
            <div className={css.headerLeft}>
              <ActionIcon variant="outline" size="sm" onClick={toggleFlip}>
                <TablerChevronLeft />
              </ActionIcon>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.wrapper} data-active="true">
      <div className={css.position}>
        <div className={css.header}>
          <div className={css.headerLeft}>
            <ActionIcon variant="outline" size="sm" onClick={toggleFlip}>
              <TablerChevronLeft />
            </ActionIcon>
          </div>

          <div className={css.headerRight}>
            <Tooltip label={'모바일 환경은 지원되지 않습니다.'} position="top" withArrow>
              <ActionIcon variant="transparent" size="compact-xs" radius="lg">
                <MaterialSymbolsInfoOutline color={variable.thirdColorDefault} />
              </ActionIcon>
            </Tooltip>

            <Button
              variant="subtle"
              color={theme.colors.green[9]}
              size="compact-xs"
              onClick={onClickClear}
            >
              CLEAR
            </Button>

            <Select
              w={100}
              size="xs"
              onChange={(v) => v && setFilter(() => v as TScheduleDto['filter'])}
              value={filter}
              data={selectItems}
            />
          </div>
        </div>

        <div className={css.urlInputBox}>
          <TextInput
            styles={{
              wrapper: {
                '--input-right-section-size': '4rem',
              },
            }}
            value={newUrl}
            onChange={onChangeUrl}
            placeholder="URL을 입력해주세요"
            rightSection={
              <Button variant="filled" size="compact-xs" onClick={onClickAdd}>
                ADD
              </Button>
            }
          />
        </div>

        <div className={classNames(css.content, { loading: isPending })}>
          {isPending && <Loader color={variable.thirdColorDefault} />}
          {proceedScheduleData.map((content) => (
            <GridNavItem
              key={content.videoId}
              content={content}
              onAddById={onClickAddByListItem}
              channel={channelMap[content.channelId]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
