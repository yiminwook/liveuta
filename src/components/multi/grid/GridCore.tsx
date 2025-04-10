import {
  MULTI_VIEW_GRID_LAYOUT_BRAEK_POINTS,
  MULTI_VIEW_GRID_LAYOUT_COLMNS,
  MULTI_VIEW_GRID_LAYOUT_DEFAULT_BREAK_POINT,
  MULTI_VIEW_GRID_MAX_ITEM_LENGTH,
} from '@/constants/multi';
import { useRef, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import css from './Grid.module.scss';
import GridLayoutItem from './GridItem';
import GridNav from './GridNav';
import {
  getLocalStorageLayout,
  getLocalStorageVideoMap,
  saveLocalStorageLayout,
  saveLocalStorageVideoMap,
} from './helper';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridCore() {
  const containerRef = useRef<HTMLDivElement>(null!);

  // const [breakPoint, setBreakPoint] = useState('lg');
  const [videoMap, setVideoMap] = useState<Record<string, string>>(getLocalStorageVideoMap);
  const [layouts, setLayouts] = useState<Layouts>(getLocalStorageLayout);
  const [isFlip, setIsFlip] = useState(false);

  const toggleFlip = () => setIsFlip((p) => !p);

  const handleAdd = (url: string) => {
    const currentLength = layouts[MULTI_VIEW_GRID_LAYOUT_DEFAULT_BREAK_POINT]?.length || 0;

    if (currentLength >= MULTI_VIEW_GRID_MAX_ITEM_LENGTH) {
      toast.warning(`${MULTI_VIEW_GRID_MAX_ITEM_LENGTH}개이상 추가 할 수 없습니다.`);
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

      for (const point in MULTI_VIEW_GRID_LAYOUT_BRAEK_POINTS) {
        if (!updatedLayouts[point]) {
          updatedLayouts[point] = [newItem];
          continue;
        }

        updatedLayouts[point] = [...updatedLayouts[point], newItem];
      }

      saveLocalStorageLayout(updatedLayouts);
      return updatedLayouts;
    });

    setVideoMap((prevMap) => {
      const updatedMap = { ...prevMap, [newItem.i]: url };
      saveLocalStorageVideoMap(updatedMap);
      return updatedMap;
    });
  };

  const handleRemove = (id: string) => {
    setLayouts((prevLayouts) => {
      const updatedLayouts = { ...prevLayouts };

      for (const point in MULTI_VIEW_GRID_LAYOUT_BRAEK_POINTS) {
        if (!updatedLayouts[point]) continue;

        updatedLayouts[point] = updatedLayouts[point].filter((item) => {
          return item.i !== id;
        });
      }

      saveLocalStorageLayout(updatedLayouts);

      return updatedLayouts;
    });

    setVideoMap((prevMap) => {
      const updatedMap = { ...prevMap };
      delete updatedMap[id];
      saveLocalStorageVideoMap(updatedMap);
      return updatedMap;
    });
  };

  const handleClear = () => {
    setLayouts(() => {
      saveLocalStorageLayout({});
      return {};
    });

    setVideoMap(() => {
      saveLocalStorageVideoMap({});
      return {};
    });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container} ref={containerRef}>
        <ResponsiveGridLayout
          className={css.layout}
          layouts={layouts}
          breakpoints={MULTI_VIEW_GRID_LAYOUT_BRAEK_POINTS}
          cols={MULTI_VIEW_GRID_LAYOUT_COLMNS}
          // onWidthChange={(containerWidth, newCols) => {
          //   const newBreakpoint = Object.keys(BRAEK_POINTS).find(
          //     (point) => containerWidth >= BRAEK_POINTS[point as keyof typeof BRAEK_POINTS],
          //   );
          //   if (newBreakpoint) {
          //     setBreakPoint(newBreakpoint);
          //   }
          // }}
          onLayoutChange={(layout, layouts) => {
            saveLocalStorageLayout(layouts);
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
          {layouts[MULTI_VIEW_GRID_LAYOUT_DEFAULT_BREAK_POINT]?.map((layout) => (
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

      <GridNav isFlip={isFlip} toggleFlip={toggleFlip} onAdd={handleAdd} onClear={handleClear} />
    </div>
  );
}
