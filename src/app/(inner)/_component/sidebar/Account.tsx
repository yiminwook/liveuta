/* eslint-disable @next/next/no-img-element */
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

interface AccountSidebarProps {
  session: Session;
}
export default function AccountSidebar({ session }: AccountSidebarProps) {
  const [show, setShow] = useAtom(accountSidebarAtom);
  const { stopPropagation } = useStopPropagation();
  const handleClose = () => setShow(false);

  const mutateLogout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => signOut({ callbackUrl: '/' }),
    onError: (error) => toast.error(error.message),
  });

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
            <nav className={styles.nav}>
              <div className={styles.logoutButtonBox}>
                <div className={styles.accountImageBox}>
                  <Avatar
                    email={session.user.email}
                    src={session.user.image}
                    alt="유저 이미지"
                    size={40}
                  />
                </div>
                <button
                  className={styles.logoutButton}
                  onClick={() => mutateLogout.mutate()}
                  disabled={mutateLogout.isPending}
                >
                  로그아웃
                </button>
              </div>
              <CloseButton onClick={handleClose} />
            </nav>
          </div>
        </div>
      </aside>
    </RemoveScroll>
  );
}
