import { EXTERNAL_LINKS, INTERNAL_LINKS } from '@/const';
import { usePathname, useRouter } from 'next/navigation';
import SearchInput from './SearchInput';
import HeaderMenu from './HeaderMenu';
import * as styles from './header.css';

export default function DesktopNav() {
  const router = useRouter();
  const pathName = usePathname();

  const handleSelect = (value: string) => router.push(value);

  return (
    <>
      {['/', '/live'].includes(pathName) && (
        <div className={styles.searchBox}>
          <SearchInput />
        </div>
      )}
      <ul>
        <li>
          <HeaderMenu title="목차" links={INTERNAL_LINKS} onSelect={handleSelect} />
        </li>
        <li>
          <HeaderMenu title="외부링크" links={EXTERNAL_LINKS} onSelect={handleSelect} />
        </li>
      </ul>
    </>
  );
}
