'use server';
import { LocaleCode } from '@/types/siteConfig';
import { cookies } from 'next/headers';

export async function setUserLocale(locale: LocaleCode) {
  (await cookies()).set('NEXT_LOCALE', locale);
}
