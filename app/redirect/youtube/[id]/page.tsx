import { notFound, redirect } from 'next/navigation';

interface RedirectPageProps {
  params: Record<'id', string | undefined>;
}

const RedirectPage = ({ params }: RedirectPageProps) => {
  const id = params.id;
  if (id === undefined) notFound();
  const url = `https://www.youtube.com/watch?v=${decodeURIComponent(id)}`;
  redirect(url);
};

export default RedirectPage;
