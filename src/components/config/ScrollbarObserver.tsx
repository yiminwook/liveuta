'use client';
import { useAppCtx } from '@/stores/app';
import { useEffect } from 'react';
import { useStore } from 'zustand';

type ScrollbarObserver = {};

export default function ScrollbarObserver({}: ScrollbarObserver) {
  const ctx = useAppCtx();
  const removeElIds = useStore(ctx, (state) => state.removeElIds);

  useEffect(() => {
    const $scroll = document.documentElement.querySelector('.os-scrollbar-vertical');
    if (!$scroll) return;

    $scroll.classList.toggle('hidden', removeElIds.length > 0);
  }, [removeElIds]);

  return null;
}
