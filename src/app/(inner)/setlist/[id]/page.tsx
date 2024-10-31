import Home from '@/components/setlistId/Home';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  return <Home params={params} />;
}
