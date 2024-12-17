'use client';
import cx from 'classnames';
import { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes, forwardRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import css from './Vaul.module.scss';

/**
 *
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

const DrawerOverlay = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cx(css.overlay, className)} {...props} />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content ref={ref} className={cx(css.content, className)} {...props}>
      <div className={css.handle} />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(css.header, className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(css.footer, className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title ref={ref} className={cx(css.title, className)} {...props} />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cx(css.description, className)} {...props} />
));
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
