'use client';
import { accountSidebarAtom } from '@inner/_lib/atom/common';
import { Session } from 'next-auth';
import { useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import CloseButton from '../button/CloseButton';
import * as styles from './sidebar.css';
import cx from 'classnames';
import useStopPropagation from '@/hook/useStopPropagation';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import Avatar from '../Avatar';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AccountSidebarProps {
  session: Session;
}
export default function AccountSidebar({ session }: AccountSidebarProps) {
  const pathname = usePathname();
  const [show, setShow] = useAtom(accountSidebarAtom);

  const { stopPropagation } = useStopPropagation();
  const handleClose = () => setShow(false);

  const mutateLogout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => signOut({ callbackUrl: '/' }),
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    if (show) setShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    //window 사이즈가 바뀌면 닫히게
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('resize', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <RemoveScroll enabled={show} removeScrollBar={false}>
      <aside>
        <div className={cx(styles.wrap, show && 'show')} onClick={handleClose}>
          <div className={cx(styles.inner, 'right', show && 'moveLeft')} onClick={stopPropagation}>
            <div className={styles.logoutButtonBox}>
              <button
                className={styles.logoutButton}
                onClick={() => mutateLogout.mutate()}
                disabled={mutateLogout.isPending}
              >
                <Avatar
                  email={session.user.email}
                  src={session.user.image}
                  alt="유저 이미지"
                  size={40}
                />
                로그아웃
              </button>
              <CloseButton onClick={handleClose} />
            </div>
            <nav className={styles.nav}>
              <ul>
                <li>
                  <Link href="/my">마이페이지</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </RemoveScroll>
  );
}
