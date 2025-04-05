import {
  DRAGGABLE_BOX_ID,
  DRAGGABLE_ZONE_RANGE,
  DROP_ZONES,
  DROP_ZONE_RANGE,
  TCorner,
} from '@/constants/pip';
import { getBoxPositionStyle } from '@/utils/helper';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter, // 또는 다른 충돌 감지 알고리즘
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { AntDesignDragOutlined } from '@icons/antd/DragOutlined';
import { ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import PipPlayer from './PipPlayer';
import css from './Player.module.scss';

console.log('PipPlayer', 'lodad pip player');

export function DndPip() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null); // 현재 드래그 중인 아이템 ID
  const [boxCorner, setBoxCorner] = useState<TCorner>('bottomLeft'); // 박스의 현재 모서리 위치 (null, 'topLeft', ...)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && Object.hasOwn(DRAGGABLE_ZONE_RANGE, event.over.id)) {
      setBoxCorner(event.over.id as TCorner); // 드롭된 영역의 ID에 따라 모서리 설정
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
      {/* 드래그 중일 때만 드롭 영역 표시 */}
      {isDragging && (
        <RemoveScroll removeScrollBar={false}>
          {DROP_ZONES.map(({ id, corner }) => (
            <DroppableZone key={id} id={id} corner={corner} />
          ))}
        </RemoveScroll>
      )}

      {/* 드래그 가능한 박스 - isDragging 상태를 전달하여 원본 숨김 처리 */}
      {!isDragging && (
        <DraggableBox id={DRAGGABLE_BOX_ID} positionStyle={boxPositionStyle} isDragging={false} />
      )}

      {/* DragOverlay: 드래그 중일 때 보여줄 요소 */}
      <DragOverlay>
        {activeId === DRAGGABLE_BOX_ID && (
          // 드래그 중인 박스의 시각적 복제본 (스타일 동일하게 적용)
          <div
            style={{
              // ...getBoxPositionStyle('bottomLeft'), // DragOverlay는 transform으로 움직이므로 초기 위치 스타일만 적용
              cursor: 'grabbing',
              backgroundColor: 'lightgray',
              border: '1px solid black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              opacity: 0.7, // 드래그 중 약간 투명하게
              zIndex: 100, // 최상단에 보이도록
              width: '300px',
              height: '200px',
            }}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}

// 1. 드래그 가능한 박스 컴포넌트
export function DraggableBox({
  id,
  positionStyle,
  isDragging,
}: {
  id: string;
  positionStyle: React.CSSProperties; // 모서리 위치 스타일
  isDragging: boolean; // 드래그 중인지 여부
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    // 기본 위치 + 드래그 중 transform 적용
    ...positionStyle, // 모서리 위치 적용
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1, // 드래그 중 반투명 처리 (선택 사항)
    color: 'white',
    border: '1px solid black',
    position: 'fixed', // 위치 제어를 위해 absolute 사용
    zIndex: 300, // 다른 요소 위에 보이도록
    transition: 'top 0.3s ease, left 0.3s ease, right 0.3s ease, bottom 0.3s ease', // 부드러운 이동 효과
  } satisfies React.CSSProperties;

  const handleStyle = {
    width: '40px', // 박스 너비 전체
    height: '40px', // 박스 높이 전체
    position: 'absolute', // 박스 내에서 위치 조정
    top: '-40px',
    right: '0',
    padding: '5px',
    backgroundColor: 'lightgray',
    color: 'white',
    textAlign: 'center',
    cursor: 'grab', // 잡을 수 있는 커서 모양
    touchAction: 'none', // 모바일 드래그 시 스크롤 방지 (중요)
  } satisfies React.CSSProperties;

  // isDragging 상태일 때는 원본 박스를 숨기고 DragOverlay에서 보여주도록 처리
  if (isDragging) {
    return (
      <div ref={setNodeRef} style={{ ...style, opacity: 0 }}>
        <ActionIcon style={handleStyle} {...listeners} {...attributes}>
          <AntDesignDragOutlined />
        </ActionIcon>
        <PipPlayer />
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style}>
      <ActionIcon style={handleStyle} {...listeners} {...attributes}>
        <AntDesignDragOutlined />
      </ActionIcon>
      <PipPlayer />
    </div>
  );
}

// 2. 드롭 영역 컴포넌트
export function DroppableZone({
  id,
  corner,
}: {
  id: string; // 드롭 영역 ID
  corner: TCorner;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const conerStyle = DROP_ZONE_RANGE[corner]; // 드롭 영역 범위

  const style = {
    ...conerStyle, // 영역 위치 계산
    position: 'fixed', // 드롭 영역을 화면에 고정
    width: '50vw', // 화면 너비의 50%
    height: '50vh', // 화면 높이의 50%
    border: isOver ? '2px dashed blue' : '1px dashed lightgray', // 드롭 가능 표시
    backgroundColor: isOver ? 'rgba(0, 0, 255, 0.1)' : 'transparent', // 마우스 오버시 배경색 변경
    zIndex: 1, // 박스보다는 뒤에 있도록
    boxSizing: 'border-box',
  } satisfies React.CSSProperties;

  return <div ref={setNodeRef} style={style} />;
}
