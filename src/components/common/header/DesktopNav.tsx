import { EXTERNAL_LINKS, INTERNAL_LINKS } from '@/constants';
import { useRouter } from 'next-nprogress-bar';
import HeaderMenu from './HeaderMenu';

export default function DesktopNav() {
  const router = useRouter();
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
