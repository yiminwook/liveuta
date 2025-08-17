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
import clsx from 'clsx';
import { ChevronLeft, Info } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useMemo, useState } from 'react';
import useCachedData from '@/hooks/use-cached-data';
import { useScheduleQuery } from '@/hooks/use-schedule';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { StreamFilter } from '@/types';
import { TScheduleDto } from '@/types/dto';
import css from './grid-nav.module.scss';
import GridNavItem from './grid-nav-item';

type Props = {
  isFlip: boolean;
  onAdd: (url: string) => void;
  onClear: () => void;
  toggleFlip: () => void;
};

export default function GridNav({ onAdd, onClear, isFlip, toggleFlip }: Props) {
  const theme = useMantineTheme();
  const { t } = useTranslations();
  const { data: session } = useSession();
  const locale = useLocale();

  const [filter, setFilter] = useState<StreamFilter>(StreamFilter.live);
  const [newUrl, setNewUrl] = useState('');

  const { blackListMap, channelMap } = useCachedData({ session });
  const { data, isPending } = useScheduleQuery({ filter, enableAutoSync: true, locale });

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

    const filteredContent = data.filter((content) => {
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
                <ChevronLeft />
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
              <ChevronLeft size="1rem" />
            </ActionIcon>
          </div>

          <div className={css.headerRight}>
            <Tooltip label={'모바일 환경은 지원되지 않습니다.'} position="top" withArrow>
              <ActionIcon variant="transparent" size="compact-xs" radius="lg">
                <Info color={variable.thirdColorDefault} size="1rem" />
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

        <div className={clsx(css.content, { loading: isPending })}>
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
