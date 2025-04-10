'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { useEffect } from 'react';
import { useCommandActions } from './Context';

export default function GlobalCommands() {
  const t = useTranslations('global.command.globalCommands');
  const { addCmdGroup, setCmdOpen } = useCommandActions();
  const router = useRouter();

  useEffect(() => {
    addCmdGroup({
      heading: t('navigate'),
      commands: [
        { title: t('navigation.home'), fn: () => router.push('/'), keywords: ['home'] },
        {
          title: t('navigation.schedule'),
          fn: () => router.push('/schedule'),
          keywords: ['schedules'],
        },
        {
          title: t('navigation.multiView'),
          fn: () => router.push('/multiView'),
          keywords: ['multiView'],
        },
        {
          title: t('navigation.channel'),
          fn: () => router.push('/channel'),
          keywords: ['channel'],
        },
        {
          title: t('navigation.setlist'),
          fn: () => router.push('/setlist'),
          keywords: ['setlist'],
        },
        {
          title: t('navigation.settings'),
          fn: () => router.push('/settings'),
          keywords: ['settings'],
        },
        {
          title: t('navigation.dev'),
          fn: () => router.push('/dev'),
          keywords: ['dev'],
        },
        {
          title: t('navigation.featured'),
          fn: () => router.push('/featured'),
          keywords: ['featured'],
        },
        {
          title: t('navigation.support'),
          fn: () => router.push('/support'),
          keywords: ['support'],
        },
        {
          title: t('navigation.utils'),
          fn: () => router.push('/utils'),
          keywords: ['utils'],
        },
      ],
    });
    addCmdGroup({
      heading: t('action'),
      commands: [
        {
          title: t('actions.commandPalette'),
          fn: () => setCmdOpen(false),
          keywords: ['command palette'],
        },
      ],
    });
  }, []);

  return null;
}
