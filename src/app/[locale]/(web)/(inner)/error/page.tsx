import { Link } from '@/i18n/routing';

export default async function Page() {
  return (
    <div>
      <Link href={'/logout'}>에러가 발생했습니다.</Link>
    </div>
  );
}
