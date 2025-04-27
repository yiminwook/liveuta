import {
  DRAGGABLE_BOX_ID,
  DRAGGABLE_ZONE_RANGE,
  DROP_ZONES,
  DROP_ZONE_RANGE,
  PIP_LOCAL_STORAGE_KEY,
  TCorner,
  transfromStringToConer,
} from '@/constants/pip';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { getBoxPositionStyle } from '@/utils/helper';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DraggableAttributes,
  UniqueIdentifier,
  closestCenter,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { AntDesignDragOutlined } from '@icons/antd/DragOutlined';
import TablerX from '@icons/tabler/X';
import { ActionIcon, Tooltip } from '@mantine/core';
import classNames from 'classnames';
import { CSSProperties, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import dndCss from './DndComponents.module.scss';
import PlayerBase from './PlayerBase';

type DraggablePipProps = {
  mode: 'default' | 'pip';
  isShowHideButton?: boolean;
  onClickHide?: () => void;
  locale: TLocaleCode;
};

export function DraggablePlayer({
  mode,
  isShowHideButton = false,
  onClickHide,
  locale,
}: DraggablePipProps) {
  const [draggingId, setDraggingId] = useState<UniqueIdentifier | null>(null);
  const [boxCorner, setBoxCorner] = useState<TCorner>(getLocalStoragePipPosition); // 박스의 현재 모서리 위치 (null, 'topLeft', ...)

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && Object.hasOwn(DRAGGABLE_ZONE_RANGE, event.over.id)) {
      setBoxCorner(event.over.id as TCorner);
      saveLocalStoragePipPosition(event.over.id as TCorner);
    }

    setDraggingId(null);
  };

  const handleDragCancel = () => {
    setDraggingId(null);
  };

  const isDragging = draggingId !== null;
  const boxPositionStyle = getBoxPositionStyle(boxCorner); // 현재 모서리에 따른 스타일 계산

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter} // 충돌 감지 전략
    >
      {isDragging && (
        <RemoveScroll removeScrollBar={false}>
          {DROP_ZONES.map(({ id, corner }) => (
            <DroppableZone key={id} id={id} corner={corner} />
          ))}
        </RemoveScroll>
      )}

      <Position
        locale={locale}
        mode={mode}
        id={DRAGGABLE_BOX_ID}
        isShowHideButton={isShowHideButton}
        onClickHide={onClickHide}
        positionStyle={boxPositionStyle}
        isDragging={isDragging}
      />
    </DndContext>
  );
}

function Position({
  mode,
  id,
  isShowHideButton,
  positionStyle,
  isDragging,
  onClickHide,
  locale,
}: {
  mode: 'default' | 'pip';
  id: string;
  isShowHideButton: boolean;
  positionStyle: CSSProperties;
  isDragging: boolean;
  onClickHide?: () => void;
  locale: TLocaleCode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      style={
        {
          ...positionStyle,
          '--translate-x': `${transform?.x ?? 0}px`,
          '--translate-y': `${transform?.y ?? 0}px`,
        } as React.CSSProperties
      }
      className={classNames({
        [dndCss.defaultMode]: mode === 'default',
        [dndCss.draggable]: mode === 'pip',
        [dndCss.dragging]: isDragging,
      })}
    >
      {mode === 'pip' && (
        <PipNav
          locale={locale}
          isShowHideButton={isShowHideButton}
          onClickHide={onClickHide}
          dndHandleAttributes={attributes}
          dndHandleListeners={listeners}
        />
      )}
      <PlayerBase mode={mode} locale={locale} />
    </div>
  );
}

type PipNavProps = {
  isShowHideButton: boolean;
  onClickHide?: () => void;
  dndHandleAttributes?: DraggableAttributes;
  dndHandleListeners?: SyntheticListenerMap | undefined;
  locale: TLocaleCode;
};

function PipNav({
  isShowHideButton,
  onClickHide,
  dndHandleAttributes,
  dndHandleListeners,
  locale,
}: PipNavProps) {
  const { t } = useTranslations(locale);

  return (
    <div className={dndCss.pipNav}>
      {isShowHideButton && (
        <Tooltip label={t('global.player.hide')} position="top" withArrow>
          <ActionIcon
            variant="transparent"
            mr={5}
            size="md"
            classNames={{ root: classNames(dndCss.pipNavButton) }}
            onClick={onClickHide}
          >
            <TablerX width={18} height={18} />
          </ActionIcon>
        </Tooltip>
      )}
      <ActionIcon
        size="md"
        variant="transparent"
        classNames={{ root: classNames(dndCss.pipNavButton, dndCss.handle) }}
        {...dndHandleListeners}
        {...dndHandleAttributes}
      >
        <AntDesignDragOutlined width={18} height={18} />
      </ActionIcon>
    </div>
  );
}

function DroppableZone({
  id,
  corner,
}: {
  id: string;
  corner: TCorner;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={DROP_ZONE_RANGE[corner]}
      className={classNames(dndCss.droppableZone, { [dndCss.isOver]: isOver })}
    />
  );
}

const getLocalStoragePipPosition = () => {
  const savedConer = window.localStorage?.getItem(PIP_LOCAL_STORAGE_KEY);
  return transfromStringToConer.parse(savedConer);
};

const saveLocalStoragePipPosition = (corner: TCorner) => {
  if (window.localStorage) {
    window.localStorage.setItem(PIP_LOCAL_STORAGE_KEY, corner);
  }
};
