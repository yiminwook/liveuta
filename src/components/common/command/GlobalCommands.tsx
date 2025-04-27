'use client';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { useRouter } from 'next-nprogress-bar';
import { useEffect } from 'react';
import { useCommandActions } from './Context';

export default function GlobalCommands({ locale }: { locale: TLocaleCode }) {
  const router = useRouter();
  const { t } = useTranslations(locale);
  const { addCmdGroup, setCmdOpen } = useCommandActions();

  useEffect(() => {
    addCmdGroup({
      heading: t('global.command.globalCommands.navigate'),
      commands: [
        {
          title: t('global.command.globalCommands.navigation.home'),
          fn: () => router.push(`/${locale}`),
          keywords: ['home'],
        },
        {
          title: t('global.command.globalCommands.navigation.schedule'),
          fn: () => router.push(`/${locale}/schedule`),
          keywords: ['navigate', 'schedules'],
        },
        {
          title: t('global.command.globalCommands.navigation.multiView'),
          fn: () => router.push(`/${locale}/multi`),
          keywords: ['navigate', 'multiView'],
        },
        {
          title: t('global.command.globalCommands.navigation.channel'),
          fn: () => router.push(`/${locale}/channel`),
          keywords: ['navigate', 'channel'],
        },
        {
          title: t('global.command.globalCommands.navigation.setlist'),
          fn: () => router.push(`/${locale}/setlist`),
          keywords: ['navigate', 'setlist'],
        },
        {
          title: t('global.command.globalCommands.navigation.settings'),
          fn: () => router.push(`/${locale}/setting`),
          keywords: ['navigate', 'setting'],
        },
        {
          title: t('global.command.globalCommands.navigation.featured'),
          fn: () => router.push(`/${locale}/featured`),
          keywords: ['navigate', 'featured'],
        },
        {
          title: t('global.command.globalCommands.navigation.support'),
          fn: () => router.push(`/${locale}/support`),
          keywords: ['navigate', 'support'],
        },
      ],
    });
    addCmdGroup({
      heading: t('global.command.globalCommands.utility'),
      commands: [
        {
          title: t('global.command.globalCommands.utilities.converters.base64'),
          fn: () => router.push(`/${locale}/utils/converters/base64`),
          keywords: ['utility', 'navigate', 'converters', 'base64'],
        },
        {
          title: t('global.command.globalCommands.utilities.youtube.thumbnail'),
          fn: () => router.push(`/${locale}/utils/youtube/thumbnail`),
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
