import Home from '@/components/setlistId/Home';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: Props) {
  const params = await props.params;
  return <Home params={params} />;
}
