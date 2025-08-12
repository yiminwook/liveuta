'use client';
import { usePathname, useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { useCustomMantineColorScheme } from '@/libraries/mantine/custom-theme-hook';
import { useRouter } from '@bprogress/next';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCmdActions } from './Context';

type Props = {
  locale: TLocaleCode;
};

export default function GlobalCmd({ locale }: Props) {
  const { t } = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setColorScheme: setAppColorScheme } = useCustomMantineColorScheme();
  const { addCmdGroup, setCmdOpen } = useCmdActions();

  const onLanguageChange = (selectedLocale: TLocaleCode) => {
    if (locale === selectedLocale) return;
    router.replace(`/${selectedLocale}${pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    addCmdGroup({
      id: 'global-actions',
      heading: t('global.command.globalCommands.action'),
      commands: [
        {
          title: t('global.command.globalCommands.actions.commandPalette'),
          fn: () => setCmdOpen(false),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '커맨드 팔레트',
            'command palette',
            'コマンドパレット',
          ],
        },
        {
          title: `${t('global.command.globalCommands.actions.theme')}1`,
          fn: () => setAppColorScheme('theme1'),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '설정',
            'settings',
            '設定',
            '테마',
            'theme',
            'テーマ',
          ],
        },
        {
          title: `${t('global.command.globalCommands.actions.theme')}2`,
          fn: () => setAppColorScheme('theme2'),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '설정',
            'settings',
            '設定',
            '테마',
            'theme',
            'テーマ',
          ],
        },
        {
          title: `${t('global.command.globalCommands.actions.theme')}3`,
          fn: () => setAppColorScheme('theme3'),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '설정',
            'settings',
            '設定',
            '테마',
            'theme',
            'テーマ',
          ],
        },
        {
          title: `${t('global.command.globalCommands.actions.theme')}4`,
          fn: () => setAppColorScheme('theme4'),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '설정',
            'settings',
            '設定',
            '테마',
            'theme',
            'テーマ',
          ],
        },
        {
          title: `${t('global.command.globalCommands.actions.theme')}5`,
          fn: () => setAppColorScheme('theme5'),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '설정',
            'settings',
            '設定',
            '테마',
            'theme',
            'テーマ',
          ],
        },
        {
          title: t('global.command.globalCommands.actions.japanese'),
          fn: () => onLanguageChange('ja'),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '설정',
            'settings',
            '設定',
            '언어 변경',
            'language change',
            '言語変更',
            '일본어',
            'japanese',
            '日本語',
          ],
        },
        {
          title: t('global.command.globalCommands.actions.english'),
          fn: () => onLanguageChange('en'),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '설정',
            'settings',
            '設定',
            '언어 변경',
            'language change',
            '言語変更',
            '영어',
            'english',
            '英語',
          ],
        },
        {
          title: t('global.command.globalCommands.actions.korean'),
          fn: () => onLanguageChange('ko'),
          keywords: [
            '액션',
            'actions',
            'アクション',
            '설정',
            'settings',
            '設定',
            '언어 변경',
            'language change',
            '言語変更',
            '한국어',
            'korean',
            '韓国語',
          ],
        },
      ],
    });
    addCmdGroup({
      id: 'global-utilities',
      heading: t('global.command.globalCommands.utility'),
      commands: [
        {
          title: t('global.command.globalCommands.utilities.converters.base64'),
          fn: () => router.push(`/${locale}/utils/converters/base64`),
          keywords: [
            '유틸리티',
            'utility',
            'ユーティリティ',
            '페이지 이동',
            'navigate',
            'ページ移動',
            '변환기',
            'converters',
            '変換ツール',
            'base64',
          ],
        },
        {
          title: t('global.command.globalCommands.utilities.youtube.thumbnail'),
          fn: () => router.push(`/${locale}/utils/youtube/thumbnail`),
          keywords: [
            '유틸리티',
            'utility',
            'ユーティリティ',
            '페이지 이동',
            'navigate',
            'ページ移動',
            '유튜브',
            'youtube',
            'ユーチューブ',
            '썸네일',
            'thumbnail',
            'サムネイル',
          ],
        },
      ],
    });
    addCmdGroup({
      id: 'global-navigate',
      heading: t('global.command.globalCommands.navigate'),
      commands: [
        {
          title: t('global.command.globalCommands.navigation.home'),
          fn: () => router.push(`/${locale}`),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '홈', 'home', 'ホーム'],
        },
        {
          title: t('global.command.globalCommands.navigation.schedule'),
          fn: () => router.push(`/${locale}/schedule`),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '스케줄', 'schedule', 'スケジュール'],
        },
        {
          title: t('global.command.globalCommands.navigation.multiView'),
          fn: () => router.push(`/${locale}/multi`),
          keywords: [
            '페이지 이동',
            'navigate',
            'ページ移動',
            '멀티뷰',
            'multi view',
            'マルチビュー',
          ],
        },
        {
          title: t('global.command.globalCommands.navigation.channel'),
          fn: () => router.push(`/${locale}/channel`),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '채널', 'channel', 'チャンネル'],
        },
        {
          title: t('global.command.globalCommands.navigation.setlist'),
          fn: () => router.push(`/${locale}/setlist`),
          keywords: [
            '페이지 이동',
            'navigate',
            'ページ移動',
            '세트리스트',
            'setlist',
            'セットリスト',
          ],
        },
        {
          title: t('global.command.globalCommands.navigation.settings'),
          fn: () => router.push(`/${locale}/setting`),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '설정', 'settings', '設定'],
        },
        {
          title: t('global.command.globalCommands.navigation.featured'),
          fn: () => router.push(`/${locale}/featured`),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '특집', 'featured', '特集'],
        },
        {
          title: t('global.command.globalCommands.navigation.support'),
          fn: () => router.push(`/${locale}/support`),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '지원', 'support', 'サポート'],
        },
      ],
    });
  }, []);

  return null;
}
