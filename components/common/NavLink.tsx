import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}
const NavLink = ({ href, children }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <li className={isActive ? 'active' : ''}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default NavLink;
