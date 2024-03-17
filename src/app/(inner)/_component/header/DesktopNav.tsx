import { EXTERNAL_LINKS, INTERNAL_LINKS } from '@/const';
import dayjs from '@/model/dayjs';
import { gtag } from '@inner/_lib/gtag';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SearchInput from '../input/SearchInput';
import HeaderMenu from './HeaderMenu';
import * as styles from './header.css';

export default function DesktopNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === '') return toast.warning('검색어를 입력해주세요.');

    gtag('event', 'search', {
      channelName: trimmedValue,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    router.push(`/search?query=${trimmedValue}`);
  };

  const handleSelect = (value: string) => router.push(value);

  return (
    <>
      {pathname !== '/search' && (
        <div className={styles.searchBox}>
          <SearchInput onSearch={handleSearch} placeHolder="채널명으로 검색" />
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
