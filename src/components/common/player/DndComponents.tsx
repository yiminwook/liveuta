import {
  DRAGGABLE_BOX_ID,
  DRAGGABLE_ZONE_RANGE,
  DROP_ZONES,
  DROP_ZONE_RANGE,
  PIP_LOCAL_STORAGE_KEY,
  TCorner,
  transfromStringToConer,
} from '@/constants/pip';
import { getBoxPositionStyle } from '@/utils/helper';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { AntDesignDragOutlined } from '@icons/antd/DragOutlined';
import TablerX from '@icons/tabler/X';
import { ActionIcon, Tooltip } from '@mantine/core';
import classNames from 'classnames';
import { CSSProperties, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import dndCss from './DndComponents.module.scss';
import PipPlayer from './PipPlayer';

type DndPipProps = {
  isShowHideButton: boolean;
  onClickHide?: () => void;
};

export function DndPip({ isShowHideButton, onClickHide }: DndPipProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [boxCorner, setBoxCorner] = useState<TCorner>(getLocalStoragePipPosition); // 박스의 현재 모서리 위치 (null, 'topLeft', ...)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && Object.hasOwn(DRAGGABLE_ZONE_RANGE, event.over.id)) {
      setBoxCorner(event.over.id as TCorner);
      saveLocalStoragePipPosition(event.over.id as TCorner);
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const isDragging = activeId !== null;
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

      <Draggable
        id={DRAGGABLE_BOX_ID}
        isShowHideButton={isShowHideButton}
        onClickHide={onClickHide}
        positionStyle={boxPositionStyle}
        isDragging={isDragging}
      />
    </DndContext>
  );
}

export function Draggable({
  id,
  isShowHideButton,
  positionStyle,
  isDragging,
  onClickHide,
}: {
  id: string;
  isShowHideButton: boolean;
  positionStyle: CSSProperties;
  isDragging: boolean;
  onClickHide?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

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
      className={classNames(dndCss.draggable, { [dndCss.dragging]: isDragging })}
    >
      <div className={dndCss.pipNav}>
        {isShowHideButton && (
          <Tooltip label="닫기" position="top" withArrow>
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
        <Tooltip label="이동" position="top" withArrow>
          <ActionIcon
            size="md"
            variant="transparent"
            classNames={{ root: classNames(dndCss.pipNavButton, dndCss.handle) }}
            {...listeners}
            {...attributes}
          >
            <AntDesignDragOutlined width={18} height={18} />
          </ActionIcon>
        </Tooltip>
      </div>
      <PipPlayer />
    </div>
  );
}

export function DroppableZone({
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
