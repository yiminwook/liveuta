import { FALLBACK_LANG } from '@/libraries/i18n/config';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(`/${FALLBACK_LANG}`);
}
