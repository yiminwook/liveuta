'use client';
import { withSession } from '@/components/common/authorization/withSession';
import useStopPropagation from '@/hooks/use-stop-propagation';
import { useLocale, usePathname } from '@/libraries/i18n/client';
import { useAppCtx } from '@/stores/app';
import { Avatar, CloseButton } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import classnames from 'classnames';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { RemoveScroll } from 'react-remove-scroll';
import { toast } from 'sonner';
import { useStore } from 'zustand';
import NavItem from './NavItem';
import css from './Sidebar.module.scss';

interface AccountSidebarProps {
  session: Session;
}

export default withSession<AccountSidebarProps>(function AccountSidebar({ session }) {
  const pathname = usePathname();
  const locale = useLocale();
  const appCtx = useAppCtx();
  const isShow = useStore(appCtx, (state) => state.isShowAcctSidebar);
  const setIsShow = useStore(appCtx, (state) => state.actions.setIsShowAcctSidebar);

  const { enableScope, disableScope } = useHotkeysContext();
  const { stopPropagation } = useStopPropagation();

  const mutateLogout = useMutation({
    mutationFn: () => signOut({ callbackUrl: '/' }),
    onError: (error) => toast.error(error.message),
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
        <div className={classnames(css.wrap, { show: isShow })} onClick={handleClose}>
          <div
            className={classnames(css.inner, 'right', { moveLeft: isShow })}
            onClick={stopPropagation}
          >
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
              <NavItem direction="ltr" label="마이페이지" href={`/${locale}/my`} />
              {session.user.userLv >= 3 && (
                <NavItem direction="ltr" label="관리자페이지" href="/admin" />
              )}
            </nav>
          </div>
        </div>
      </aside>
    </RemoveScroll>
  );
});
