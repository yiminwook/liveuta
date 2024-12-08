import { Modal as MantineModal, MantineSize } from '@mantine/core';
import { AnimationEventHandler, ReactNode, useEffect } from 'react';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';

type ModalProps = {
  id: string;
  className?: string;
  title?: string;
  children: ReactNode;
  width?: number | 'auto' | MantineSize;
  /** 모달이 열려있을때는 스크롤 동작은 방지되나, 스크롤을 화면에서까지 안보이게 할지 여부 */
  hideScroll?: boolean;
  overlay?: boolean;
  centered?: boolean;
  withCloseButton?: boolean;
  onAnimationEnd?: AnimationEventHandler;
  onClose: (e?: any) => void;
};

export default function Modal({
  id,
  className,
  children,
  title,
  width = 'auto',
  hideScroll = false,
  overlay = true,
  centered = true,
  withCloseButton = true,
  onAnimationEnd,
  onClose,
}: ModalProps) {
  const { enableScope, disableScope, enabledScopes } = useHotkeysContext();

  useHotkeys('esc', onClose, {
    enabled: enabledScopes.at(-1) === id, //모달이 위에서부터 하나씩 닫히게 컨트롤
    preventDefault: true,
    scopes: [id],
  });

  useEffect(() => {
    enableScope(id);
    return () => disableScope(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MantineModal
      className={className}
      removeScrollProps={{ removeScrollBar: hideScroll }}
      onAnimationEnd={onAnimationEnd} //transtion 효과용
      id={id}
      opened
      onClose={onClose}
      title={title}
      size={width}
      closeButtonProps={{ w: 40, h: 40 }}
      overlayProps={
        overlay
          ? {
              blur: '2px',
              opacity: 0.25,
            }
          : undefined
      }
      centered={centered}
      withCloseButton={withCloseButton}
      transitionProps={{}}
      closeOnEscape={false} //직접 제어
    >
      {children}
    </MantineModal>
  );
}
