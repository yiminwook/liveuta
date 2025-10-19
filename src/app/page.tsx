import { redirect } from 'next/navigation';
import { FALLBACK_LANG } from '@/libraries/i18n/config';

export default function Page() {
  redirect(`/${FALLBACK_LANG}`);
}
