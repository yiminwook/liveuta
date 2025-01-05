import { notFound } from 'next/navigation';

export default function CatchAll() {
  // [locale] 그룹라우팅 내에서 404 페이지를 렌더링합니다.
  notFound();
}
