import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import HeaderMenu from './HeaderMenu';

export default function DesktopNav() {
  const router = useRouter();
  const t = useTranslations('global.header.desktopNav');
  const handleSelect = (value: string) => router.push(value);

  const internalLinks = [
    { href: '/', text: t('internalLinks.home') },
    { href: '/support', text: t('internalLinks.support') },
    { href: '/setting', text: t('internalLinks.settings') },
    { href: '/schedule', text: t('internalLinks.schedule') },
    { href: '/channel', text: t('internalLinks.channel') },
    { href: '/featured', text: t('internalLinks.featured') },
    { href: '/multi', text: t('internalLinks.multiView') },
    { href: '/setlist', text: t('internalLinks.setlist') },
    { href: '/dev', text: t('internalLinks.dev') },
  ];

  const externalLinks = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: t('externalLinks.kizunaAiGallery'),
    },
    {
      href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
      text: t('externalLinks.vutaGallery'),
    },
    { href: 'https://uta-tools.vercel.app', text: t('externalLinks.utaTools') },
  ];

  return (
    <ul>
      <li>
        <HeaderMenu title={t('internalLink')} links={internalLinks} onSelect={handleSelect} />
      </li>
      <li>
        <HeaderMenu title={t('externalLink')} links={externalLinks} onSelect={handleSelect} />
      </li>
    </ul>
  );
}
