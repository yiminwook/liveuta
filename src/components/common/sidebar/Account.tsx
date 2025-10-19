'use client';
import { Avatar, CloseButton, RemoveScroll } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { toast } from 'sonner';
import { withSession } from '@/components/common/authorization/withSession';
import useStopPropagation from '@/hooks/use-stop-propagation';
import { useUserInfo } from '@/hooks/use-user-info';
import FirebaseClient from '@/libraries/firebase/client';
import { useLocale, usePathname } from '@/libraries/i18n/client';
import { useApp } from '@/stores/app';
import NavItem from './NavItem';
import css from './Sidebar.module.scss';

interface AccountSidebarProps {
  user: User;
}

export default withSession<AccountSidebarProps>(function AccountSidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const isShow = useApp((state) => state.isShowAcctSidebar);
  const setIsShow = useApp((state) => state.actions.setIsShowAcctSidebar);

  const userInfo = useUserInfo({ user });
  const { enableScope, disableScope } = useHotkeysContext();
  const { stopPropagation } = useStopPropagation();

  const mutateLogout = useMutation({
    mutationFn: () => signOut(FirebaseClient.getInstance().auth),
    onError: (error) => toast.error(error.message),
    onSettled: () => router.replace('/'),
  });

  const handleClose = useCallback(() => setIsShow(false), [setIsShow]);

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
      enabled: isShow,
      scopes: ['sidebar'],
    },
  );

  useHotkeys('space', () => {}, {
    preventDefault: true,
    enabled: isShow,
    scopes: ['sidebar'],
  });

  useEffect(() => {
    if (isShow) handleClose();
  }, [pathname]);

  useEffect(() => {
    if (!isShow) return;
    //window 사이즈가 바뀌면 닫히게
    enableScope('sidebar');
    window.addEventListener('resize', handleClose);
    return () => {
      disableScope('sidebar');
      window.removeEventListener('resize', handleClose);
    };
  }, [isShow]);

  return (
    <RemoveScroll enabled={isShow} removeScrollBar={false}>
      <aside>
        <div className={clsx(css.wrap, { show: isShow })} onClick={handleClose}>
          <div className={clsx(css.inner, 'right', { moveLeft: isShow })} onClick={stopPropagation}>
            <div className={css.logoutBtnBox}>
              <button className={css.logoutBtn} onClick={logout} disabled={mutateLogout.isPending}>
                <Avatar
                  // src={user.photoURL}
                  name={user.email ?? ''}
                  w={40}
                  h={40}
                  radius="xl"
                  alt="유저 이미지"
                />
                로그아웃
              </button>
              <CloseButton w={40} h={40} onClick={handleClose} />
            </div>

            <nav className={css.nav}>
              <NavItem direction="ltr" label="마이페이지" href={`/${locale}/my`} />
              {userInfo.data?.userLv && userInfo.data.userLv >= 3 && (
                <NavItem direction="ltr" label="관리자페이지" href="/admin" />
              )}
            </nav>
          </div>
        </div>
      </aside>
    </RemoveScroll>
  );
});
