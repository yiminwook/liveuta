import { EXTERNAL_LINKS, INTERNAL_LINKS } from '@/constants';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import HeaderMenu from './HeaderMenu';

export default function DesktopNav() {
  const router = useTransitionRouter();
  const pathName = usePathname();
  const isHome = '/' === pathName;
  const handleSelect = (value: string) => router.push(value);

  return (
    <ul>
      <li>
        <HeaderMenu title="목차" links={INTERNAL_LINKS} onSelect={handleSelect} />
      </li>
      <li>
        <HeaderMenu title="외부링크" links={EXTERNAL_LINKS} onSelect={handleSelect} />
      </li>
    </ul>
  );
}
