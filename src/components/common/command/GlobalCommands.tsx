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
          keywords: ['navigate', 'schedules'],
        },
        {
          title: t('navigation.multiView'),
          fn: () => router.push('/multiView'),
          keywords: ['navigate', 'multiView'],
        },
        {
          title: t('navigation.channel'),
          fn: () => router.push('/channel'),
          keywords: ['navigate', 'channel'],
        },
        {
          title: t('navigation.setlist'),
          fn: () => router.push('/setlist'),
          keywords: ['navigate', 'setlist'],
        },
        {
          title: t('navigation.settings'),
          fn: () => router.push('/settings'),
          keywords: ['navigate', 'settings'],
        },
        {
          title: t('navigation.dev'),
          fn: () => router.push('/dev'),
          keywords: ['navigate', 'dev'],
        },
        {
          title: t('navigation.featured'),
          fn: () => router.push('/featured'),
          keywords: ['navigate', 'featured'],
        },
        {
          title: t('navigation.support'),
          fn: () => router.push('/support'),
          keywords: ['navigate', 'support'],
        },
      ],
    });
    addCmdGroup({
      "heading": t('utility'),
      commands: [
        {
          title: t('utilities.converters.base64'),
          fn: () => router.push('/utils/converters/base64'),
          keywords: ['utility', 'navigate', 'converters', 'base64'],
        },
        {
          title: t('utilities.youtube.thumbnail'),
          fn: () => router.push('/utils/youtube/thumbnail'),
          keywords: ['utility', 'navigate', 'youtube', 'thumbnail'],
        }
      ]
    });
    addCmdGroup({
      heading: t('action'),
      commands: [
        {
          title: t('actions.commandPalette'),
          fn: () => setCmdOpen(false),
          keywords: ['actions', 'commands', 'command palette'],
        },
      ],
    });
  }, []);

  return null;
}
