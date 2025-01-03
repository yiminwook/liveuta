import { useRouter as i18nRouter } from '@/i18n/routing';
import { useRouter } from 'next-nprogress-bar';
import HeaderMenu from './HeaderMenu';

export default function DesktopNav() {
  const router = useRouter(i18nRouter);
  const handleSelect = (value: string) => router.push(value);

  const internalLinks = [
    { href: '/', text: '홈' },
    { href: '/schedule', text: '스케줄' },
    { href: '/multi', text: '멀티뷰' },
    { href: '/channel', text: '채널' },
    { href: '/setlist', text: '세트리' },
    { href: '/setting', text: '설정' },
    { href: '/dev', text: '개발' },
  ];

  const externalLinks = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: '키즈나아이 갤러리',
    },
    { href: 'https://gall.dcinside.com/mini/board/lists?id=vuta', text: '우타와꾸 갤러리' },
    { href: 'https://uta-tools.vercel.app', text: '우타툴즈' },
    { href: 'https://ezgif.com', text: 'EZ GIF' },
  ];

  return (
    <ul>
      <li>
        <HeaderMenu title="목차" links={internalLinks} onSelect={handleSelect} />
      </li>
      <li>
        <HeaderMenu title="외부링크" links={externalLinks} onSelect={handleSelect} />
      </li>
    </ul>
  );
}
