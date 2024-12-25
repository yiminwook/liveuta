import type { ReactNode } from 'react';
import { useMemo } from 'react';

type ForProps<T extends unknown[]> = {
  each: T | undefined | null;
  fallback?: ReactNode;
  children: (item: T[number], index: number) => ReactNode;
};

/**
 * 배열을 순회하며 컴포넌트를 렌더링
 * @example
 * ```tsx
 * <For each={[1, 2, 3]} fallback={<div>fallback</div>}>
 *  {(item, index) => <div key={index}>{item}</div>}
 * </For>
 * ```
 */
export default function For<T extends unknown[]>({
  each,
  fallback,
  children,
}: ForProps<T>): ReactNode {
  return useMemo(() => {
    if (each === undefined || each === null) {
      return fallback;
    }

    return each.map((item, index) => children(item, index));
  }, [each, fallback, children]);
}
