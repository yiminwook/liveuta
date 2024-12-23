'use client';
import cx from 'classnames';
import { ComponentProps, HTMLAttributes } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import css from './Vaul.module.scss';

/**
 * @example
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger>Open</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Are you absolutely sure?</DrawerTitle>
 *       <DrawerDescription>This action cannot be undone.</DrawerDescription>
 *     </DrawerHeader>
 *     <DrawerFooter>
 *       <button>Submit</button>
 *       <DrawerClose>
 *       <button>Cancel</button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 * 기본 Content 너비는 sm(48rem), wrapper의 최대 높이는 50svh
 * 스크롤바를 추가하려면 wrapper에 `overflow-y: auto`를 추가
 * ```css
 * .wrapper {
 *   height: 60vh;
 *   overflow-y: auto;
 * }
 * ```
 * wrapper의 최대 높이 제거
 * ```scss
 * .wrapper {
 *   max-height: none;
 * }
 * ```
 */
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = ({
  className,
  ref,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Overlay>) => (
  <DrawerPrimitive.Overlay ref={ref} className={cx(css.overlay, className)} {...props} />
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content> & {
  classNames?: {
    wrapper?: string;
    handle?: string;
    contentComponent?: string;
  };
  height?: string;
};

/**
 * @example
 * ```
 * <DrawerContent className={css.content} classNames={{ wrapper: css.wrapper, handle: css.handle }}>
 *   ...
 * </DrawerContent>
 * 기본 Content 너비는 sm(48rem), wrapper의 최대 높이는 50svh
 * ```
 * 스크롤바를 추가하려면 wrapper에 `overflow-y: auto`를 추가
 * ```scss
 * .wrapper {
 *   height: 60vh;
 *   overflow-y: auto;
 * }
 * ```
 * wrapper의 최대 높이 제거
 * ```scss
 * .wrapper {
 *   max-height: none;
 * }
 * ```
 */
const DrawerContent = ({ className, classNames, children, ref, ...props }: DrawerContentProps) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cx(css.contentComponent, classNames?.contentComponent)}
      {...props}
    >
      <div className={cx(css.handle, classNames?.handle)} />
      <div className={cx(css.contentWrapper, classNames?.wrapper)}>
        <div className={cx(css.content, className)}>{children}</div>
      </div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(css.header, className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(css.footer, className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = ({
  className,
  ref,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title ref={ref} className={cx(css.title, className)} {...props} />
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = ({
  className,
  ref,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description ref={ref} className={cx(css.description, className)} {...props} />
);
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
