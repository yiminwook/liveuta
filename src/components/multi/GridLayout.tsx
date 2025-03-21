import X from '@/components/icons/tabler/X';
import useCachedData from '@/hooks/useCachedData';
import { useSchedule } from '@/hooks/useSchedule';
import dayjs from '@/libraries/dayjs';
import { generateThumbnail } from '@/libraries/youtube/thumbnail';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { TContentsData } from '@/types/api/mongoDB';
import { TScheduleDto } from '@/types/dto';
import { AntDesignDragOutlined } from '@icons/antd/DragOutlined';
import { MaterialSymbolsInfoOutline } from '@icons/material-symbols/InfoOutline';
import TablerChevronLeft from '@icons/tabler/ChevronLeft';
import TablerChevronRight from '@icons/tabler/ChevronRight';
import {
  ActionIcon,
  Avatar,
  Box,
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
import { useLocale, useTranslations } from 'next-intl';
import {
  ChangeEvent,
  MouseEventHandler,
  Ref,
  TouchEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import css from './GridLayout.module.scss';
import GridPlayer from './GridPlayer';

const LAYOUTS_STORAGE_KEY = 'layouts_v1';
const MAP_STORAGE_KEY = 'multi-video-map';
const BRAEK_POINTS = { lg: 1280, md: 1024, sm: 768, xs: 480 };
const DEFAULT_POINT = 'lg';
const COLS = { lg: 8, md: 6, sm: 4, xs: 2 };
const MAX_ITEM_LENGTH = 12;

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Grid() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GridCore />
    </ErrorBoundary>
  );
}

function GridCore() {
  const containerRef = useRef<HTMLDivElement>(null!);

  // const [breakPoint, setBreakPoint] = useState('lg');
  const [videoMap, setVideoMap] = useState<Record<string, string>>(getVideoMap);
  const [layouts, setLayouts] = useState<Layouts>(getLayout);
  const [isFlip, setIsFlip] = useState(false);

  const toggleFlip = () => setIsFlip((p) => !p);

  const handleAdd = (url: string) => {
    const currentLength = layouts[DEFAULT_POINT]?.length || 0;

    if (currentLength >= MAX_ITEM_LENGTH) {
      toast.warning(`${MAX_ITEM_LENGTH}개이상 추가 할 수 없습니다.`);
      return;
    }

    const newItem: Layout = {
      i: uuid(),
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };

    setLayouts((prevLayouts) => {
      const updatedLayouts = { ...prevLayouts };

      for (const point in BRAEK_POINTS) {
        if (!updatedLayouts[point]) {
          updatedLayouts[point] = [newItem];
          continue;
        }

        updatedLayouts[point] = [...updatedLayouts[point], newItem];
      }

      saveLayout(updatedLayouts);
      return updatedLayouts;
    });

    setVideoMap((prevMap) => {
      const updatedMap = { ...prevMap, [newItem.i]: url };
      saveVideoMap(updatedMap);
      return updatedMap;
    });
  };

  const handleRemove = (id: string) => {
    setLayouts((prevLayouts) => {
      const updatedLayouts = { ...prevLayouts };

      for (const point in BRAEK_POINTS) {
        if (!updatedLayouts[point]) continue;

        updatedLayouts[point] = updatedLayouts[point].filter((item) => {
          return item.i !== id;
        });
      }

      saveLayout(updatedLayouts);

      return updatedLayouts;
    });

    setVideoMap((prevMap) => {
      const updatedMap = { ...prevMap };
      delete updatedMap[id];
      saveVideoMap(updatedMap);
      return updatedMap;
    });
  };

  const handleClear = () => {
    setLayouts(() => {
      saveLayout({});
      return {};
    });

    setVideoMap(() => {
      saveVideoMap({});
      return {};
    });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container} ref={containerRef}>
        <ResponsiveGridLayout
          className={css.layout}
          layouts={layouts}
          breakpoints={BRAEK_POINTS}
          cols={COLS}
          // onWidthChange={(containerWidth, newCols) => {
          //   const newBreakpoint = Object.keys(BRAEK_POINTS).find(
          //     (point) => containerWidth >= BRAEK_POINTS[point as keyof typeof BRAEK_POINTS],
          //   );
          //   if (newBreakpoint) {
          //     setBreakPoint(newBreakpoint);
          //   }
          // }}
          onLayoutChange={(layout, layouts) => {
            saveLayout(layouts);
            setLayouts(layouts);
          }}
          onDrag={() => containerRef.current.setAttribute('data-dragging', 'true')}
          onDragStop={() => containerRef.current.setAttribute('data-dragging', 'false')}
          draggableCancel={`.${css.remove}`}
          draggableHandle={`.${css.drag}`}
          containerPadding={[0, 0]}
          margin={[0, 0]}
          // rowHeight={30}
          // measureBeforeMount={false}
        >
          {layouts[DEFAULT_POINT]?.map((layout) => (
            <GridLayoutItem
              layout={layout}
              key={layout.i}
              url={videoMap?.[layout.i] || ''}
              className={layout.static ? 'static' : ''}
              onRemove={() => handleRemove(layout.i)}
            />
          ))}
        </ResponsiveGridLayout>
      </div>

      <Sidebar isFlip={isFlip} toggleFlip={toggleFlip} onAdd={handleAdd} onClear={handleClear} />
    </div>
  );
}

interface SidebarProps {
  onAdd: (url: string) => void;
  onClear: () => void;
  isFlip: boolean;
  toggleFlip: () => void;
}

function Sidebar({ onAdd, onClear, isFlip, toggleFlip }: SidebarProps) {
  const [newUrl, setNewUrl] = useState('');
  const theme = useMantineTheme();
  const t = useTranslations();

  const session = useSession().data;
  const { blackList } = useCachedData({ session });
  const { data, isPending } = useSchedule({ enableAutoSync: true });
  const [filter, setFilter] = useState<TScheduleDto['filter']>('live');

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
      const inBlacklist = blackList.has(content.channelId);

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
  }, [data, blackList, filter]);

  const selectItems: ComboboxData = [
    { value: 'scheduled', label: t('schedule.navTab.scheduled') },
    { value: 'live', label: t('schedule.navTab.live') },
    { value: 'daily', label: t('schedule.navTab.daily') },
    { value: 'all', label: t('schedule.navTab.all') },
  ];

  if (isFlip) {
    return (
      <div className={css.sidebar} data-active="false">
        <div className={css.sidebarPosition}>
          <div className={css.sidebarHeader}>
            <div className={css.sidebarHeaderLeft}>
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
    <div className={css.sidebar} data-active="true">
      <div className={css.sidebarPosition}>
        <div className={css.sidebarHeader}>
          <div className={css.sidebarHeaderLeft}>
            <ActionIcon variant="outline" size="sm" onClick={toggleFlip}>
              <TablerChevronLeft />
            </ActionIcon>
          </div>

          <div className={css.sidebarHeaderRight}>
            <Tooltip label={'모바일 환경은 지원되지 않습니다.'} position="top" withArrow>
              <ActionIcon variant="ghost" size="compact-xs" radius="lg">
                <MaterialSymbolsInfoOutline />
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

        <div className={css.sidebarInputBox}>
          <TextInput
            value={newUrl}
            onChange={onChangeUrl}
            placeholder="URL을 입력해주세요"
            rightSection={
              <Box pe="var(--input-padding-inline-start)">
                <Button variant="outline" size="compact-xs" onClick={onClickAdd}>
                  ADD
                </Button>
              </Box>
            }
          />
        </div>

        <div className={classNames(css.sidebarContent, { loading: isPending })}>
          {isPending && <Loader color={variable.thirdColorDefault} />}
          {proceedScheduleData.map((content) => (
            <ListItem key={content.videoId} content={content} onAddById={onClickAddByListItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ListItemProps {
  content: TContentsData;
  onAddById: (videoId: string) => void;
}

function ListItem({ content, onAddById }: ListItemProps) {
  const thumbnail = generateThumbnail(content.videoId, 'mqdefault');
  const t = useTranslations();
  const locale = useLocale();
  const time = dayjs(content.timestamp).locale(locale).format(t('dayjsScheduleTemplate'));
  return (
    <div className={css.listItem}>
      <div className={css.listItemHeader}>
        <div className={css.listItemHeaderLeft}>
          <Avatar className={css.avatar} size="md" src={thumbnail} />
          <div>
            <span className={classNames(css.channelName, css.line)}>{content.channelName}</span>
            {content.viewer > 0 && <span className={css.line}>Viewer: {content.viewer}</span>}
          </div>
        </div>
        <ActionIcon variant="subtle" onClick={() => onAddById(content.videoId)}>
          +
        </ActionIcon>
      </div>
      <time className={css.line}>{time}</time>
      <p className={css.title}>{content.title}</p>
    </div>
  );
}

function getLayout() {
  let layouts: Layouts = {};
  const savedItem = window.localStorage?.getItem(LAYOUTS_STORAGE_KEY);

  if (savedItem) {
    layouts = JSON.parse(savedItem) || {};
  }

  return layouts;
}

function saveLayout(value: Layouts) {
  if (window.localStorage) {
    window.localStorage.setItem(LAYOUTS_STORAGE_KEY, JSON.stringify(value));
  }
}

function getVideoMap() {
  let map: Record<string, string> = {};
  const savedItem = window.localStorage?.getItem(MAP_STORAGE_KEY);

  if (savedItem) {
    map = JSON.parse(savedItem) || {};
  }

  return map;
}

function saveVideoMap(map: Record<string, string>) {
  if (window.localStorage) {
    window.localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(map));
  }
}

interface GridLayoutItemProps {
  className?: string;
  ref?: Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onMouseUp?: MouseEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
  url: string;
  onRemove: () => void;
  layout: Layout;
}

function GridLayoutItem({
  className,
  style,
  ref,
  url,
  children,
  onRemove,
  layout,
  ...props
}: GridLayoutItemProps) {
  return (
    <div
      {...props}
      className={classNames(className, css.box)}
      ref={ref}
      style={{ ...style }}
      data-grid={layout}
    >
      <GridPlayer url={url} />
      <DragHandle />
      <RemoveHandle onClick={onRemove} />
      {children}
    </div>
  );
}

interface DragHandleProps {
  className?: string;
  ref?: Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onMouseUp?: MouseEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

function DragHandle({ className, style, ref, children, ...props }: DragHandleProps) {
  return (
    <span {...props} className={classNames(className, css.drag)} style={{ ...style }} ref={ref}>
      <AntDesignDragOutlined width={20} height={20} />
      {children}
    </span>
  );
}

function RemoveHandle({ onClick }: { onClick: () => void }) {
  return (
    <span className={classNames(css.remove)} onClick={onClick}>
      <X color="#fff" width={20} height={20} />
    </span>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const onClick = () => {
    saveLayout({});
    saveVideoMap({});
    resetErrorBoundary();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>에러가 발생하였습니다.</p>
      <p>반복적으로 발생할시 관리자에게 문의해주세요</p>
      <div style={{ textAlign: 'center' }}>
        <Button size="xs" onClick={onClick}>
          RETRY
        </Button>
      </div>
    </div>
  );
}
