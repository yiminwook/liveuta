'use client';
import { Link } from '@/libraries/i18n';
import { useLocale } from '@/libraries/i18n/client';

// 403 - Forbidden
export default function Forbidden() {
  const locale = useLocale();
  return (
    <div>
      <h2>Forbidden</h2>
      <p>You are not authorized to access this resource.</p>
      <Link locale={locale} href="/">
        Return Home
      </Link>
    </div>
  );
}
