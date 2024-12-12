import { notFound, redirect } from 'next/navigation';

interface RedirectPageProps {
  params: Promise<Record<'id', string | undefined>>;
}

const RedirectPage = async (props: RedirectPageProps) => {
  const params = await props.params;
  const id = params.id;
  if (id === undefined) notFound();
  const url = `https://www.youtube.com/watch?v=${decodeURIComponent(id)}`;
  redirect(url);
};

export default RedirectPage;
