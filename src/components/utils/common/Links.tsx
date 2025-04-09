import { useTranslations } from 'next-intl';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

export type LinksGroup = {
  text: string;
  items: {
    text: string;
    href: string;
  }[];
};

const LinksContext = createContext<LinksGroup[] | null>(null);

export function useUtilsLinksContext() {
  const context = useContext(LinksContext);
  if (context === null) {
    throw new Error('useLinksContext must be used within a LinksProvider');
  }
  return context;
}

export function UtilsLinksProvider({ children }: PropsWithChildren) {
  const t = useTranslations('utils.links');

  const linksGroups: LinksGroup[] = [
    {
      text: t('converter'),
      items: [
        {
          text: t('converters.base64'),
          href: '/utils/converters/base64',
        },
      ],
    },
    {
      text: t('youtube'),
      items: [
        {
          text: t('youtubeItems.thumbnail'),
          href: '/utils/youtube/thumbnail',
        },
      ],
    },
  ];

  return <LinksContext.Provider value={linksGroups}>{children}</LinksContext.Provider>;
}
