import {
  MULTI_VIEW_GRID_LAYOUT_STORAGE_KEY,
  MULTI_VIEW_VIDEO_MAP_STORAGE_KEY,
} from '@/constants/multi';
import { Layouts } from 'react-grid-layout';

export function getLayout() {
  let layouts: Layouts = {};
  const savedItem = window.localStorage?.getItem(MULTI_VIEW_GRID_LAYOUT_STORAGE_KEY);

  if (savedItem) {
    layouts = JSON.parse(savedItem) || {};
  }

  return layouts;
}

export function saveLayout(value: Layouts) {
  if (window.localStorage) {
    window.localStorage.setItem(MULTI_VIEW_GRID_LAYOUT_STORAGE_KEY, JSON.stringify(value));
  }
}

export function getVideoMap() {
  let map: Record<string, string> = {};
  const savedItem = window.localStorage?.getItem(MULTI_VIEW_VIDEO_MAP_STORAGE_KEY);

  if (savedItem) {
    map = JSON.parse(savedItem) || {};
  }

  return map;
}

export function saveVideoMap(map: Record<string, string>) {
  if (window.localStorage) {
    window.localStorage.setItem(MULTI_VIEW_VIDEO_MAP_STORAGE_KEY, JSON.stringify(map));
  }
}
