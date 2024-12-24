import { type ReactNode, useMemo } from 'react';

type ShowProps = {
  children: ReactNode;
  when: boolean;
  fallback?: ReactNode;
};

/**
 * 조건에 따라 렌더링할 컴포넌트를 선택
 * @example
 * ```tsx
 * <Show when={true} fallback={<div>fallback</div>}>
 *   <div>children</div>
 * </Show>
 * ```
 */
export default function Show({ children, when, fallback }: ShowProps): ReactNode {
  return useMemo(() => (when ? children : fallback), [when, children, fallback]);
}
