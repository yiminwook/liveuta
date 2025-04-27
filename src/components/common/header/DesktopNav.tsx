import { useLocale, useTranslations } from '@/libraries/i18n/client';
import HeaderMenu from './HeaderMenu';

export default function DesktopNav() {
  const locale = useLocale();
  const { t } = useTranslations(locale);

  const internalLinks = [
    { href: '/', text: t('global.header.desktopNav.internalLinks.home') },
    { href: '/support', text: t('global.header.desktopNav.internalLinks.support') },
    { href: '/setting', text: t('global.header.desktopNav.internalLinks.settings') },
    { href: '/schedule', text: t('global.header.desktopNav.internalLinks.schedule') },
    { href: '/channel', text: t('global.header.desktopNav.internalLinks.channel') },
    { href: '/featured', text: t('global.header.desktopNav.internalLinks.featured') },
    { href: '/multi', text: t('global.header.desktopNav.internalLinks.multiView') },
    { href: '/setlist', text: t('global.header.desktopNav.internalLinks.setlist') },
    { href: '/utils', text: t('global.header.desktopNav.internalLinks.utils') },
    { href: '/dev', text: t('global.header.desktopNav.internalLinks.dev') },
  ];

  const externalLinks = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: t('global.header.desktopNav.externalLinks.kizunaAiGallery'),
    },
    {
      href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
      text: t('global.header.desktopNav.externalLinks.vutaGallery'),
    },
    {
      href: 'https://uta-tools.vercel.app',
      text: t('global.header.desktopNav.externalLinks.utaTools'),
    },
  ];

  return (
    <ul>
      <li>
        <HeaderMenu
          title={t('global.header.desktopNav.internalLink')}
          links={internalLinks}
          isExternal={false}
        />
      </li>
      <li>
        <HeaderMenu
          title={t('global.header.desktopNav.externalLink')}
          links={externalLinks}
          isExternal={true}
        />
      </li>
    </ul>
  );
}
