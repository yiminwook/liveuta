import { DRAGGABLE_ZONE_RANGE, TCorner } from '@/constants/pip';
import { TTheme } from '@/types';

export const waitfor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isDarkModeEnabled = (theme: TTheme) => {
  const themeIndex = Number(theme.replace('theme', '')) || 1;
  return themeIndex > 3;
};

// 박스 위치 스타일 반환 함수
export function getBoxPositionStyle(corner: TCorner) {
  const style = DRAGGABLE_ZONE_RANGE[corner];
  // style 객체에서 undefined가 아닌 값만 필터링
  const filteredStyle = Object.entries(style).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = `${value}px`; // px 단위 추가
      }
      return acc;
    },
    {},
  );

  // 초기 상태 또는 지정되지 않은 경우 기본 위치 (예: 중앙)
  if (Object.keys(filteredStyle).length === 0) {
    return { top: 'calc(50% - 50px)', left: 'calc(50% - 50px)' }; // 박스 크기 고려하여 중앙 정렬
  }
  return filteredStyle;
}
