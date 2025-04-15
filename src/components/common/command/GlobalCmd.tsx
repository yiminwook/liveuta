'use client';
import { setUserLocale } from '@/libraries/next-intl';
import { useAppCtx } from '@/stores/app';
import { LocaleCode } from '@/types/siteConfig';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { useCallback, useEffect, useTransition } from 'react';
import { useStore } from 'zustand';
import { useCmdActions } from './Context';

export default function GlobalCmd() {
  const t = useTranslations();
  const { addCmdGroup, setCmdOpen } = useCmdActions();
  const router = useRouter();
  const appCtx = useAppCtx();
  const setTheme = useStore(appCtx, (state) => state.actions.setTheme);
  const locale = useLocale();
  const [_, startTransition] = useTransition();
  const onLanguageChange = useCallback(
    (code: LocaleCode) => {
      if (locale === code) return;
      startTransition(() => {
        setUserLocale(code).then(() => {
          window.location.reload();
        });
      });
    },
    [locale],
  );

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
          fn: () => setTheme('theme1'),
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
          fn: () => setTheme('theme2'),
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
          fn: () => setTheme('theme3'),
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
          fn: () => setTheme('theme4'),
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
          fn: () => setTheme('theme5'),
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
          fn: () => router.push('/utils/converters/base64'),
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
          fn: () => router.push('/utils/youtube/thumbnail'),
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
          fn: () => router.push('/'),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '홈', 'home', 'ホーム'],
        },
        {
          title: t('global.command.globalCommands.navigation.schedule'),
          fn: () => router.push('/schedule'),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '스케줄', 'schedule', 'スケジュール'],
        },
        {
          title: t('global.command.globalCommands.navigation.multiView'),
          fn: () => router.push('/multi'),
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
          fn: () => router.push('/channel'),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '채널', 'channel', 'チャンネル'],
        },
        {
          title: t('global.command.globalCommands.navigation.setlist'),
          fn: () => router.push('/setlist'),
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
          fn: () => router.push('/setting'),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '설정', 'settings', '設定'],
        },
        {
          title: t('global.command.globalCommands.navigation.featured'),
          fn: () => router.push('/featured'),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '특집', 'featured', '特集'],
        },
        {
          title: t('global.command.globalCommands.navigation.support'),
          fn: () => router.push('/support'),
          keywords: ['페이지 이동', 'navigate', 'ページ移動', '지원', 'support', 'サポート'],
        },
      ],
    });
  }, []);

  return null;
}
