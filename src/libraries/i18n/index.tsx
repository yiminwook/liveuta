import NextLink from 'next/link';
import { ComponentProps } from 'react';
import { TLocaleCode } from './type';

export type TLinkProps = ComponentProps<typeof NextLink> & { locale: TLocaleCode };

export const Link = ({ locale, href, ...props }: TLinkProps) => {
  return (
    <NextLink {...props} href={`/${locale}${href}`}>
      {props.children}
    </NextLink>
  );
};
