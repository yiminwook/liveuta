import Main from '@/app/test/page.client';
import { notFound } from 'next/navigation';

const AllPage = async () => {
  if (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'main') {
    notFound();
  }
  return <Main filter="all" />;
};

export default AllPage;
