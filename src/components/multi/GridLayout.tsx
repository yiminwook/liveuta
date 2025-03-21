import X from '@/components/icons/tabler/X';
import { AntDesignDragOutlined } from '@icons/antd/DragOutlined';
import { Button, Input, TextInput } from '@mantine/core';
import classNames from 'classnames';
import { MouseEventHandler, Ref, TouchEventHandler, useRef, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { v4 as uuid } from 'uuid';
import css from './GridLayout.module.scss';
import Shorts from './Shorts';

const LAYOUTS_STORAGE_KEY = 'layouts';
const MAP_STORAGE_KEY = 'multi-video-map';
const BRAEK_POINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function GridLayout() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [breakPoint, setBreakPoint] = useState('lg');
  const [videoMap, setVideoMap] = useState<Record<string, string>>(getVideoMap);
  const [layouts, setLayouts] = useState<Layouts>(getLayout);

  const [newUrl, setNewUrl] = useState('');

  const handleAdd = () => {
    if (!newUrl) return;

    const newItem: Layout = {
      i: uuid(),
      x: 0,
      y: Infinity,
      w: 1,
      h: 1,
    };

    setLayouts((prevLayouts) => {
      const updatedLayouts = { ...prevLayouts };
      for (const point in BRAEK_POINTS) {
        if (!updatedLayouts[point]) {
          updatedLayouts[point] = [];
          continue;
        }

        updatedLayouts[point] = [...updatedLayouts[point], newItem];
      }

      console.log('updatedLayouts', updatedLayouts);
      saveLayout(updatedLayouts);
      return updatedLayouts;
    });

    setVideoMap((prevMap) => {
      const updatedMap = { ...prevMap, [newItem.i]: newUrl };
      saveVideoMap(updatedMap);
      return updatedMap;
    });

    setNewUrl('');
  };

  const handleRemove = (id: string) => {
    setLayouts((prevLayouts) => {
      const updatedLayouts = { ...prevLayouts };

      for (const point in BRAEK_POINTS) {
        updatedLayouts[point] = updatedLayouts[point].filter((item) => {
          console.log(item.i, id);
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
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <div>
        <TextInput label="url" value={newUrl} onChange={(e) => setNewUrl(e.currentTarget.value)} />
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleClear}>Clear</Button>
        <div>{breakPoint}</div>
      </div>

      <ResponsiveReactGridLayout
        innerRef={containerRef}
        className={classNames(css.layout, 'layout')}
        layouts={layouts}
        breakpoint={breakPoint}
        breakpoints={BRAEK_POINTS}
        cols={{ lg: 3, md: 3, sm: 3, xs: 2, xxs: 1 }}
        // rowHeight={700}
        // width={1200}
        // onBreakpointChange={(newBreakpoint) => {
        //   console.log('onBreakpointChange', newBreakpoint);
        //   setBreakPoint(() => newBreakpoint);
        // }}
        onWidthChange={(containerWidth, newCols) => {
          console.log('onWidthChange', containerWidth, newCols);

          const newBreakpoint = Object.keys(BRAEK_POINTS).find(
            (point) => containerWidth >= BRAEK_POINTS[point as keyof typeof BRAEK_POINTS],
          );

          if (newBreakpoint) {
            setBreakPoint(newBreakpoint);
          }
        }}
        onLayoutChange={(layout, layouts) => {
          console.log('onLayoutChange', layout, layouts);
          saveLayout(layouts);
          setLayouts(layouts);
        }}
        onDrag={() => containerRef.current.setAttribute('data-dragging', 'true')}
        onDragStop={() => containerRef.current.setAttribute('data-dragging', 'false')}
        draggableCancel={`.${css.remove}`}
        draggableHandle={`.${css.drag}`}
        containerPadding={[10, 10]}
        // measureBeforeMount={false}
      >
        {layouts.lg?.map((layout) => (
          <GridLayoutItem
            key={layout.i}
            url={videoMap?.[layout.i] || ''}
            className={layout.static ? 'static' : ''}
            onRemove={() => handleRemove(layout.i)}
          />
        ))}
      </ResponsiveReactGridLayout>
    </ErrorBoundary>
  );
}

function getLayout() {
  let layouts: Layouts = {};
  const savedItem = window.localStorage?.getItem(LAYOUTS_STORAGE_KEY);

  if (savedItem) {
    try {
      layouts = JSON.parse(savedItem) || {};
    } catch (error) {
      /*Ignore*/
      console.error('Error parsing saved layouts');
    }
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
    try {
      map = JSON.parse(savedItem) || {};
    } catch (error) {
      /*Ignore*/
      console.error('Error parsing saved map');
    }
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
}

function GridLayoutItem({
  className,
  style,
  ref,
  url,
  children,
  onRemove,
  ...props
}: GridLayoutItemProps) {
  return (
    <div {...props} className={classNames(className, css.box)} ref={ref} style={{ ...style }}>
      <Shorts url={url} />
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
  return <div>에러발생</div>;
}
