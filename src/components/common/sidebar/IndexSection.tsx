import { Link } from '@/libraries/i18n';
import { useLocale, usePathname } from '@/libraries/i18n/client';
import css from './Sidebar.module.scss';

const links = [
  { href: '/', text: '홈' },
  { href: '/schedule', text: '스케줄' },
  { href: '/multi', text: '멀티뷰' },
  { href: '/channel', text: '채널' },
  { href: '/setlist', text: '세트리' },
  { href: '/setting', text: '설정' },
  { href: '/dev', text: '개발' },
];

export default function IndexSection() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <section>
      <h2>
        {/* <IconMsExploreOutline size={'1rem'} color="inherit" /> */}
        &nbsp;목차
      </h2>
      <ul className={css.links}>
        {links.map((link, i) => (
          <li key={`sidebar-link-${i}`}>
            <Link locale={locale} href={link.href} data-current={pathname === link.href}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
