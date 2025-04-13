'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { useEffect } from 'react';
import { useCommandActions } from './Context';

export default function GlobalCommands() {
  const t = useTranslations();
  const { addCmdGroup, setCmdOpen } = useCommandActions();
  const router = useRouter();

  useEffect(() => {
    addCmdGroup({
      heading: t('global.command.globalCommands.navigate'),
      commands: [
        {
          title: t('global.command.globalCommands.navigation.home'),
          fn: () => router.push('/'),
          keywords: ['home'],
        },
        {
          title: t('global.command.globalCommands.navigation.schedule'),
          fn: () => router.push('/schedule'),
          keywords: ['navigate', 'schedules'],
        },
        {
          title: t('global.command.globalCommands.navigation.multiView'),
          fn: () => router.push('/multi'),
          keywords: ['navigate', 'multiView'],
        },
        {
          title: t('global.command.globalCommands.navigation.channel'),
          fn: () => router.push('/channel'),
          keywords: ['navigate', 'channel'],
        },
        {
          title: t('global.command.globalCommands.navigation.setlist'),
          fn: () => router.push('/setlist'),
          keywords: ['navigate', 'setlist'],
        },
        {
          title: t('global.command.globalCommands.navigation.settings'),
          fn: () => router.push('/setting'),
          keywords: ['navigate', 'setting'],
        },
        {
          title: t('global.command.globalCommands.navigation.featured'),
          fn: () => router.push('/featured'),
          keywords: ['navigate', 'featured'],
        },
        {
          title: t('global.command.globalCommands.navigation.support'),
          fn: () => router.push('/support'),
          keywords: ['navigate', 'support'],
        },
      ],
    });
    addCmdGroup({
      heading: t('global.command.globalCommands.utility'),
      commands: [
        {
          title: t('global.command.globalCommands.utilities.converters.base64'),
          fn: () => router.push('/utils/converters/base64'),
          keywords: ['utility', 'navigate', 'converters', 'base64'],
        },
        {
          title: t('global.command.globalCommands.utilities.youtube.thumbnail'),
          fn: () => router.push('/utils/youtube/thumbnail'),
          keywords: ['utility', 'navigate', 'youtube', 'thumbnail'],
        },
      ],
    });
    addCmdGroup({
      heading: t('global.command.globalCommands.action'),
      commands: [
        {
          title: t('global.command.globalCommands.actions.commandPalette'),
          fn: () => setCmdOpen(false),
          keywords: ['actions', 'commands', 'command palette'],
        },
      ],
    });
  }, []);

  return null;
}
