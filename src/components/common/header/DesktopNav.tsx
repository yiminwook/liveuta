import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import HeaderMenu from './HeaderMenu';

export default function DesktopNav() {
  const router = useRouter();
  const t = useTranslations();
  const handleSelect = (value: string) => router.push(value);

  const internalLinks = [
    { href: '/', text: t('home.title') },
    { href: '/schedule', text: t('schedule.title') },
    { href: '/multi', text: t('multiView.title') },
    { href: '/channel', text: t('channel.title') },
    { href: '/setlist', text: t('setlist.title') },
    { href: '/setting', text: t('settings.title') },
    { href: '/dev', text: t('dev.title') },
  ];

  const externalLinks = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: t('global.externalLink.kizunaAiGallery'),
    },
    {
      href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
      text: t('global.externalLink.vutaGallery'),
    },
    { href: 'https://uta-tools.vercel.app', text: t('global.externalLink.utaTools') },
    { href: 'https://ezgif.com', text: 'EZ GIF' },
  ];

  return (
    <ul>
      <li>
        <HeaderMenu
          title={t('global.header.desktopNav.index')}
          links={internalLinks}
          onSelect={handleSelect}
        />
      </li>
      <li>
        <HeaderMenu
          title={t('global.header.desktopNav.externalLink')}
          links={externalLinks}
          onSelect={handleSelect}
        />
      </li>
    </ul>
  );
}
