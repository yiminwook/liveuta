'use client';
import useStopPropagation from '@/hooks/useStopPropagation';
import { accountSidebarAtom } from '@/stores/common';
import { Avatar, CloseButton } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import cx from 'classnames';
import { useAtom } from 'jotai';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { RemoveScroll } from 'react-remove-scroll';
import { toast } from 'sonner';
import css from './Sidebar.module.scss';

interface AccountSidebarProps {
  session: Session;
}
export default function AccountSidebar({ session }: AccountSidebarProps) {
  const pathname = usePathname();
  const [show, setShow] = useAtom(accountSidebarAtom);
  const { enableScope, disableScope } = useHotkeysContext();
  const { stopPropagation } = useStopPropagation();

  const mutateLogout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => signOut({ callbackUrl: '/' }),
    onError: (error) => toast.error(error.message),
  });

  const handleClose = useCallback(() => setShow(() => false), [setShow]);

  const logout = () => {
    if (mutateLogout.isPending) return;
    mutateLogout.mutate();
  };

  useHotkeys(
    'esc',
    (e) => {
      e.stopPropagation();
      handleClose();
    },
    {
      enabled: show,
      scopes: ['sidebar'],
    },
  );

  useHotkeys('space', (e) => {}, {
    preventDefault: true,
    enabled: show,
    scopes: ['sidebar'],
  });

  useEffect(() => {
    if (show) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    //window 사이즈가 바뀌면 닫히게
    enableScope('sidebar');
    window.addEventListener('resize', handleClose);
    return () => {
      disableScope('sidebar');
      window.removeEventListener('resize', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <RemoveScroll enabled={show} removeScrollBar={false}>
      <aside>
        <div className={cx(css.wrap, show && 'show')} onClick={handleClose}>
          <div className={cx(css.inner, 'right', show && 'moveLeft')} onClick={stopPropagation}>
            <div className={css.logoutBtnBox}>
              <button className={css.logoutBtn} onClick={logout} disabled={mutateLogout.isPending}>
                <Avatar
                  src={session.user.image}
                  w={40}
                  h={40}
                  radius="xl"
                  alt="유저 이미지"
                  name={session.user.email}
                />
                로그아웃
              </button>
              <CloseButton w={40} h={40} onClick={handleClose} />
            </div>
            <nav className={css.nav}>
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
